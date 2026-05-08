import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { getProductById } from '../data/products';
import { getProductPrice } from '../utils/helpers';

const CartContext = createContext(null);

function cartKey(userId) { return `sdf_cart_${userId}`; }
function savedKey(userId) { return `sdf_saved_for_later_${userId}`; }

function getRawCart(userId) {
  return JSON.parse(localStorage.getItem(cartKey(userId)) || '[]');
}

function saveRawCart(userId, items) {
  localStorage.setItem(cartKey(userId), JSON.stringify(items));
}

function enrichCartItems(rawItems) {
  return rawItems.map(item => {
    const product = getProductById(item.product_id);
    if (!product) return null;
    const price = getProductPrice(product, item.weight);
    return {
      ...item,
      name: product.name,
      slug: product.slug,
      image_url: product.image_url,
      hindi_name: product.hindi_name,
      price_100g: product.price_100g,
      price_250g: product.price_250g,
      price_500g: product.price_500g,
      price_1kg: product.price_1kg,
      in_stock: product.in_stock,
      price,
      total: price * item.quantity,
    };
  }).filter(Boolean);
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadCart = useCallback(() => {
    if (!user) {
      setCartItems([]);
      setCartCount(0);
      setCartSubtotal(0);
      return;
    }
    const raw = getRawCart(user.id);
    const enriched = enrichCartItems(raw);
    setCartItems(enriched);
    setCartCount(enriched.reduce((sum, item) => sum + item.quantity, 0));
    setCartSubtotal(enriched.reduce((sum, item) => sum + item.total, 0));
  }, [user]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = useCallback((productId, weight, quantity = 1) => {
    if (!user) throw new Error('Please login to add items to cart');
    const raw = getRawCart(user.id);
    const existing = raw.find(item => item.product_id === productId && item.weight === weight);
    if (existing) {
      existing.quantity += quantity;
    } else {
      raw.push({
        id: `cart_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        product_id: productId,
        weight,
        quantity,
        created_at: new Date().toISOString(),
      });
    }
    saveRawCart(user.id, raw);
    loadCart();
  }, [user, loadCart]);

  const updateQuantity = useCallback((cartItemId, quantity) => {
    if (!user) return;
    const raw = getRawCart(user.id);
    const item = raw.find(i => i.id === cartItemId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      saveRawCart(user.id, raw);
      loadCart();
    }
  }, [user, loadCart]);

  const removeFromCart = useCallback((cartItemId) => {
    if (!user) return;
    const raw = getRawCart(user.id).filter(i => i.id !== cartItemId);
    saveRawCart(user.id, raw);
    loadCart();
  }, [user, loadCart]);

  const clearCart = useCallback(() => {
    if (!user) return;
    saveRawCart(user.id, []);
    loadCart();
  }, [user, loadCart]);

  const saveForLater = useCallback((cartItemId) => {
    if (!user) return;
    const raw = getRawCart(user.id);
    const item = raw.find(i => i.id === cartItemId);
    if (!item) return;
    const newRaw = raw.filter(i => i.id !== cartItemId);
    saveRawCart(user.id, newRaw);

    const saved = JSON.parse(localStorage.getItem(savedKey(user.id)) || '[]');
    saved.push({ ...item, id: `saved_${Date.now()}_${Math.random().toString(36).substring(2, 6)}` });
    localStorage.setItem(savedKey(user.id), JSON.stringify(saved));
    loadCart();
  }, [user, loadCart]);

  const getSavedForLater = useCallback(() => {
    if (!user) return [];
    const saved = JSON.parse(localStorage.getItem(savedKey(user.id)) || '[]');
    return enrichCartItems(saved);
  }, [user]);

  const moveToCart = useCallback((savedItemId) => {
    if (!user) return;
    const saved = JSON.parse(localStorage.getItem(savedKey(user.id)) || '[]');
    const item = saved.find(i => i.id === savedItemId);
    if (!item) return;

    const newSaved = saved.filter(i => i.id !== savedItemId);
    localStorage.setItem(savedKey(user.id), JSON.stringify(newSaved));

    const raw = getRawCart(user.id);
    const existing = raw.find(i => i.product_id === item.product_id && i.weight === item.weight);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      raw.push({
        id: `cart_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        product_id: item.product_id,
        weight: item.weight,
        quantity: item.quantity,
        created_at: new Date().toISOString(),
      });
    }
    saveRawCart(user.id, raw);
    loadCart();
  }, [user, loadCart]);

  return (
    <CartContext.Provider value={{
      cartItems, cartCount, cartSubtotal, loading,
      addToCart, updateQuantity, removeFromCart, clearCart,
      saveForLater, fetchCart: loadCart, getSavedForLater, moveToCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
