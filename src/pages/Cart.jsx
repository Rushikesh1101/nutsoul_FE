import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import { API_URL } from '../config';

export default function Cart() {
  const { user } = useAuth();
  // const { updateQuantity, removeFromCart, saveForLater, getSavedForLater, moveToCart } = useCart();
  const [savedItems, setSavedItems] = useState([]);

  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/cart_info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCartItems(data.cart_items);
      } else {
        toast.error(data.message || "Failed to fetch cart");
      }

    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = async (itemId) => {
    try {
      await fetch(`${API_URL}/increase_quantity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          item_id: itemId
        })
      });

      fetchCart(); // refresh
    } catch (err) {
      toast.error("Failed to increase quantity");
    }
  };

  const decreaseQuantity = async (itemId) => {
    try {
      await fetch(`${API_URL}/decrease_quantity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          item_id: itemId
        })
      });

      fetchCart(); // refresh
    } catch (err) {
      toast.error("Failed to decrease quantity");
    }
  };

  const removeItem = async (itemId) => {
    try {
      await fetch(`${API_URL}/remove_from_cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          item_id: itemId
        })
      });

      toast.success("Item removed");
      fetchCart(); // refresh
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + (item.price * item.quantity),
    0
  );
  if (loading) {
    return <div className="text-center py-20">Loading cart...</div>;
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl mb-4 block">🛒</span>
        <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-3">Your Cart is Empty</h2>
        <p className="text-brand-brown-light/70 mb-6">Please login to view your cart</p>
        <Link to="/login" className="btn-primary">Login</Link>
      </div>
    );
  }

  const shippingFee = cartSubtotal >= 500 ? 0 : 50;
  const total = cartSubtotal + shippingFee;
  const imgFallback = 'https://images.unsplash.com/photo-1606050627573-a8aab022e261?w=200';


  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl mb-4 block">🛒</span>
        <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-3">Your Cart is Empty</h2>
        <p className="text-brand-brown-light/70 mb-6">Looks like you haven't added anything yet</p>
        <div className="flex gap-4 justify-center">
          <Link to="/store/dryfruits" className="btn-primary">Shop Dry Fruits</Link>
          <Link to="/store/spices" className="btn-secondary">Shop Spices</Link>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-brand-brown-dark mb-8">Shopping Cart ({cartItems.length})</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item._id} className="flex gap-4 p-4 bg-white rounded-xl border border-brand-gold-light/10 shadow-sm">
              <Link to={`/product/${item.slug}`}>
                <img src={item.image_url || imgFallback} alt={item.name} className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover" onError={(e) => { e.target.src = imgFallback; }} />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.slug}`}>
                  <h3 className="font-semibold text-brand-brown-dark hover:text-brand-gold-dark transition-colors truncate">{item.name}</h3>
                </Link>
                <p className="text-sm text-brand-brown-light/60 mt-0.5">Weight: {item.weight}</p>
                <p className="text-sm font-semibold text-brand-gold-dark mt-1">{formatPrice(item.price)} each</p>

                <div className="flex items-center gap-4 mt-3">
                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => decreaseQuantity(item._id)} className="w-8 h-8 rounded-lg bg-brand-cream flex items-center justify-center text-sm font-bold hover:bg-brand-gold-light/30 transition-colors">-</button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item._id)} className="w-8 h-8 rounded-lg bg-brand-cream flex items-center justify-center text-sm font-bold hover:bg-brand-gold-light/30 transition-colors">+</button>
                  </div>

                  <span className="text-brand-gold-light/30">|</span>

                  <button onClick={() => removeItem(item._id)} className="text-xs text-red-500 hover:text-red-700 font-medium">Remove</button>
                  {/* toast.success('Removed'); */}
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-brand-brown-dark">{formatPrice(item.total)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl p-6 border border-brand-gold-light/10 shadow-md">
            <h2 className="font-serif text-xl font-bold text-brand-brown-dark mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-brown-light">Subtotal ({cartItems.length} items)</span>
                <span className="font-medium">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-brown-light">Shipping</span>
                <span className={`font-medium ${shippingFee === 0 ? 'text-green-600' : ''}`}>
                  {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                </span>
              </div>
              {cartSubtotal < 500 && (
                <p className="text-xs text-brand-pistachio">Add {formatPrice(500 - cartSubtotal)} more for free shipping!</p>
              )}
              <hr className="border-brand-gold-light/20" />
              <div className="flex justify-between text-lg font-bold">
                <span className="text-brand-brown-dark">Total</span>
                <span className="text-brand-gold-dark">{formatPrice(total)}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full btn-primary mt-6 flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <div className="flex items-center gap-2 justify-center mt-4 text-xs text-brand-brown-light/50">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Secure Checkout
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}










// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';
// import { formatPrice } from '../utils/helpers';
// import { API_URL } from '../config';

// export default function Cart() {
//   const { user } = useAuth();
//   const { cartItems, cartSubtotal, updateQuantity, removeFromCart, saveForLater, getSavedForLater, moveToCart } = useCart();
//   const [savedItems, setSavedItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       setSavedItems(getSavedForLater());
//     }
//   }, [user, cartItems, getSavedForLater]);

//   if (!user) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-20 text-center">
//         <span className="text-6xl mb-4 block">🛒</span>
//         <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-3">Your Cart is Empty</h2>
//         <p className="text-brand-brown-light/70 mb-6">Please login to view your cart</p>
//         <Link to="/login" className="btn-primary">Login</Link>
//       </div>
//     );
//   }

//   const shippingFee = cartSubtotal >= 500 ? 0 : 50;
//   const total = cartSubtotal + shippingFee;
//   const imgFallback = 'https://images.unsplash.com/photo-1606050627573-a8aab022e261?w=200';

//   const handleMoveToCart = (itemId) => {
//     try {
//       moveToCart(itemId);
//       setSavedItems(getSavedForLater());
//       toast.success('Moved to cart!');
//     } catch {
//       toast.error('Failed to move to cart');
//     }
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-20 text-center">
//         <span className="text-6xl mb-4 block">🛒</span>
//         <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-3">Your Cart is Empty</h2>
//         <p className="text-brand-brown-light/70 mb-6">Looks like you haven't added anything yet</p>
//         <div className="flex gap-4 justify-center">
//           <Link to="/store/dryfruits" className="btn-primary">Shop Dry Fruits</Link>
//           <Link to="/store/spices" className="btn-secondary">Shop Spices</Link>
//         </div>

//         {/* Saved for later */}
//         {savedItems.length > 0 && (
//           <div className="mt-12 text-left max-w-2xl mx-auto">
//             <h3 className="font-serif text-lg font-semibold text-brand-brown-dark mb-4">Saved for Later ({savedItems.length})</h3>
//             <div className="space-y-3">
//               {savedItems.map(item => (
//                 <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-brand-gold-light/10">
//                   <img src={item.image_url || imgFallback} alt={item.name} className="w-16 h-16 rounded-lg object-cover" onError={(e) => { e.target.src = imgFallback; }} />
//                   <div className="flex-1">
//                     <h4 className="font-medium text-brand-brown-dark">{item.name}</h4>
//                     <p className="text-sm text-brand-brown-light/60">{item.weight}</p>
//                   </div>
//                   <button onClick={() => handleMoveToCart(item.id)} className="text-sm text-brand-gold hover:text-brand-gold-dark font-medium">Move to Cart</button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
//       <h1 className="font-serif text-2xl md:text-3xl font-bold text-brand-brown-dark mb-8">Shopping Cart ({cartItems.length})</h1>

//       <div className="grid lg:grid-cols-3 gap-8">
//         {/* Cart Items */}
//         <div className="lg:col-span-2 space-y-4">
//           {cartItems.map(item => (
//             <div key={item.id} className="flex gap-4 p-4 bg-white rounded-xl border border-brand-gold-light/10 shadow-sm">
//               <Link to={`/product/${item.slug}`}>
//                 <img src={item.image_url || imgFallback} alt={item.name} className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover" onError={(e) => { e.target.src = imgFallback; }} />
//               </Link>
//               <div className="flex-1 min-w-0">
//                 <Link to={`/product/${item.slug}`}>
//                   <h3 className="font-semibold text-brand-brown-dark hover:text-brand-gold-dark transition-colors truncate">{item.name}</h3>
//                 </Link>
//                 <p className="text-sm text-brand-brown-light/60 mt-0.5">Weight: {item.weight}</p>
//                 <p className="text-sm font-semibold text-brand-gold-dark mt-1">{formatPrice(item.price)} each</p>

//                 <div className="flex items-center gap-4 mt-3">
//                   {/* Quantity */}
//                   <div className="flex items-center gap-2">
//                     <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="w-8 h-8 rounded-lg bg-brand-cream flex items-center justify-center text-sm font-bold hover:bg-brand-gold-light/30 transition-colors">-</button>
//                     <span className="w-8 text-center font-medium">{item.quantity}</span>
//                     <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-lg bg-brand-cream flex items-center justify-center text-sm font-bold hover:bg-brand-gold-light/30 transition-colors">+</button>
//                   </div>

//                   <span className="text-brand-gold-light/30">|</span>

//                   <button onClick={() => { saveForLater(item.id); setSavedItems(getSavedForLater()); toast.success('Saved for later'); }} className="text-xs text-brand-gold hover:text-brand-gold-dark font-medium">Save for later</button>

//                   <button onClick={() => { removeFromCart(item.id); toast.success('Removed'); }} className="text-xs text-red-500 hover:text-red-700 font-medium">Remove</button>
//                 </div>
//               </div>

//               <div className="text-right">
//                 <p className="font-bold text-brand-brown-dark">{formatPrice(item.total)}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Order Summary */}
//         <div className="lg:col-span-1">
//           <div className="sticky top-24 bg-white rounded-2xl p-6 border border-brand-gold-light/10 shadow-md">
//             <h2 className="font-serif text-xl font-bold text-brand-brown-dark mb-4">Order Summary</h2>
//             <div className="space-y-3 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-brand-brown-light">Subtotal ({cartItems.length} items)</span>
//                 <span className="font-medium">{formatPrice(cartSubtotal)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-brand-brown-light">Shipping</span>
//                 <span className={`font-medium ${shippingFee === 0 ? 'text-green-600' : ''}`}>
//                   {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
//                 </span>
//               </div>
//               {cartSubtotal < 500 && (
//                 <p className="text-xs text-brand-pistachio">Add {formatPrice(500 - cartSubtotal)} more for free shipping!</p>
//               )}
//               <hr className="border-brand-gold-light/20" />
//               <div className="flex justify-between text-lg font-bold">
//                 <span className="text-brand-brown-dark">Total</span>
//                 <span className="text-brand-gold-dark">{formatPrice(total)}</span>
//               </div>
//             </div>
//             <button
//               onClick={() => navigate('/checkout')}
//               className="w-full btn-primary mt-6 flex items-center justify-center gap-2"
//             >
//               Proceed to Checkout
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </button>
//             <div className="flex items-center gap-2 justify-center mt-4 text-xs text-brand-brown-light/50">
//               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
//               Secure Checkout
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Saved for later */}
//       {savedItems.length > 0 && (
//         <div className="mt-12">
//           <h2 className="font-serif text-xl font-bold text-brand-brown-dark mb-4">Saved for Later ({savedItems.length})</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {savedItems.map(item => (
//               <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-brand-gold-light/10">
//                 <img src={item.image_url || imgFallback} alt={item.name} className="w-16 h-16 rounded-lg object-cover" onError={(e) => { e.target.src = imgFallback; }} />
//                 <div className="flex-1">
//                   <h4 className="font-medium text-brand-brown-dark">{item.name}</h4>
//                   <p className="text-sm text-brand-brown-light/60">{item.weight} | Qty: {item.quantity}</p>
//                 </div>
//                 <button onClick={() => handleMoveToCart(item.id)} className="btn-outline !py-2 !px-4 text-xs">Move to Cart</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
