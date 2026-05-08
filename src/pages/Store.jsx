import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { filterAndSortProducts, getCategories } from '../data/products';
import { API_URL } from '../config';

export default function Store() {
  const { storeType } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(true);

  const isDryFruits = storeType === 'dryfruits';
  const title = isDryFruits ? 'Dry Fruits & Nuts' : 'Spices & Masalas';

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();

        if (data.success) {
          let filteredProducts = data.products;

          // Filter by storeType
          if (storeType) {
            filteredProducts = filteredProducts.filter(
              (p) => p.store_type === storeType
            );
          }

          // Filter by category
          if (selectedCategory) {
            filteredProducts = filteredProducts.filter(
              (p) => p.category === selectedCategory
            );
          }

          // Sorting
          if (sortBy === "price_low") {
            filteredProducts.sort((a, b) => a.price_100g - b.price_100g);
          } else if (sortBy === "price_high") {
            filteredProducts.sort((a, b) => b.price_100g - a.price_100g);
          } else if (sortBy === "name") {
            filteredProducts.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
          }

          setProducts(filteredProducts);

          // Generate categories dynamically
          const uniqueCategories = [
            ...new Set(
              data.products
                .filter((p) => p.store_type === storeType)
                .map((p) => p.category)
            ),
          ];

          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [storeType, selectedCategory, sortBy]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className={`relative py-16 md:py-20 ${isDryFruits ? 'bg-gradient-to-br from-brand-almond-dark to-brand-brown-dark' : 'bg-gradient-to-br from-brand-spice/90 to-brand-brown-dark'}`}>
        <div className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: isDryFruits
              ? `url('https://images.unsplash.com/photo-1606050627573-a8aab022e261?w=1920')`
              : `url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-5xl md:text-6xl mb-4 block">{isDryFruits ? '🥜' : '🌶️'}</span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-3">{title}</h1>
          <p className="text-brand-cream/70 max-w-lg mx-auto">
            {isDryFruits
              ? 'Premium nuts, seeds, dried fruits, and exotic mixes sourced from the finest farms'
              : 'Authentic whole spices and freshly ground masalas from across India'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${!selectedCategory ? 'bg-brand-gold text-white shadow-md' : 'bg-white text-brand-brown hover:bg-brand-cream border border-brand-gold-light/20'
                }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-brand-gold text-white shadow-md' : 'bg-white text-brand-brown hover:bg-brand-cream border border-brand-gold-light/20'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-brand-gold-light/20 bg-white text-sm text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
          >
            <option value="">Sort: Featured</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name: A-Z</option>
          </select>
        </div>

        {/* Product count */}
        <p className="text-sm text-brand-brown-light/60 mb-6">
          Showing {products.length} {products.length === 1 ? 'product' : 'products'}
          {selectedCategory ? ` in ${selectedCategory}` : ''}
        </p>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-square bg-brand-cream" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-brand-cream rounded w-3/4" />
                  <div className="h-3 bg-brand-cream rounded w-1/2" />
                  <div className="h-8 bg-brand-cream rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="font-serif text-xl font-semibold text-brand-brown-dark mb-2">No products found</h3>
            <p className="text-brand-brown-light/60">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
}


















// import { useState, useEffect } from 'react';
// import { useParams, useSearchParams } from 'react-router-dom';
// import ProductCard from '../components/ProductCard';
// import { filterAndSortProducts, getCategories } from '../data/products';
// import { API_URL } from '../config';

// export default function Store() {
//   const { storeType } = useParams();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
//   const [sortBy, setSortBy] = useState('');
//   const [loading, setLoading] = useState(true);

//   const isDryFruits = storeType === 'dryfruits';
//   const title = isDryFruits ? 'Dry Fruits & Nuts' : 'Spices & Masalas';

//   useEffect(() => {
//     setSelectedCategory(searchParams.get('category') || '');
//   }, [searchParams]);

//   useEffect(() => {
//     setLoading(true);
//     const filtered = filterAndSortProducts({ storeType, category: selectedCategory, sortBy });
//     setProducts(filtered);
//     setCategories(getCategories(storeType));
//     setLoading(false);
//   }, [storeType, selectedCategory, sortBy]);

//   const handleCategoryChange = (cat) => {
//     setSelectedCategory(cat);
//     if (cat) {
//       setSearchParams({ category: cat });
//     } else {
//       setSearchParams({});
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Hero */}
//       <div className={`relative py-16 md:py-20 ${isDryFruits ? 'bg-gradient-to-br from-brand-almond-dark to-brand-brown-dark' : 'bg-gradient-to-br from-brand-spice/90 to-brand-brown-dark'}`}>
//         <div className="absolute inset-0 opacity-15"
//           style={{
//             backgroundImage: isDryFruits
//               ? `url('https://images.unsplash.com/photo-1606050627573-a8aab022e261?w=1920')`
//               : `url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920')`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         />
//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
//           <span className="text-5xl md:text-6xl mb-4 block">{isDryFruits ? '🥜' : '🌶️'}</span>
//           <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-3">{title}</h1>
//           <p className="text-brand-cream/70 max-w-lg mx-auto">
//             {isDryFruits
//               ? 'Premium nuts, seeds, dried fruits, and exotic mixes sourced from the finest farms'
//               : 'Authentic whole spices and freshly ground masalas from across India'}
//           </p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
//         {/* Filters */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//           {/* Categories */}
//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={() => handleCategoryChange('')}
//               className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
//                 !selectedCategory ? 'bg-brand-gold text-white shadow-md' : 'bg-white text-brand-brown hover:bg-brand-cream border border-brand-gold-light/20'
//               }`}
//             >
//               All
//             </button>
//             {categories.map(cat => (
//               <button
//                 key={cat}
//                 onClick={() => handleCategoryChange(cat)}
//                 className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
//                   selectedCategory === cat ? 'bg-brand-gold text-white shadow-md' : 'bg-white text-brand-brown hover:bg-brand-cream border border-brand-gold-light/20'
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           {/* Sort */}
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="px-4 py-2.5 rounded-xl border border-brand-gold-light/20 bg-white text-sm text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
//           >
//             <option value="">Sort: Featured</option>
//             <option value="price_low">Price: Low to High</option>
//             <option value="price_high">Price: High to Low</option>
//             <option value="rating">Highest Rated</option>
//             <option value="name">Name: A-Z</option>
//           </select>
//         </div>

//         {/* Product count */}
//         <p className="text-sm text-brand-brown-light/60 mb-6">
//           Showing {products.length} {products.length === 1 ? 'product' : 'products'}
//           {selectedCategory ? ` in ${selectedCategory}` : ''}
//         </p>

//         {/* Products Grid */}
//         {loading ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
//                 <div className="aspect-square bg-brand-cream" />
//                 <div className="p-4 space-y-3">
//                   <div className="h-4 bg-brand-cream rounded w-3/4" />
//                   <div className="h-3 bg-brand-cream rounded w-1/2" />
//                   <div className="h-8 bg-brand-cream rounded" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : products.length > 0 ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//             {products.map(product => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20">
//             <span className="text-6xl mb-4 block">🔍</span>
//             <h3 className="font-serif text-xl font-semibold text-brand-brown-dark mb-2">No products found</h3>
//             <p className="text-brand-brown-light/60">Try selecting a different category</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
