import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPKR } from '../utils/commerce';
import ProductImage from './ProductImage';

export default function QuickViewModal({ product, onClose, onNotice }) {
  const [quantity, setQuantity] = useState(1); const { add } = useCart(); const { has, toggle } = useWishlist();
  if (!product) return null;
  const addToCart = () => { if (add(product.id, quantity)) { onNotice?.(`${quantity} × ${product.name} added to cart.`); onClose(); } };
  return <AnimatePresence><motion.div className="modal-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={`${product.name} quick view`}><button className="modal-scrim" onClick={onClose} aria-label="Close quick view" /><motion.div className="quickview" initial={{ scale: .97, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .97, y: 12 }}><button className="modal-close" onClick={onClose}><X size={20} /></button><div className="quickview-image"><ProductImage product={product} /></div><div className="quickview-copy"><p className="eyebrow">{product.brand}</p><h2>{product.name}</h2><p className="quick-description">{product.description}</p><div className="quick-specs"><span>{product.size}</span><span>{product.inStock ? 'Ready to ship' : 'Temporarily unavailable'}</span><span>★ {product.rating} ({product.reviewCount})</span></div><div className="quick-price">{product.oldPrice && <del>{formatPKR(product.oldPrice)}</del>}<strong>{formatPKR(product.price)}</strong></div><div className="quick-actions"><div className="quantity-control big"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button><b>{quantity}</b><button onClick={() => setQuantity(Math.min(12, quantity + 1))}><Plus size={16} /></button></div><button className="button button-primary" disabled={!product.inStock} onClick={addToCart}><ShoppingBag size={17} /> Add to cart</button><button className={`wishlist-round ${has(product.id) ? 'active' : ''}`} onClick={() => toggle(product.id)}><Heart size={18} fill={has(product.id) ? 'currentColor' : 'none'} /></button></div><Link className="details-link" to={`/product/${product.id}`} onClick={onClose}>View full product details <span>↗</span></Link></div></motion.div></motion.div></AnimatePresence>;
}
