import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { getProductById } from '../data/products';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlistIds, setWishlistIds] = useState([]);

  const getKey = useCallback(() => user ? `sdf_wishlist_${user.id}` : null, [user]);

  useEffect(() => {
    if (user) {
      const key = `sdf_wishlist_${user.id}`;
      const saved = JSON.parse(localStorage.getItem(key) || '[]');
      setWishlistIds(saved);
    } else {
      setWishlistIds([]);
    }
  }, [user]);

  const isWishlisted = useCallback((productId) => {
    return wishlistIds.includes(productId);
  }, [wishlistIds]);

  const toggleWishlist = useCallback((productId) => {
    const key = getKey();
    if (!key) return false;
    let updated;
    let nowWishlisted;
    if (wishlistIds.includes(productId)) {
      updated = wishlistIds.filter(id => id !== productId);
      nowWishlisted = false;
    } else {
      updated = [...wishlistIds, productId];
      nowWishlisted = true;
    }
    setWishlistIds(updated);
    localStorage.setItem(key, JSON.stringify(updated));
    return nowWishlisted;
  }, [wishlistIds, getKey]);

  const getWishlistProducts = useCallback(() => {
    return wishlistIds.map(id => getProductById(id)).filter(Boolean);
  }, [wishlistIds]);

  return (
    <WishlistContext.Provider value={{
      wishlistIds,
      wishlistCount: wishlistIds.length,
      isWishlisted,
      toggleWishlist,
      getWishlistProducts,
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
