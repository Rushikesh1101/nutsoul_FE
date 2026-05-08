import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-brown-dark text-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-gold to-brand-almond-light flex items-center justify-center">
                <span className="text-white font-serif font-bold text-xl">S</span>
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg">Shubham</h3>
                <p className="text-xs text-brand-gold-light tracking-wider">DRY FRUITS & SPICES</p>
              </div>
            </div>
            <p className="text-sm text-brand-cream/70 leading-relaxed">
              Premium quality dry fruits, nuts, seeds, and authentic Indian spices. Delivered fresh to your doorstep with trust and care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-brand-gold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/store/dryfruits" className="block text-sm text-brand-cream/70 hover:text-brand-gold transition-colors">Dry Fruits</Link>
              <Link to="/store/spices" className="block text-sm text-brand-cream/70 hover:text-brand-gold transition-colors">Spices</Link>
              <Link to="/cart" className="block text-sm text-brand-cream/70 hover:text-brand-gold transition-colors">My Cart</Link>
              <Link to="/dashboard/orders" className="block text-sm text-brand-cream/70 hover:text-brand-gold transition-colors">Track Order</Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-serif font-semibold text-brand-gold mb-4">Customer Service</h4>
            <div className="space-y-2">
              <Link to="/dashboard" className="block text-sm text-brand-cream/70 hover:text-brand-gold transition-colors">My Account</Link>
              <Link to="/dashboard/addresses" className="block text-sm text-brand-cream/70 hover:text-brand-gold transition-colors">Addresses</Link>
              <Link to="/dashboard/wishlist" className="block text-sm text-brand-cream/70 hover:text-brand-gold transition-colors">Wishlist</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-brand-gold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm text-brand-cream/70">
              <p className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-brand-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                info@shubhamdryfruits.com
              </p>
              <p className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-brand-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +91 98765 43210
              </p>
              <p className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-brand-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                India
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-cream/10 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-brand-cream/50">&copy; {new Date().getFullYear()} Shubham Dry Fruits & Spices. All rights reserved.</p>
          <div className="flex items-center gap-4 text-brand-cream/50 text-xs">
            <span>Secure Payments</span>
            <span>|</span>
            <span>Free Shipping over &#8377;500</span>
            <span>|</span>
            <span>100% Authentic</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
