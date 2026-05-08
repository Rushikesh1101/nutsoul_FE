import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-brand-gold-light/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-brand-gold to-brand-almond flex items-center justify-center shadow-md">
              <span className="text-white font-serif font-bold text-lg md:text-xl">S</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif font-bold text-brand-brown-dark text-sm md:text-base leading-tight">Shubham</h1>
              <p className="text-[10px] md:text-xs text-brand-almond font-medium tracking-wider">DRY FRUITS & SPICES</p>
            </div>
          </Link>

          {/* Search - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search dry fruits, spices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-gold-light/30 bg-brand-cream/50 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold text-sm transition-all"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-almond-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/store/dryfruits" className="px-3 py-2 rounded-lg text-sm font-medium text-brand-brown hover:bg-brand-gold/10 hover:text-brand-gold-dark transition-colors">
              Dry Fruits
            </Link>
            <Link to="/store/spices" className="px-3 py-2 rounded-lg text-sm font-medium text-brand-brown hover:bg-brand-gold/10 hover:text-brand-gold-dark transition-colors">
              Spices
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative px-3 py-2 rounded-lg text-brand-brown hover:bg-brand-gold/10 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-spice text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-brand-gold/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-gold to-brand-pistachio flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{user.name[0].toUpperCase()}</span>
                  </div>
                  <span className="text-sm font-medium text-brand-brown max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                  <svg className={`w-4 h-4 text-brand-brown transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-brand-gold-light/20 py-2 z-50 animate-fade-in">
                      <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-brand-brown hover:bg-brand-cream transition-colors">My Dashboard</Link>
                      <Link to="/dashboard/orders" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-brand-brown hover:bg-brand-cream transition-colors">My Orders</Link>
                      <Link to="/dashboard/wishlist" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-brand-brown hover:bg-brand-cream transition-colors">Wishlist</Link>
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-brand-spice font-medium hover:bg-red-50 transition-colors">Admin Panel</Link>
                      )}
                      <hr className="my-1 border-brand-gold-light/20" />
                      <button onClick={() => { logout(); setUserMenuOpen(false); navigate('/'); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">Logout</button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-primary !py-2 !px-4 text-sm">Login</Link>
            )}
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link to="/cart" className="relative p-2">
              <svg className="w-6 h-6 text-brand-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-brand-spice text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>
              )}
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
              <svg className="w-6 h-6 text-brand-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-brand-gold-light/20 animate-slide-up">
          <div className="px-4 py-3">
            <form onSubmit={handleSearch} className="mb-3">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field text-sm"
              />
            </form>
            <div className="space-y-1">
              <Link to="/store/dryfruits" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-brand-brown hover:bg-brand-cream font-medium transition-colors">Dry Fruits</Link>
              <Link to="/store/spices" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-brand-brown hover:bg-brand-cream font-medium transition-colors">Spices</Link>
              <hr className="border-brand-gold-light/20" />
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-brand-brown hover:bg-brand-cream transition-colors">My Dashboard</Link>
                  <Link to="/dashboard/orders" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-brand-brown hover:bg-brand-cream transition-colors">My Orders</Link>
                  <Link to="/dashboard/wishlist" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-brand-brown hover:bg-brand-cream transition-colors">Wishlist</Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-brand-spice font-medium hover:bg-red-50 transition-colors">Admin Panel</Link>
                  )}
                  <button onClick={() => { logout(); setMobileOpen(false); navigate('/'); }} className="block w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">Logout</button>
                </>
              ) : (
                <div className="flex gap-3 pt-2">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-primary flex-1 text-center !py-2.5 text-sm">Login</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-outline flex-1 text-center !py-2.5 text-sm">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
