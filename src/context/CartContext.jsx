import { createContext, useContext, useMemo, useState } from 'react';
import { products } from '../data/products';
import { readStorage, writeStorage } from '../utils/storage';

const CartContext = createContext(null);
const CART_KEY = 'sipstation-cart-v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readStorage(CART_KEY, []));
  const change = (next) => { setItems(next); writeStorage(CART_KEY, next); };
  const add = (id, quantity = 1) => {
    const product = products.find((entry) => entry.id === id);
    if (!product?.inStock) return false;
    const existing = items.find((item) => item.id === id);
    change(existing ? items.map((item) => item.id === id ? { ...item, quantity: Math.min(item.quantity + quantity, 12) } : item) : [...items, { id, quantity: Math.min(quantity, 12) }]);
    return true;
  };
  const setQuantity = (id, quantity) => change(quantity < 1 ? items.filter((item) => item.id !== id) : items.map((item) => item.id === id ? { ...item, quantity: Math.min(quantity, 12) } : item));
  const remove = (id) => change(items.filter((item) => item.id !== id));
  const clear = () => change([]);
  const lines = items.map((item) => ({ ...item, product: products.find((entry) => entry.id === item.id) })).filter((item) => item.product);
  const itemCount = lines.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = lines.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const productSavings = lines.reduce((sum, item) => sum + ((item.product.oldPrice || item.product.price) - item.product.price) * item.quantity, 0);
  const bundleDiscount = itemCount >= 6 ? Math.round(subtotal * 0.05) : 0;
  const delivery = itemCount === 0 ? 0 : subtotal >= 2500 ? 0 : 299;
  const value = useMemo(() => ({ items: lines, itemCount, subtotal, productSavings, bundleDiscount, delivery, total: subtotal - bundleDiscount + delivery, add, setQuantity, remove, clear }), [items, itemCount, subtotal, productSavings, bundleDiscount, delivery, lines]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
