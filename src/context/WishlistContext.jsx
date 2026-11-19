import { createContext, useContext, useMemo, useState } from 'react';
import { readStorage, writeStorage } from '../utils/storage';

const WishlistContext = createContext(null);
const WISHLIST_KEY = 'sipstation-wishlist-v1';
export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => readStorage(WISHLIST_KEY, []));
  const toggle = (id) => {
    const next = ids.includes(id) ? ids.filter((entry) => entry !== id) : [...ids, id];
    setIds(next); writeStorage(WISHLIST_KEY, next);
  };
  const value = useMemo(() => ({ ids, count: ids.length, toggle, has: (id) => ids.includes(id) }), [ids]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
export const useWishlist = () => useContext(WishlistContext);
