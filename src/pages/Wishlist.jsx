import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
export default function Wishlist({ onQuickView, onNotice }) { const { ids } = useWishlist(); const saved = products.filter((product) => ids.includes(product.id)); return <main className="page"><section className="page-intro shell"><p className="eyebrow">Saved for later</p><h1>Your <em>wishlist.</em></h1><p>Keep the drinks you want close.</p></section><section className="shell section wishlist-page">{saved.length ? <ProductGrid products={saved} onQuickView={onQuickView} onNotice={onNotice} /> : <div className="empty-results"><Heart size={32} /><h3>Nothing saved yet.</h3><p>Use the heart on any product to build your wishlist.</p><Link className="button button-primary" to="/shop">Explore the shop</Link></div>}</section></main>; }
