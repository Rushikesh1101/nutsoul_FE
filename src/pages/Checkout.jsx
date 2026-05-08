import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import QRCode from 'react-qr-code';
import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';
import { formatPrice, INDIAN_STATES } from '../utils/helpers';
import { getProductById } from '../data/products';
import { API_URL } from '../config';

export default function Checkout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [placing, setPlacing] = useState(false);
  const [upiData, setUpiData] = useState(null);
  const [showUpiQr, setShowUpiQr] = useState(false);
  const [screenshotData, setScreenshotData] = useState('');

  // const { cartItems, cartSubtotal, clearCart } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);


  // Fetch addresses for logged-in user
  useEffect(() => {
    if (!user?.email) return;

    const fetchAddresses = async () => {
      try {
        const res = await fetch(`${API_URL}/get_addresses?email=${encodeURIComponent(user.email)}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setAddresses(data.addresses || []);
          if (data.addresses.length > 0) {
            setSelectedAddress(data.addresses[0].id); // select first by default
          }
        } else {
          toast.error(data.error || 'Failed to fetch addresses');
        }
      } catch (err) {
        toast.error('Server error while fetching addresses');
      }
    };

    fetchAddresses();
  }, [user?.email]);


  useEffect(() => {
    if (!user) return;

    const fetchCart = async () => {
      try {
        const res = await fetch(`${API_URL}/cart_info`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setCartItems(data.cart_items);

          const subtotal = data.cart_items.reduce(
            (sum, item) => sum + item.total,
            0
          );

          setCartSubtotal(subtotal);

          if (data.cart_items.length === 0) {
            navigate('/cart');
          }
        } else {
          navigate('/cart');
        }
      } catch (err) {
        toast.error("Failed to fetch cart");
        navigate('/cart');
      }
    };

    fetchCart();
  }, [user, navigate]);




  const [form, setForm] = useState({
    label: 'Home', name: user?.name || '', phone: user?.phone || '',
    address_line1: '', address_line2: '', city: '', state: '', pincode: '', is_default: true,
  });


  const shippingFee = cartSubtotal >= 500 ? 0 : 50;
  const total = cartSubtotal + shippingFee;

  // const handleAddAddress = () => {
  //   if (!form.name || !form.phone || !form.address_line1 || !form.city || !form.state || !form.pincode) {
  //     toast.error('Please fill all required fields');
  //     return;
  //   }
  //   const newAddr = { id: `addr_${Date.now()}`, ...form };
  //   const updated = [...addresses, newAddr];
  //   setAddresses(updated);
  //   setSelectedAddress(newAddr.id);
  //   setShowNewAddress(false);
  //   toast.success('Address added!');
  // };
  const handleAddAddress = async () => {
    try {
      if (!form.name || !form.phone || !form.address_line1 || !form.city || !form.state || !form.pincode) {
        toast.error('Please fill all required fields');
        return;
      }
  
      const token = localStorage.getItem("token");
  
      const payload = {
        name: user.name,
        email: user.email,
        role: user.role,
        ...form
      };
  
      const response = await fetch(`${API_URL}/add_address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to add address");
      }
  
      // Update local state with newly added address from backend
      setAddresses(prev => [...prev, data.address]);
      setSelectedAddress(data.address.id);
      setShowNewAddress(false); // ✅ use the correct state here
      setForm({ label: "Home", name: "", phone: "", address_line1: "", address_line2: "", city: "", state: "", pincode: "", is_default: false });
      toast.success("Address added!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress && !showNewAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    try {
      setPlacing(true);

      const addr = addresses.find(a => a.id === selectedAddress);

      const res = await fetch(`${API_URL}/place_order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          payment_method: paymentMethod,
          address: addr
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // ✅ Clear cart after successful order
        await fetch(`${API_URL}/clear_cart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email })
        });

        toast.success("Order placed successfully!");
        navigate(`/order-confirmation/${data.order_id}`);
      } else {
        toast.error(data.message || "Failed to place order");
      }

    } catch (err) {
      toast.error("Server error");
    } finally {
      setPlacing(false);
    }
  };

  const handleUpiScreenshot = () => {
    if (!screenshotData.trim()) {
      toast.error('Please enter your UPI transaction ID or reference');
      return;
    }
    try {
      const order = { ...upiData.order, payment_status: 'verification_pending', payment_screenshot: screenshotData };

      const userOrders = JSON.parse(localStorage.getItem(`sdf_orders_${user.id}`) || '[]');
      userOrders.unshift(order);
      localStorage.setItem(`sdf_orders_${user.id}`, JSON.stringify(userOrders));

      const allOrders = JSON.parse(localStorage.getItem('sdf_all_orders') || '[]');
      allOrders.unshift(order);
      localStorage.setItem('sdf_all_orders', JSON.stringify(allOrders));

      clearCart();
      toast.success('Payment verification submitted!');
      navigate(`/order-confirmation/${upiData.orderId}`);
    } catch {
      toast.error('Failed to submit payment info');
    }
  };

  if (showUpiQr && upiData) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 text-center">
        <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-2">Pay via UPI</h2>
        <p className="text-brand-brown-light/70 mb-6">Scan the QR code or use UPI ID to pay</p>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-brand-gold-light/20 mb-6">
          <div className="flex justify-center mb-4">
            <QRCode value={upiData.upiString} size={200} />
          </div>
          <p className="text-sm text-brand-brown-light mb-1">UPI ID: <strong className="text-brand-gold-dark">{upiData.upiId}</strong></p>
          <p className="text-2xl font-bold text-brand-gold-dark mt-2">{formatPrice(upiData.amount)}</p>
          <p className="text-xs text-brand-brown-light/50 mt-1">Order: {upiData.orderId}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-brand-gold-light/20 text-left">
          <h3 className="font-semibold text-brand-brown-dark mb-3">After Payment</h3>
          <p className="text-sm text-brand-brown-light/70 mb-4">Enter your UPI Transaction ID or Reference Number for verification:</p>
          <input
            type="text"
            placeholder="Enter UPI Transaction ID / Reference..."
            value={screenshotData}
            onChange={(e) => setScreenshotData(e.target.value)}
            className="input-field mb-4"
          />
          <button onClick={handleUpiScreenshot} className="w-full btn-primary">Submit Payment Confirmation</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-brand-brown-dark mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white rounded-2xl p-6 border border-brand-gold-light/10 shadow-sm">
            <h2 className="font-serif text-lg font-bold text-brand-brown-dark mb-4">Delivery Address</h2>

            {addresses.length > 0 && !showNewAddress && (
              <div className="space-y-3">
                {addresses.map(addr => (
                  <label key={addr._id} className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedAddress === addr.id ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-gold-light/10 hover:border-brand-gold-light/30'}`}>
                    <input type="radio" name="address" checked={selectedAddress === addr.id} onChange={() => setSelectedAddress(addr.id)} className="mt-1 accent-brand-gold" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-brand-brown-dark">{addr.name}</span>
                        <span className="badge-gold text-[10px]">{addr.label}</span>
                      </div>
                      <p className="text-sm text-brand-brown-light/70 mt-1">
                        {addr.address_line1}{addr.address_line2 ? ', ' + addr.address_line2 : ''}, {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-sm text-brand-brown-light/50">Phone: {addr.phone}</p>
                    </div>
                  </label>
                ))}
                <button onClick={() => setShowNewAddress(true)} className="text-sm text-brand-gold hover:text-brand-gold-dark font-medium">+ Add New Address</button>
              </div>
            )}

            {showNewAddress && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-brand-brown-dark mb-1 block">Full Name *</label>
                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-brand-brown-dark mb-1 block">Phone *</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-brand-brown-dark mb-1 block">Address Line 1 *</label>
                  <input type="text" value={form.address_line1} onChange={e => setForm({ ...form, address_line1: e.target.value })} className="input-field" placeholder="House/Flat No, Building, Street" />
                </div>
                {/* <div>
                  <label className="text-sm font-medium text-brand-brown-dark mb-1 block">Address Line 2</label>
                  <input type="text" value={form.address_line2} onChange={e => setForm({ ...form, address_line2: e.target.value })} className="input-field" placeholder="Area, Landmark (optional)" />
                </div> */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-brand-brown-dark mb-1 block">City *</label>
                    <input type="text" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-brand-brown-dark mb-1 block">State *</label>
                    <select value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} className="input-field">
                      <option value="">Select</option>
                      {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-brand-brown-dark mb-1 block">Pincode *</label>
                    <input type="text" value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} className="input-field" maxLength={6} />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleAddAddress} className="btn-primary">Save Address</button>
                  {addresses.length > 0 && <button onClick={() => setShowNewAddress(false)} className="btn-outline">Cancel</button>}
                </div>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl p-6 border border-brand-gold-light/10 shadow-sm">
            <h2 className="font-serif text-lg font-bold text-brand-brown-dark mb-4">Payment Method</h2>
            <div className="space-y-3">
              {[
                { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order is delivered', icon: '💵' },
                { id: 'upi_qr', label: 'UPI QR Code', desc: 'Pay via any UPI app (GPay, PhonePe, Paytm)', icon: '📱' },
                { id: 'online', label: 'Online Payment', desc: 'Credit/Debit Card, Net Banking (Coming Soon)', icon: '💳', disabled: true },
              ].map(method => (
                <label key={method.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${method.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${paymentMethod === method.id ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-gold-light/10 hover:border-brand-gold-light/30'}`}>
                  <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={() => !method.disabled && setPaymentMethod(method.id)} disabled={method.disabled} className="accent-brand-gold" />
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <span className="font-semibold text-brand-brown-dark">{method.label}</span>
                    <p className="text-xs text-brand-brown-light/60">{method.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl p-6 border border-brand-gold-light/10 shadow-md">
            <h2 className="font-serif text-xl font-bold text-brand-brown-dark mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item._id} className="flex gap-3 text-sm">
                  <img src={item.image_url || ''} alt="" className="w-12 h-12 rounded-lg object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-brand-brown-dark truncate">{item.name}</p>
                    <p className="text-brand-brown-light/50 text-xs">{item.weight} x {item.quantity}</p>
                  </div>
                  <p className="font-semibold shrink-0">{formatPrice(item.total)}</p>
                </div>
              ))}
            </div>

            <hr className="border-brand-gold-light/20 mb-4" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-brown-light">Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-brown-light">Shipping</span>
                <span className={shippingFee === 0 ? 'text-green-600 font-medium' : ''}>{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
              </div>
              <hr className="border-brand-gold-light/20" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-brand-gold-dark">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              // disabled={placing || (!selectedAddress && !showNewAddress)}
              className="w-full btn-primary mt-6 !py-4 text-base flex items-center justify-center gap-2"
            >
              {placing ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
              ) : null}
              {placing ? 'Placing Order...' : `Place Order - ${formatPrice(total)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
