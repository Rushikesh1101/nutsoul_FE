export const PRODUCTS = [
  // ===== NUTS =====
  {
    id: 1, name: 'California Almonds', slug: 'california-almonds', hindi_name: 'Badam',
    description: 'Premium quality California almonds, rich in protein, fiber and healthy fats. Perfect for daily snacking and cooking.',
    short_description: 'Premium California almonds, rich in protein & vitamins',
    category: 'Nuts', subcategory: 'Almonds', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400',
    price_100g: 120, price_250g: 280, price_500g: 520, price_1kg: 999,
    in_stock: true, is_featured: true, is_bestseller: true, rating: 4.8, review_count: 234
  },
  {
    id: 2, name: 'Cashews (Whole W240)', slug: 'cashews-whole-w240', hindi_name: 'Kaju',
    description: 'Premium whole cashew nuts W240 grade. Creamy, crunchy and delicious. Ideal for sweets, snacks and cooking.',
    short_description: 'Premium W240 grade whole cashews, creamy & crunchy',
    category: 'Nuts', subcategory: 'Cashews', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400',
    price_100g: 130, price_250g: 310, price_500g: 580, price_1kg: 1099,
    in_stock: true, is_featured: true, is_bestseller: true, rating: 4.9, review_count: 189
  },
  {
    id: 3, name: 'Iranian Pistachios', slug: 'iranian-pistachios', hindi_name: 'Pista',
    description: 'Premium roasted and salted Iranian pistachios. Naturally opened shells, vibrant green kernels with rich flavor.',
    short_description: 'Roasted & salted Iranian pistachios, naturally opened',
    category: 'Nuts', subcategory: 'Pistachios', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1525706040967-1009596f6a00?w=400',
    price_100g: 150, price_250g: 350, price_500g: 670, price_1kg: 1299,
    in_stock: true, is_featured: true, is_bestseller: false, rating: 4.7, review_count: 156
  },
  {
    id: 4, name: 'Chilean Walnuts', slug: 'chilean-walnuts', hindi_name: 'Akhrot',
    description: 'Premium Chilean walnuts with light color kernels. Rich in omega-3 fatty acids, perfect for brain health.',
    short_description: 'Light halves Chilean walnuts, rich in Omega-3',
    category: 'Nuts', subcategory: 'Walnuts', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1563412885-139e4645e166?w=400',
    price_100g: 110, price_250g: 260, price_500g: 490, price_1kg: 940,
    in_stock: true, is_featured: false, is_bestseller: true, rating: 4.6, review_count: 142
  },
  {
    id: 5, name: 'Turkish Hazelnuts', slug: 'turkish-hazelnuts', hindi_name: 'Hazelnuts',
    description: 'Premium Turkish hazelnuts, roasted to perfection. Rich nutty flavor ideal for baking and snacking.',
    short_description: 'Roasted Turkish hazelnuts, rich & flavorful',
    category: 'Nuts', subcategory: 'Hazelnuts', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1574570068782-48aecc6a6295?w=400',
    price_100g: 140, price_250g: 330, price_500g: 630, price_1kg: 1199,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.5, review_count: 87
  },
  {
    id: 6, name: 'Pecans', slug: 'pecans', hindi_name: 'Pecans',
    description: 'Premium pecan halves with buttery rich flavor. Great for pies, salads, and healthy snacking.',
    short_description: 'Buttery rich pecan halves, great for baking',
    category: 'Nuts', subcategory: 'Pecans', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=400',
    price_100g: 200, price_250g: 470, price_500g: 900, price_1kg: 1750,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.4, review_count: 63
  },
  {
    id: 7, name: 'Macadamia Nuts', slug: 'macadamia-nuts', hindi_name: 'Macadamia',
    description: 'Premium Australian macadamia nuts. Creamy, buttery texture with subtle sweetness. The king of nuts.',
    short_description: 'Australian macadamia, creamy & buttery',
    category: 'Nuts', subcategory: 'Macadamia Nuts', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400',
    price_100g: 350, price_250g: 820, price_500g: 1580, price_1kg: 2999,
    in_stock: true, is_featured: true, is_bestseller: false, rating: 4.8, review_count: 45
  },
  {
    id: 8, name: 'Pine Nuts', slug: 'pine-nuts', hindi_name: 'Chilgoza',
    description: 'Premium Himalayan pine nuts (chilgoza). Delicate, buttery flavor perfect for pesto and garnishing.',
    short_description: 'Himalayan pine nuts, delicate & buttery',
    category: 'Nuts', subcategory: 'Pine Nuts', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400',
    price_100g: 400, price_250g: 950, price_500g: 1800, price_1kg: 3499,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.7, review_count: 38
  },

  // ===== DRIED FRUITS =====
  {
    id: 9, name: 'Afghan Green Raisins', slug: 'afghan-green-raisins', hindi_name: 'Kishmish',
    description: 'Premium Afghan green raisins, naturally sweet and seedless. Rich in iron and antioxidants.',
    short_description: 'Seedless Afghan green raisins, naturally sweet',
    category: 'Dried Fruits', subcategory: 'Raisins', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1596273501048-1e5c9d2e19d8?w=400',
    price_100g: 50, price_250g: 110, price_500g: 200, price_1kg: 380,
    in_stock: true, is_featured: true, is_bestseller: true, rating: 4.6, review_count: 312
  },
  {
    id: 10, name: 'Medjool Dates', slug: 'medjool-dates', hindi_name: 'Khajoor',
    description: 'Premium Medjool dates from Jordan. Soft, chewy, and caramel-like sweetness. Nature\'s candy.',
    short_description: 'Soft Medjool dates, caramel-like sweetness',
    category: 'Dried Fruits', subcategory: 'Dates', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1593187589365-43e7ddd0c43c?w=400',
    price_100g: 140, price_250g: 330, price_500g: 620, price_1kg: 1199,
    in_stock: true, is_featured: true, is_bestseller: true, rating: 4.9, review_count: 267
  },
  {
    id: 11, name: 'Turkish Figs', slug: 'turkish-figs', hindi_name: 'Anjeer',
    description: 'Premium dried Turkish figs. Soft, sweet, and packed with fiber. A natural energy booster.',
    short_description: 'Dried Turkish figs, soft & fiber-rich',
    category: 'Dried Fruits', subcategory: 'Figs', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1601379329542-31a59f0a65d6?w=400',
    price_100g: 100, price_250g: 230, price_500g: 440, price_1kg: 849,
    in_stock: true, is_featured: false, is_bestseller: true, rating: 4.7, review_count: 178
  },
  {
    id: 12, name: 'Turkish Apricots', slug: 'turkish-apricots', hindi_name: 'Khubani',
    description: 'Premium dried Turkish apricots. Naturally sweet, tangy, rich in vitamin A and potassium.',
    short_description: 'Dried Turkish apricots, sweet & tangy',
    category: 'Dried Fruits', subcategory: 'Apricots', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1596273501048-1e5c9d2e19d8?w=400',
    price_100g: 80, price_250g: 185, price_500g: 350, price_1kg: 670,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.5, review_count: 134
  },
  {
    id: 13, name: 'Dried Cranberries', slug: 'dried-cranberries', hindi_name: 'Cranberries',
    description: 'Premium whole dried cranberries. Sweet-tart flavor, perfect for trail mixes, salads, and baking.',
    short_description: 'Sweet-tart dried cranberries, perfect for snacking',
    category: 'Dried Fruits', subcategory: 'Cranberries', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400',
    price_100g: 90, price_250g: 210, price_500g: 400, price_1kg: 760,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.4, review_count: 98
  },
  {
    id: 14, name: 'Dried Blueberries', slug: 'dried-blueberries', hindi_name: 'Blueberries',
    description: 'Premium whole dried blueberries. Antioxidant powerhouse with sweet flavor.',
    short_description: 'Antioxidant-rich dried blueberries',
    category: 'Dried Fruits', subcategory: 'Blueberries', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400',
    price_100g: 160, price_250g: 380, price_500g: 720, price_1kg: 1399,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.6, review_count: 76
  },
  {
    id: 15, name: 'Pitted Prunes', slug: 'pitted-prunes', hindi_name: 'Aloo Bukhara',
    description: 'Premium pitted prunes for digestive health. Naturally sweet and chewy.',
    short_description: 'Pitted prunes, great for digestive health',
    category: 'Dried Fruits', subcategory: 'Prunes', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1596273501048-1e5c9d2e19d8?w=400',
    price_100g: 80, price_250g: 185, price_500g: 350, price_1kg: 660,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.3, review_count: 89
  },
  {
    id: 16, name: 'Dried Kiwi Slices', slug: 'dried-kiwi-slices', hindi_name: 'Kiwi',
    description: 'Delicious dried kiwi slices. Tangy, sweet and loaded with vitamin C.',
    short_description: 'Tangy dried kiwi slices, vitamin C rich',
    category: 'Dried Fruits', subcategory: 'Kiwi', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1585059895524-72f7fab20bbb?w=400',
    price_100g: 110, price_250g: 260, price_500g: 490, price_1kg: 940,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.4, review_count: 56
  },
  {
    id: 17, name: 'Dried Mango Slices', slug: 'dried-mango-slices', hindi_name: 'Aam',
    description: 'Premium dried Alphonso mango slices. Sweet, chewy, and tropical. A taste of summer all year.',
    short_description: 'Sweet Alphonso mango slices, tropical delight',
    category: 'Dried Fruits', subcategory: 'Mango', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400',
    price_100g: 100, price_250g: 230, price_500g: 440, price_1kg: 849,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.5, review_count: 67
  },
  {
    id: 18, name: 'Dried Apple Rings', slug: 'dried-apple-rings', hindi_name: 'Seb',
    description: 'Crispy dried apple rings made from Himalayan apples. Light, crunchy, and naturally sweet.',
    short_description: 'Crispy Himalayan apple rings, naturally sweet',
    category: 'Dried Fruits', subcategory: 'Apple', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1596273501048-1e5c9d2e19d8?w=400',
    price_100g: 90, price_250g: 210, price_500g: 400, price_1kg: 760,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.3, review_count: 45
  },

  // ===== SEEDS =====
  {
    id: 19, name: 'Raw Pumpkin Seeds', slug: 'raw-pumpkin-seeds', hindi_name: 'Kaddu Ke Beej',
    description: 'Premium raw pumpkin seeds. Rich in zinc, magnesium, and healthy fats. Perfect for salads and smoothies.',
    short_description: 'Raw pumpkin seeds, rich in zinc & magnesium',
    category: 'Seeds', subcategory: 'Pumpkin Seeds', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1596199040604-aed64e5ef824?w=400',
    price_100g: 70, price_250g: 160, price_500g: 300, price_1kg: 570,
    in_stock: true, is_featured: false, is_bestseller: true, rating: 4.6, review_count: 198
  },
  {
    id: 20, name: 'Sunflower Seeds', slug: 'sunflower-seeds', hindi_name: 'Surajmukhi Ke Beej',
    description: 'Premium raw sunflower seeds. Excellent source of vitamin E and selenium.',
    short_description: 'Raw sunflower seeds, vitamin E powerhouse',
    category: 'Seeds', subcategory: 'Sunflower Seeds', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1596199040604-aed64e5ef824?w=400',
    price_100g: 50, price_250g: 110, price_500g: 200, price_1kg: 380,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.4, review_count: 143
  },
  {
    id: 21, name: 'Chia Seeds', slug: 'chia-seeds', hindi_name: 'Chia Beej',
    description: 'Premium organic chia seeds. Superfood loaded with omega-3, fiber, and protein.',
    short_description: 'Organic chia seeds, omega-3 superfood',
    category: 'Seeds', subcategory: 'Chia Seeds', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1574570068782-48aecc6a6295?w=400',
    price_100g: 60, price_250g: 140, price_500g: 260, price_1kg: 490,
    in_stock: true, is_featured: true, is_bestseller: true, rating: 4.7, review_count: 256
  },
  {
    id: 22, name: 'Flax Seeds', slug: 'flax-seeds', hindi_name: 'Alsi',
    description: 'Premium golden flax seeds. Rich in omega-3 fatty acids and lignans. Heart-healthy superfood.',
    short_description: 'Golden flax seeds, heart-healthy omega-3',
    category: 'Seeds', subcategory: 'Flax Seeds', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1596199040604-aed64e5ef824?w=400',
    price_100g: 40, price_250g: 90, price_500g: 170, price_1kg: 320,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.5, review_count: 167
  },
  {
    id: 23, name: 'White Sesame Seeds', slug: 'white-sesame-seeds', hindi_name: 'Safed Til',
    description: 'Premium hulled white sesame seeds. Rich in calcium, perfect for cooking and garnishing.',
    short_description: 'Hulled white sesame, calcium rich',
    category: 'Seeds', subcategory: 'Sesame Seeds', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1596199040604-aed64e5ef824?w=400',
    price_100g: 35, price_250g: 80, price_500g: 150, price_1kg: 280,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.3, review_count: 98
  },
  {
    id: 24, name: 'Watermelon Seeds', slug: 'watermelon-seeds', hindi_name: 'Magaz',
    description: 'Premium roasted watermelon seeds (magaz). Crunchy, protein-rich traditional Indian snack.',
    short_description: 'Roasted watermelon seeds, protein-rich snack',
    category: 'Seeds', subcategory: 'Watermelon Seeds', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1596199040604-aed64e5ef824?w=400',
    price_100g: 80, price_250g: 185, price_500g: 350, price_1kg: 670,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.4, review_count: 87
  },

  // ===== PREMIUM MIXES =====
  {
    id: 25, name: 'Premium Mixed Dry Fruits', slug: 'premium-mixed-dry-fruits', hindi_name: 'Mix Dry Fruits',
    description: 'Our signature mix of almonds, cashews, pistachios, walnuts, raisins, and more. The perfect gift box.',
    short_description: 'Signature mix of premium nuts & dried fruits',
    category: 'Premium Mixes', subcategory: 'Mixed Dry Fruits', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1606050627573-a8aab022e261?w=400',
    price_100g: 150, price_250g: 350, price_500g: 670, price_1kg: 1299,
    in_stock: true, is_featured: true, is_bestseller: true, rating: 4.9, review_count: 456
  },
  {
    id: 26, name: 'Salted Roasted Nuts', slug: 'salted-roasted-nuts', hindi_name: 'Bhuna Hua Nuts',
    description: 'Perfectly roasted and lightly salted mix of cashews, almonds, and pistachios.',
    short_description: 'Lightly salted roasted nut mix',
    category: 'Premium Mixes', subcategory: 'Roasted Nuts', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1606050627573-a8aab022e261?w=400',
    price_100g: 140, price_250g: 330, price_500g: 630, price_1kg: 1199,
    in_stock: true, is_featured: false, is_bestseller: true, rating: 4.7, review_count: 198
  },
  {
    id: 27, name: 'Honey Roasted Nuts', slug: 'honey-roasted-nuts', hindi_name: 'Shahad Bhuna Nuts',
    description: 'Almonds and cashews roasted with pure honey. Sweet, crunchy, and irresistible.',
    short_description: 'Sweet honey-glazed roasted almonds & cashews',
    category: 'Premium Mixes', subcategory: 'Honey Roasted Nuts', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1606050627573-a8aab022e261?w=400',
    price_100g: 160, price_250g: 380, price_500g: 720, price_1kg: 1399,
    in_stock: true, is_featured: true, is_bestseller: false, rating: 4.8, review_count: 145
  },
  {
    id: 28, name: 'Trail Mix', slug: 'trail-mix', hindi_name: 'Trail Mix',
    description: 'Energizing mix of nuts, seeds, dried cranberries, and dark chocolate chips. Perfect for on-the-go.',
    short_description: 'Nuts, seeds, berries & chocolate chips mix',
    category: 'Premium Mixes', subcategory: 'Trail Mix', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1606050627573-a8aab022e261?w=400',
    price_100g: 120, price_250g: 280, price_500g: 530, price_1kg: 999,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.6, review_count: 167
  },
  {
    id: 29, name: 'Energy Mix', slug: 'energy-mix', hindi_name: 'Energy Mix',
    description: 'High-protein energy mix with nuts, seeds, dates, and coconut. Natural pre-workout fuel.',
    short_description: 'High-protein nuts, seeds & dates energy mix',
    category: 'Premium Mixes', subcategory: 'Energy Mix', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1606050627573-a8aab022e261?w=400',
    price_100g: 130, price_250g: 310, price_500g: 580, price_1kg: 1099,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.5, review_count: 112
  },
  {
    id: 30, name: 'Exotic Mix', slug: 'exotic-mix', hindi_name: 'Exotic Mix',
    description: 'Luxury mix of macadamias, pecans, blueberries, kiwi, and goji berries. The ultimate indulgence.',
    short_description: 'Luxury exotic nuts & berries collection',
    category: 'Premium Mixes', subcategory: 'Exotic Mix', store_type: 'dryfruits',
    image_url: 'https://images.unsplash.com/photo-1606050627573-a8aab022e261?w=400',
    price_100g: 250, price_250g: 590, price_500g: 1130, price_1kg: 2199,
    in_stock: true, is_featured: true, is_bestseller: false, rating: 4.8, review_count: 78
  },

  // ===== WHOLE SPICES =====
  {
    id: 31, name: 'Black Pepper (Whole)', slug: 'black-pepper-whole', hindi_name: 'Kali Mirch',
    description: 'Premium Malabar black pepper. Bold, pungent, and aromatic. The king of spices from Kerala.',
    short_description: 'Premium Malabar black pepper, bold & aromatic',
    category: 'Whole Spices', subcategory: 'Black Pepper', store_type: 'spices',
    image_url: 'https://images.unsplash.com/photo-1599909533601-fc780b5d7801?w=400',
    price_100g: 80, price_250g: 185, price_500g: 350, price_1kg: 670,
    in_stock: true, is_featured: true, is_bestseller: true, rating: 4.8, review_count: 234
  },
  {
    id: 32, name: 'Cloves (Whole)', slug: 'cloves-whole', hindi_name: 'Laung',
    description: 'Premium hand-picked whole cloves from Kerala. Intense aroma, essential for biryanis and chai.',
    short_description: 'Hand-picked Kerala cloves, intense aroma',
    category: 'Whole Spices', subcategory: 'Cloves', store_type: 'spices',
    image_url: 'https://images.unsplash.com/photo-1599909533601-fc780b5d7801?w=400',
    price_100g: 120, price_250g: 280, price_500g: 530, price_1kg: 999,
    in_stock: true, is_featured: true, is_bestseller: false, rating: 4.7, review_count: 167
  },
  {
    id: 33, name: 'Green Cardamom', slug: 'green-cardamom', hindi_name: 'Elaichi',
    description: 'Premium Alleppey green cardamom. Intensely aromatic with sweet, floral notes. Perfect for desserts and chai.',
    short_description: 'Alleppey green cardamom, intensely aromatic',
    category: 'Whole Spices', subcategory: 'Cardamom', store_type: 'spices',
    image_url: 'https://images.unsplash.com/photo-1599909533601-fc780b5d7801?w=400',
    price_100g: 200, price_250g: 470, price_500g: 900, price_1kg: 1750,
    in_stock: true, is_featured: true, is_bestseller: true, rating: 4.9, review_count: 289
  },
  {
    id: 34, name: 'Cinnamon Sticks', slug: 'cinnamon-sticks', hindi_name: 'Dalchini',
    description: 'Premium Ceylon cinnamon sticks. Sweet, delicate, and less bark-like than cassia. True cinnamon.',
    short_description: 'True Ceylon cinnamon, sweet & delicate',
    category: 'Whole Spices', subcategory: 'Cinnamon', store_type: 'spices',
    image_url: 'https://images.unsplash.com/photo-1599909533601-fc780b5d7801?w=400',
    price_100g: 90, price_250g: 210, price_500g: 400, price_1kg: 760,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.6, review_count: 145
  },
  {
    id: 35, name: 'Star Anise', slug: 'star-anise', hindi_name: 'Chakra Phool',
    description: 'Premium whole star anise. Beautiful star-shaped spice with sweet licorice flavor.',
    short_description: 'Whole star anise, sweet licorice flavor',
    category: 'Whole Spices', subcategory: 'Star Anise', store_type: 'spices',
    image_url: 'https://images.unsplash.com/photo-1599909533601-fc780b5d7801?w=400',
    price_100g: 100, price_250g: 230, price_500g: 440, price_1kg: 849,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.5, review_count: 89
  },
  {
    id: 36, name: 'Nutmeg (Whole)', slug: 'nutmeg-whole', hindi_name: 'Jaiphal',
    description: 'Premium whole nutmeg from Kerala. Warm, sweet, and aromatic. Essential for garam masala.',
    short_description: 'Kerala nutmeg, warm & aromatic',
    category: 'Whole Spices', subcategory: 'Nutmeg', store_type: 'spices',
    image_url: 'https://images.unsplash.com/photo-1599909533601-fc780b5d7801?w=400',
    price_100g: 150, price_250g: 350, price_500g: 670, price_1kg: 1299,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.6, review_count: 76
  },
  {
    id: 37, name: 'Bay Leaves', slug: 'bay-leaves', hindi_name: 'Tej Patta',
    description: 'Premium dried bay leaves. Adds subtle herbal depth to curries, rice, and stews.',
    short_description: 'Aromatic bay leaves for curries & rice',
    category: 'Whole Spices', subcategory: 'Bay Leaves', store_type: 'spices',
    image_url: 'https://images.unsplash.com/photo-1599909533601-fc780b5d7801?w=400',
    price_100g: 40, price_250g: 90, price_500g: 170, price_1kg: 320,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.4, review_count: 112
  },
  {
    id: 38, name: 'Cumin Seeds', slug: 'cumin-seeds', hindi_name: 'Jeera',
    description: 'Premium whole cumin seeds. Earthy, warm, and essential in every Indian kitchen.',
    short_description: 'Premium cumin seeds, earthy & warm',
    category: 'Whole Spices', subcategory: 'Cumin', store_type: 'spices',
    image_url: 'https://images.unsplash.com/photo-1599909533601-fc780b5d7801?w=400',
    price_100g: 45, price_250g: 100, price_500g: 190, price_1kg: 360,
    in_stock: true, is_featured: false, is_bestseller: true, rating: 4.7, review_count: 198
  },
  {
    id: 39, name: 'Coriander Seeds', slug: 'coriander-seeds', hindi_name: 'Sabut Dhaniya',
    description: 'Premium whole coriander seeds. Citrusy, floral, and a staple in Indian cooking.',
    short_description: 'Whole coriander, citrusy & floral',
    category: 'Whole Spices', subcategory: 'Coriander', store_type: 'spices',
    image_url: 'https://images.unsplash.com/photo-1599909533601-fc780b5d7801?w=400',
    price_100g: 30, price_250g: 65, price_500g: 120, price_1kg: 220,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.5, review_count: 145
  },
  {
    id: 40, name: 'Fennel Seeds', slug: 'fennel-seeds', hindi_name: 'Saunf',
    description: 'Premium fennel seeds with sweet anise flavor. Popular mouth freshener and digestive aid.',
    short_description: 'Sweet fennel seeds, great digestive aid',
    category: 'Whole Spices', subcategory: 'Fennel', store_type: 'spices',
    image_url: 'https://images.unsplash.com/photo-1599909533601-fc780b5d7801?w=400',
    price_100g: 35, price_250g: 80, price_500g: 150, price_1kg: 280,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.4, review_count: 134
  },
  {
    id: 41, name: 'Fenugreek Seeds', slug: 'fenugreek-seeds', hindi_name: 'Methi Dana',
    description: 'Premium fenugreek seeds. Slightly bitter with maple-like aroma. Used in pickles and curries.',
    short_description: 'Fenugreek seeds for pickles & curries',
    category: 'Whole Spices', subcategory: 'Fenugreek', store_type: 'spices',
    image_url: 'https://images.unsplash.com/photo-1599909533601-fc780b5d7801?w=400',
    price_100g: 25, price_250g: 55, price_500g: 100, price_1kg: 180,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.3, review_count: 98
  },
  {
    id: 42, name: 'Mustard Seeds', slug: 'mustard-seeds', hindi_name: 'Rai',
    description: 'Premium black mustard seeds. Sharp, pungent, essential for tadka and South Indian cuisine.',
    short_description: 'Black mustard seeds, essential for tadka',
    category: 'Whole Spices', subcategory: 'Mustard', store_type: 'spices',
    image_url: 'https://images.unsplash.com/photo-1599909533601-fc780b5d7801?w=400',
    price_100g: 20, price_250g: 45, price_500g: 80, price_1kg: 150,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.4, review_count: 112
  },

  // ===== POWDERED SPICES =====
  {
    id: 43, name: 'Turmeric Powder', slug: 'turmeric-powder', hindi_name: 'Haldi',
    description: 'Premium Lakadong turmeric powder with high curcumin content. Vibrant golden color and earthy flavor.',
    short_description: 'High-curcumin Lakadong turmeric, vibrant gold',
    category: 'Powdered Spices', subcategory: 'Turmeric Powder', store_type: 'spices',
    image_url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400',
    price_100g: 40, price_250g: 90, price_500g: 170, price_1kg: 320,
    in_stock: true, is_featured: true, is_bestseller: true, rating: 4.8, review_count: 345
  },
  {
    id: 44, name: 'Red Chilli Powder', slug: 'red-chilli-powder', hindi_name: 'Lal Mirch',
    description: 'Premium Kashmiri red chilli powder. Rich deep red color with mild heat. Perfect for curries and tandoori.',
    short_description: 'Kashmiri chilli powder, rich color & mild heat',
    category: 'Powdered Spices', subcategory: 'Red Chilli Powder', store_type: 'spices',
    image_url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400',
    price_100g: 50, price_250g: 110, price_500g: 200, price_1kg: 380,
    in_stock: true, is_featured: true, is_bestseller: true, rating: 4.7, review_count: 278
  },
  {
    id: 45, name: 'Coriander Powder', slug: 'coriander-powder', hindi_name: 'Dhaniya Powder',
    description: 'Freshly ground coriander powder. Mild, citrusy flavor. A must-have base spice for Indian cooking.',
    short_description: 'Freshly ground coriander, mild & citrusy',
    category: 'Powdered Spices', subcategory: 'Coriander Powder', store_type: 'spices',
    image_url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400',
    price_100g: 30, price_250g: 65, price_500g: 120, price_1kg: 220,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.5, review_count: 189
  },
  {
    id: 46, name: 'Cumin Powder', slug: 'cumin-powder', hindi_name: 'Jeera Powder',
    description: 'Freshly ground cumin powder. Warm, earthy, and slightly nutty. Essential for raitas and curries.',
    short_description: 'Freshly ground cumin, warm & earthy',
    category: 'Powdered Spices', subcategory: 'Cumin Powder', store_type: 'spices',
    image_url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400',
    price_100g: 50, price_250g: 110, price_500g: 200, price_1kg: 380,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.6, review_count: 156
  },
  {
    id: 47, name: 'Black Pepper Powder', slug: 'black-pepper-powder', hindi_name: 'Kali Mirch Powder',
    description: 'Freshly ground Malabar black pepper powder. Pungent, sharp, and warming. Premium quality.',
    short_description: 'Freshly ground Malabar pepper, pungent & sharp',
    category: 'Powdered Spices', subcategory: 'Black Pepper Powder', store_type: 'spices',
    image_url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400',
    price_100g: 90, price_250g: 210, price_500g: 400, price_1kg: 760,
    in_stock: true, is_featured: false, is_bestseller: false, rating: 4.7, review_count: 123
  },
];

export function getAllProducts() {
  const overrides = JSON.parse(localStorage.getItem('sdf_product_overrides') || '{}');
  const baseProducts = PRODUCTS.map(p => {
    const override = overrides[p.id];
    return override ? { ...p, ...override } : p;
  });
  const customProducts = JSON.parse(localStorage.getItem('sdf_products') || '[]');
  return [...baseProducts, ...customProducts];
}

export function getProductById(id) {
  const all = getAllProducts();
  return all.find(p => p.id === id) || null;
}

export function getProductBySlug(slug) {
  const all = getAllProducts();
  return all.find(p => p.slug === slug) || null;
}

export function getFeaturedProducts() {
  return getAllProducts().filter(p => p.is_featured && p.in_stock);
}

export function getBestsellers() {
  return getAllProducts().filter(p => p.is_bestseller && p.in_stock);
}

export function getCategories(storeType) {
  const products = getAllProducts().filter(p => p.store_type === storeType);
  return [...new Set(products.map(p => p.category))];
}

export function searchProducts(query) {
  const q = query.toLowerCase();
  return getAllProducts().filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.hindi_name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.subcategory.toLowerCase().includes(q)
  );
}

export function filterAndSortProducts({ storeType, category, sortBy }) {
  let products = getAllProducts().filter(p => p.store_type === storeType);
  if (category) products = products.filter(p => p.category === category);

  switch (sortBy) {
    case 'price_low':
      return products.sort((a, b) => a.price_250g - b.price_250g);
    case 'price_high':
      return products.sort((a, b) => b.price_250g - a.price_250g);
    case 'rating':
      return products.sort((a, b) => b.rating - a.rating);
    case 'name':
      return products.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return products.sort((a, b) => {
        if (a.is_featured !== b.is_featured) return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
        if (a.is_bestseller !== b.is_bestseller) return (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0);
        return b.rating - a.rating;
      });
  }
}
