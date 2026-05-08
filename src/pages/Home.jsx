import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts, getBestsellers } from '../data/products';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    setFeaturedProducts(getFeaturedProducts().slice(0, 8));
    setBestsellers(getBestsellers().slice(0, 8));
  }, []);

  return (
    <div>
      {/* Hero Section with Category Cards */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-pattern">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-brown-dark/90 via-brand-brown/80 to-brand-almond-dark/90" />
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1606050627573-a8aab022e261?w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-brown-dark/60 via-transparent to-brand-brown-dark/40" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-brand-pistachio/10 blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
          {/* Brand Title */}
          <div className="mb-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-brand-gold-light text-xs font-medium tracking-wider uppercase">Premium Quality Since Day One</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-3 leading-tight">
              Shubham
            </h1>
            <p className="text-brand-gold-light text-lg md:text-2xl font-serif tracking-wide">Dry Fruits & Spices</p>
            <p className="text-brand-cream/60 text-sm md:text-base mt-3 max-w-lg mx-auto">
              Handpicked premium dry fruits, exotic nuts, and authentic Indian spices delivered fresh to your doorstep
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-12 max-w-3xl mx-auto">
            {/* Dry Fruits Card */}
            <Link to="/store/dryfruits" className="group">
              <div className="glass-card p-8 md:p-10 hover-lift cursor-pointer text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-brand-almond/10 group-hover:from-brand-gold/15 group-hover:to-brand-almond/20 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-gold/30 to-brand-almond/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <span className="text-4xl md:text-5xl">🥜</span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">Dry Fruits</h2>
                  <p className="text-brand-cream/70 text-sm">Premium nuts, seeds, dried fruits & exotic mixes</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-brand-gold-light text-sm font-medium group-hover:gap-3 transition-all">
                    Explore Collection
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Spices Card */}
            <Link to="/store/spices" className="group">
              <div className="glass-card p-8 md:p-10 hover-lift cursor-pointer text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-saffron/5 to-brand-spice/10 group-hover:from-brand-saffron/15 group-hover:to-brand-spice/20 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-saffron/30 to-brand-spice/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <span className="text-4xl md:text-5xl">🌶️</span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">Spices</h2>
                  <p className="text-brand-cream/70 text-sm">Authentic whole spices & freshly ground powders</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-brand-saffron text-sm font-medium group-hover:gap-3 transition-all">
                    Explore Collection
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-12 text-brand-cream/50 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              100% Authentic
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              Free Shipping 500+
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              Freshness Guaranteed
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-brand-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="text-center mb-10">
            <span className="badge-gold mb-2">Curated Selection</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown-dark mt-2">Featured Products</h2>
            <p className="text-brand-brown-light/70 mt-2 max-w-md mx-auto">Handpicked premium quality products loved by our customers</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="bg-white/60 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown-dark">Why Choose Shubham?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🌿', title: 'Farm Fresh', desc: 'Sourced directly from trusted farms and plantations across India and the world' },
              { icon: '✨', title: 'Premium Quality', desc: 'Every product is quality tested and handpicked to ensure the finest standards' },
              { icon: '📦', title: 'Secure Packaging', desc: 'Air-tight packaging to preserve freshness, flavor, and nutritional value' },
              { icon: '🚚', title: 'Fast Delivery', desc: 'Quick and reliable delivery across India. Free shipping on orders above ₹500' },
            ].map((item, i) => (
              <div key={i} className="glass-card-solid p-6 text-center hover-lift">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-serif font-semibold text-brand-brown-dark text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-brand-brown-light/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      {/* {bestsellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="text-center mb-10">
            <span className="badge-green mb-2">Customer Favorites</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown-dark mt-2">Bestsellers</h2>
            <p className="text-brand-brown-light/70 mt-2 max-w-md mx-auto">Most loved products by our customers</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestsellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )} */}

      {/* CTA Banner */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-brown-dark to-brand-almond-dark" />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920')`,
            backgroundSize: 'cover',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Taste the Difference</h2>
          <p className="text-brand-cream/70 mb-8 max-w-lg mx-auto">Experience the finest dry fruits and authentic spices from India. Your satisfaction is our promise.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/store/dryfruits" className="btn-primary">Shop Dry Fruits</Link>
            <Link to="/store/spices" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-white/30">Shop Spices</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
