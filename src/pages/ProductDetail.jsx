import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getProductBySlug, filterAndSortProducts } from '../data/products';
import { formatPrice, getProductPrice, WEIGHT_OPTIONS } from '../utils/helpers';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { isWishlisted: checkWishlisted, toggleWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedWeight, setSelectedWeight] = useState('250g');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    setLoading(true);
    const found = getProductBySlug(slug);
    if (found) {
      setProduct(found);
      const relatedProducts = filterAndSortProducts({
        storeType: found.store_type,
        category: found.category,
      }).filter(p => p.slug !== slug).slice(0, 4);
      setRelated(relatedProducts);
    } else {
      navigate('/');
    }
    setLoading(false);
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 animate-pulse">
          <div className="aspect-square bg-brand-cream rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 bg-brand-cream rounded w-3/4" />
            <div className="h-4 bg-brand-cream rounded w-1/2" />
            <div className="h-20 bg-brand-cream rounded" />
            <div className="h-12 bg-brand-cream rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const wishlisted = user ? checkWishlisted(product.id) : false;
  const price = getProductPrice(product, selectedWeight);
  const totalPrice = price * quantity;
  const imgFallback = product.store_type === 'spices'
    ? 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600'
    : 'https://images.unsplash.com/photo-1606050627573-a8aab022e261?w=600';

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    try {
      setIsAdding(true);
      addToCart(product.id, selectedWeight, quantity);
      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      toast.error(err.message || 'Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const handleWishlist = () => {
    if (!user) { toast.error('Please login'); navigate('/login'); return; }
    toggleWishlist(product.id);
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-brand-brown-light/60 mb-6">
        <Link to="/" className="hover:text-brand-gold">Home</Link>
        <span>/</span>
        <Link to={`/store/${product.store_type}`} className="hover:text-brand-gold">
          {product.store_type === 'dryfruits' ? 'Dry Fruits' : 'Spices'}
        </Link>
        <span>/</span>
        <span className="text-brand-brown-dark">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
            <img
              src={product.image_url || imgFallback}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = imgFallback; }}
            />
          </div>
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.is_bestseller ? <span className="badge bg-brand-spice text-white">Bestseller</span> : null}
            {product.is_featured ? <span className="badge bg-brand-gold text-white">Featured</span> : null}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-brand-brown-dark">{product.name}</h1>
          {product.hindi_name && (
            <p className="text-brand-almond-light text-lg mt-1">{product.hindi_name}</p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <svg key={star} className={`w-5 h-5 ${star <= Math.round(product.rating) ? 'text-brand-gold' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-brand-brown-light">{product.rating}</span>
            <span className="text-sm text-brand-brown-light/50">({product.review_count} reviews)</span>
          </div>

          <p className="text-brand-brown-light/80 mt-4 leading-relaxed">{product.description}</p>

          {/* Category */}
          <div className="flex items-center gap-2 mt-4">
            <span className="badge-gold">{product.category}</span>
            <span className="badge-green">{product.subcategory}</span>
          </div>

          {/* Weight Selector */}
          <div className="mt-6">
            <label className="text-sm font-semibold text-brand-brown-dark mb-2 block">Select Weight</label>
            <div className="flex gap-3">
              {WEIGHT_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedWeight(opt.value)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    selectedWeight === opt.value
                      ? 'bg-brand-gold text-white shadow-lg ring-2 ring-brand-gold/30'
                      : 'bg-white text-brand-brown border border-brand-gold-light/20 hover:border-brand-gold'
                  }`}
                >
                  {opt.label}
                  <span className="block text-xs mt-0.5 opacity-75">{formatPrice(getProductPrice(product, opt.value))}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <label className="text-sm font-semibold text-brand-brown-dark mb-2 block">Quantity</label>
            <div className="flex items-center gap-3">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-xl bg-white border border-brand-gold-light/20 flex items-center justify-center hover:bg-brand-cream transition-colors text-lg font-semibold">-</button>
              <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-xl bg-white border border-brand-gold-light/20 flex items-center justify-center hover:bg-brand-cream transition-colors text-lg font-semibold">+</button>
            </div>
          </div>

          {/* Price */}
          <div className="mt-6 p-4 bg-brand-cream/50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-brand-gold-dark">{formatPrice(totalPrice)}</span>
                <span className="text-sm text-brand-brown-light/50 ml-2">for {quantity} x {selectedWeight}</span>
              </div>
              {product.in_stock ? (
                <span className="badge bg-green-100 text-green-800">In Stock</span>
              ) : (
                <span className="badge bg-red-100 text-red-800">Out of Stock</span>
              )}
            </div>
            {totalPrice < 500 && (
              <p className="text-xs text-brand-brown-light/60 mt-2">Add {formatPrice(500 - totalPrice)} more for free shipping</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock || isAdding}
              className="flex-1 btn-primary flex items-center justify-center gap-2 !py-4 text-base"
            >
              {isAdding ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
              )}
              {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button
              onClick={handleWishlist}
              className={`px-5 rounded-xl border-2 transition-all ${
                wishlisted ? 'bg-red-50 border-red-300 text-red-500' : 'border-brand-gold-light/30 text-brand-brown hover:border-brand-gold'
              }`}
            >
              <svg className={`w-6 h-6 ${wishlisted ? 'fill-red-500' : ''}`} fill={wishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Info */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { icon: '🚚', text: 'Free delivery 500+' },
              { icon: '🔄', text: 'Easy returns' },
              { icon: '✅', text: '100% Authentic' },
            ].map((item, i) => (
              <div key={i} className="text-center p-3 bg-white rounded-xl border border-brand-gold-light/10">
                <span className="text-xl">{item.icon}</span>
                <p className="text-[10px] text-brand-brown-light/60 mt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-brand-brown-dark mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map(p => (
              <div key={p.id} className="card-product group" onClick={() => { navigate(`/product/${p.slug}`); window.scrollTo(0, 0); }}>
                <div className="aspect-square overflow-hidden bg-brand-cream cursor-pointer">
                  <img src={p.image_url || imgFallback} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { e.target.src = imgFallback; }} loading="lazy" />
                </div>
                <div className="p-3">
                  <h3 className="font-serif font-semibold text-sm text-brand-brown-dark line-clamp-1">{p.name}</h3>
                  <p className="text-sm font-bold text-brand-gold-dark mt-1">{formatPrice(p.price_250g)}<span className="text-xs font-normal text-brand-brown-light/50">/250g</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
