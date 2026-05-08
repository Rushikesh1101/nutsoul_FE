import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice, getOrderStatusColor, getPaymentStatusColor, INDIAN_STATES } from '../utils/helpers';
import Add_Items from "../components/admin_dashboard_pages/add_products";
import Add_Address from "../components/user_pages/add_address";

function DashboardNav() {
  const location = useLocation();
  const { user } = useAuth();
  const links = [
    { to: '/dashboard', label: 'Overview', icon: '📊' },
    { to: '/dashboard/orders', label: 'Orders', icon: '📦' },
    { to: '/dashboard/wishlist', label: 'Wishlist', icon: '❤️' },
    { to: '/dashboard/addresses', label: 'Addresses', icon: '📍' },
    { to: '/dashboard/profile', label: 'Profile', icon: '👤' },
    // { to: '/dashboard/add-items', label: 'Add_Items', icon: '🗂️'},
  ];

  return (
    <div className="bg-white rounded-2xl p-4 border border-brand-gold-light/10 shadow-sm">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-brand-gold-light/20">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-gold to-brand-pistachio flex items-center justify-center">
          <span className="text-white text-lg font-bold">{user?.name?.[0]?.toUpperCase()}</span>
        </div>
        <div>
          <p className="font-semibold text-brand-brown-dark">{user?.name}</p>
          <p className="text-xs text-brand-brown-light/50">{user?.email}</p>
        </div>
      </div>
      <nav className="flex lg:flex-col gap-1 overflow-x-auto">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              location.pathname === link.to
                ? 'bg-brand-gold/10 text-brand-gold-dark'
                : 'text-brand-brown-light hover:bg-brand-cream'
            }`}
          >
            <span>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function Overview() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userOrders = JSON.parse(localStorage.getItem(`sdf_orders_${user?.id}`) || '[]');
    setOrders(userOrders);
  }, [user]);

  const totalOrders = orders.length;
  const totalSpent = orders.filter(o => o.payment_status === 'paid').reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-6">Welcome, {user?.name?.split(' ')[0]}!</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-brand-gold-light/10">
          <p className="text-sm text-brand-brown-light/60">Total Orders</p>
          <p className="text-2xl font-bold text-brand-gold-dark mt-1">{totalOrders}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-brand-gold-light/10">
          <p className="text-sm text-brand-brown-light/60">Total Spent</p>
          <p className="text-2xl font-bold text-brand-pistachio-dark mt-1">{formatPrice(totalSpent)}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-brand-gold-light/10">
          <p className="text-sm text-brand-brown-light/60">Member Since</p>
          <p className="text-lg font-bold text-brand-brown-dark mt-1">{new Date().getFullYear()}</p>
        </div>
      </div>

      {orders.length > 0 && (
        <div>
          <h3 className="font-serif text-lg font-semibold text-brand-brown-dark mb-3">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map(order => (
              <div key={order.order_id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-brand-gold-light/10">
                <div>
                  <p className="font-medium text-brand-gold-dark">{order.order_id}</p>
                  <p className="text-xs text-brand-brown-light/50">{new Date(order.created_at).toLocaleDateString('en-IN')}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatPrice(order.total)}</p>
                  <span className={`badge text-[10px] ${getOrderStatusColor(order.order_status)}`}>{order.order_status.replace(/_/g, ' ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userOrders = JSON.parse(localStorage.getItem(`sdf_orders_${user?.id}`) || '[]');
    setOrders(userOrders);
    setLoading(false);
  }, [user]);

  if (loading) return <div className="animate-pulse space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-brand-cream rounded-xl" />)}</div>;

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-6">My Orders</h2>
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-5xl mb-3 block">📦</span>
          <p className="text-brand-brown-light/60">No orders yet</p>
          <Link to="/store/dryfruits" className="btn-primary mt-4 inline-block">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.order_id} className="bg-white rounded-xl border border-brand-gold-light/10 overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-brand-cream/30">
                <div>
                  <p className="font-bold text-brand-gold-dark">{order.order_id}</p>
                  <p className="text-xs text-brand-brown-light/50">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`badge text-[10px] ${getOrderStatusColor(order.order_status)}`}>{order.order_status.replace(/_/g, ' ')}</span>
                  <span className={`badge text-[10px] ${getPaymentStatusColor(order.payment_status)}`}>{order.payment_status.replace(/_/g, ' ')}</span>
                </div>
              </div>
              <div className="p-4">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm py-1.5 border-b border-brand-gold-light/5 last:border-0">
                    <span className="text-brand-brown-dark">{item.product_name} <span className="text-brand-brown-light/50">({item.weight} x{item.quantity})</span></span>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="flex justify-between mt-3 pt-3 border-t border-brand-gold-light/20 font-bold">
                  <span>Total</span>
                  <span className="text-brand-gold-dark">{formatPrice(order.total)}</span>
                </div>
                {order.tracking_id && <p className="text-xs text-brand-pistachio mt-2">Tracking: {order.tracking_id}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { getWishlistProducts, toggleWishlist } = useWishlist();

  useEffect(() => {
    setItems(getWishlistProducts());
    setLoading(false);
  }, [getWishlistProducts]);

  const remove = (productId) => {
    toggleWishlist(productId);
    setItems(prev => prev.filter(i => i.id !== productId));
    toast.success('Removed from wishlist');
  };

  if (loading) return <div className="animate-pulse space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-brand-cream rounded-xl" />)}</div>;

  const imgFallback = 'https://images.unsplash.com/photo-1606050627573-a8aab022e261?w=200';

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-6">My Wishlist ({items.length})</h2>
      {items.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-5xl mb-3 block">❤️</span>
          <p className="text-brand-brown-light/60">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 p-4 bg-white rounded-xl border border-brand-gold-light/10">
              <img
                src={item.image_url || imgFallback}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover cursor-pointer"
                onClick={() => navigate(`/product/${item.slug}`)}
                onError={(e) => { e.target.src = imgFallback; }}
              />
              <div className="flex-1">
                <h3 className="font-semibold text-brand-brown-dark cursor-pointer hover:text-brand-gold-dark" onClick={() => navigate(`/product/${item.slug}`)}>{item.name}</h3>
                <p className="text-sm text-brand-gold-dark font-semibold mt-1">{formatPrice(item.price_250g)}/250g</p>
                <div className="flex gap-3 mt-2">
                  <button onClick={() => navigate(`/product/${item.slug}`)} className="text-xs text-brand-gold font-medium hover:text-brand-gold-dark">View Product</button>
                  <button onClick={() => remove(item.id)} className="text-xs text-red-500 font-medium hover:text-red-700">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// function Addresses() {
//   const { user } = useAuth();
//   const ADDR_KEY = `sdf_addresses_${user?.id}`;
//   const [addresses, setAddresses] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [form, setForm] = useState({ label: 'Home', name: '', phone: '', address_line1: '', address_line2: '', city: '', state: '', pincode: '', is_default: false });

//   useEffect(() => {
//     setAddresses(JSON.parse(localStorage.getItem(ADDR_KEY) || '[]'));
//   }, [ADDR_KEY]);

//   const handleAdd = () => {
//     const newAddr = { id: `addr_${Date.now()}`, ...form };
//     const updated = [...addresses, newAddr];
//     localStorage.setItem(ADDR_KEY, JSON.stringify(updated));
//     setAddresses(updated);
//     setShowForm(false);
//     setForm({ label: 'Home', name: '', phone: '', address_line1: '', address_line2: '', city: '', state: '', pincode: '', is_default: false });
//     toast.success('Address added!');
//   };

//   const handleDelete = (id) => {
//     const updated = addresses.filter(a => a.id !== id);
//     localStorage.setItem(ADDR_KEY, JSON.stringify(updated));
//     setAddresses(updated);
//     toast.success('Address deleted');
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="font-serif text-2xl font-bold text-brand-brown-dark">My Addresses</h2>
//         <button onClick={() => setShowForm(true)} className="btn-primary !py-2 !px-4 text-sm">+ Add Address</button>
//       </div>

//       {showForm && (
//         <div className="bg-white rounded-xl p-6 border border-brand-gold-light/10 mb-6">
//           <div className="grid grid-cols-2 gap-4">
//             <div><label className="text-sm font-medium mb-1 block">Name *</label><input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" /></div>
//             <div><label className="text-sm font-medium mb-1 block">Phone *</label><input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="input-field" /></div>
//           </div>
//           <div className="mt-4"><label className="text-sm font-medium mb-1 block">Address *</label><input type="text" value={form.address_line1} onChange={e => setForm({...form, address_line1: e.target.value})} className="input-field" /></div>
//           <div className="grid grid-cols-3 gap-4 mt-4">
//             <div><label className="text-sm font-medium mb-1 block">City *</label><input type="text" value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="input-field" /></div>
//             <div><label className="text-sm font-medium mb-1 block">State *</label>
//               <select value={form.state} onChange={e => setForm({...form, state: e.target.value})} className="input-field"><option value="">Select</option>{INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}</select>
//             </div>
//             <div><label className="text-sm font-medium mb-1 block">Pincode *</label><input type="text" value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value})} className="input-field" maxLength={6} /></div>
//           </div>
//           <div className="flex gap-3 mt-4">
//             <button onClick={handleAdd} className="btn-primary !py-2">Save</button>
//             <button onClick={() => setShowForm(false)} className="btn-outline !py-2">Cancel</button>
//           </div>
//         </div>
//       )}

//       {addresses.length === 0 && !showForm ? (
//         <div className="text-center py-12">
//           <span className="text-5xl mb-3 block">📍</span>
//           <p className="text-brand-brown-light/60">No addresses saved</p>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {addresses.map(addr => (
//             <div key={addr.id} className="flex items-start justify-between p-4 bg-white rounded-xl border border-brand-gold-light/10">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <span className="font-semibold text-brand-brown-dark">{addr.name}</span>
//                   <span className="badge-gold text-[10px]">{addr.label}</span>
//                   {addr.is_default ? <span className="badge-green text-[10px]">Default</span> : null}
//                 </div>
//                 <p className="text-sm text-brand-brown-light/70 mt-1">{addr.address_line1}, {addr.city}, {addr.state} - {addr.pincode}</p>
//                 <p className="text-sm text-brand-brown-light/50">Phone: {addr.phone}</p>
//               </div>
//               <button onClick={() => handleDelete(addr.id)} className="text-xs text-red-500 hover:text-red-700">Delete</button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

function Profile() {
  const { user, updateProfile, logout, changePassword } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateProfile(name, phone);
      toast.success('Profile updated!');
    } catch { toast.error('Failed to update'); }
    finally { setSaving(false); }
  };

  const handleChangePassword = async () => {
    try {
      await changePassword(currentPassword, newPassword);
      toast.success('Password changed!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      toast.error(err.message || 'Failed to change password');
    }
  };

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-6">My Profile</h2>

      <div className="bg-white rounded-xl p-6 border border-brand-gold-light/10 mb-6">
        <h3 className="font-semibold text-brand-brown-dark mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="text-sm font-medium mb-1 block">Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="input-field" /></div>
          <div><label className="text-sm font-medium mb-1 block">Phone</label><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="input-field" /></div>
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium mb-1 block">Email</label>
          <input type="email" value={user?.email || ''} className="input-field opacity-60" disabled />
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary !py-2 mt-4">{saving ? 'Saving...' : 'Save Changes'}</button>
      </div>

      <div className="bg-white rounded-xl p-6 border border-brand-gold-light/10 mb-6">
        <h3 className="font-semibold text-brand-brown-dark mb-4">Change Password</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="text-sm font-medium mb-1 block">Current Password</label><input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="input-field" /></div>
          <div><label className="text-sm font-medium mb-1 block">New Password</label><input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="input-field" /></div>
        </div>
        <button onClick={handleChangePassword} className="btn-outline !py-2 mt-4">Change Password</button>
      </div>

      <button onClick={() => { logout(); navigate('/'); }} className="text-red-500 hover:text-red-700 text-sm font-medium">Logout</button>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <DashboardNav />
        </div>
        <div className="lg:col-span-3">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/addresses" element={<Add_Address />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-items" element={<Add_Items />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
