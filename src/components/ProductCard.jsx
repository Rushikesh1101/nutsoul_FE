import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice, getProductPrice, WEIGHT_OPTIONS } from '../utils/helpers';
import { API_URL } from '../config';

export default function ProductCard({ product }) {
  const [selectedWeight, setSelectedWeight] = useState('250g');
  const [isAdding, setIsAdding] = useState(false);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const price = getProductPrice(product, selectedWeight);
  const imgFallback = product.store_type === 'spices'
    ? 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400'
    : 'https://images.unsplash.com/photo-1606050627573-a8aab022e261?w=400';

    const handleAddToCart = async () => {
      if (!user) {
        toast.error('Please login to add items to cart');
        navigate('/login');
        return;
      }
    
      try {
        setIsAdding(true);
    
        const payload = {
          product_id: product._id,
          name: product.name,
          slug: product.slug,
          hindi_name: product.hindi_name,
          category: product.category,
          subcategory: product.subcategory,
          store_type: product.store_type,
          price: price,
          selected_weight: selectedWeight,
          image_url: product.image_url,
          in_stock: product.in_stock,
          email: user.email,          // ✅ from logged user
          quantity: 1,                // ✅ default quantity
          added_to_cart: true         // ✅ required key
        };
    
        const response = await fetch(`${API_URL}/add_to_cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
    
        const data = await response.json();
    
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to add to cart");
        }
    
        toast.success(`${product.name} added to cart!`);
    
      } catch (err) {
        toast.error(err.message || 'Failed to add to cart');
      } finally {
        setIsAdding(false);
      }
    };

  const handleWishlist = () => {
    if (!user) {
      toast.error('Please login to use wishlist');
      navigate('/login');
      return;
    }
    const nowWishlisted = toggleWishlist(product.id);
    toast.success(nowWishlisted ? 'Added to wishlist!' : 'Removed from wishlist');
  };

  const wishlisted = isWishlisted(product.id);

  return (
    <div className="card-product group">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-brand-cream">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image_url || imgFallback}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => { e.target.src = imgFallback; }}
            loading="lazy"
          />
        </Link>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.is_bestseller ? <span className="badge bg-brand-spice/90 text-white text-[10px]">Bestseller</span> : null}
          {product.is_featured ? <span className="badge bg-brand-gold/90 text-white text-[10px]">Featured</span> : null}
          {!product.in_stock ? <span className="badge bg-gray-800/80 text-white text-[10px]">Out of Stock</span> : null}
        </div>
        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-all"
        >
          <svg className={`w-5 h-5 ${wishlisted ? 'text-red-500 fill-red-500' : 'text-brand-brown-light'}`} fill={wishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-serif font-semibold text-brand-brown-dark group-hover:text-brand-gold-dark transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        {product.hindi_name && (
          <p className="text-xs text-brand-almond-light mt-0.5">{product.hindi_name}</p>
        )}
        <p className="text-xs text-brand-brown-light/70 mt-1 line-clamp-2">{product.short_description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
              <svg key={star} className={`w-3.5 h-3.5 ${star <= Math.round(product.rating) ? 'text-brand-gold' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-brand-brown-light/60">({product.review_count})</span>
        </div>

        {/* Weight Selector */}
        <div className="flex gap-1.5 mt-3">
          {WEIGHT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setSelectedWeight(opt.value)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedWeight === opt.value
                  ? 'bg-brand-gold text-white shadow-md'
                  : 'bg-brand-cream text-brand-brown hover:bg-brand-gold-light/30'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-gold-light/10">
          <div>
            <span className="text-lg font-bold text-brand-gold-dark">{formatPrice(price)}</span>
            <span className="text-[10px] text-brand-brown-light/50 ml-1">/{selectedWeight}</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.in_stock || isAdding}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
              product.in_stock
                ? 'bg-brand-pistachio hover:bg-brand-pistachio-dark text-white shadow-md hover:shadow-lg active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isAdding ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
            ) : product.in_stock ? 'Add' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
}
