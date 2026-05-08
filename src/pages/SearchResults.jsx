import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { searchProducts } from '../data/products';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      const results = searchProducts(query);
      setProducts(results);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-brand-brown-dark mb-2">
        Search Results for "{query}"
      </h1>
      <p className="text-brand-brown-light/60 mb-8">{products.length} products found</p>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
              <div className="aspect-square bg-brand-cream" />
              <div className="p-4 space-y-3"><div className="h-4 bg-brand-cream rounded w-3/4" /></div>
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">🔍</span>
          <h3 className="font-serif text-xl font-semibold text-brand-brown-dark mb-2">No products found</h3>
          <p className="text-brand-brown-light/60">Try a different search term</p>
        </div>
      )}
    </div>
  );
}
