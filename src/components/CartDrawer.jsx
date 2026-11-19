import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../utils/commerce';
import ProductImage from './ProductImage';

export default function CartDrawer({ open, onClose }) {
  const { items, itemCount, subtotal, productSavings, bundleDiscount, delivery, total, setQuantity, remove, clear } = useCart();
  return <AnimatePresence>{open && <>
    <motion.button className="drawer-scrim" aria-label="Close cart" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
    <motion.aside className="cart-drawer" aria-label="Shopping cart" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 350, damping: 34 }}>
      <header className="drawer-header"><div><p className="eyebrow">Your selection</p><h2>Cart <em>({itemCount})</em></h2></div><button className="plain-icon" onClick={onClose} aria-label="Close cart"><X /></button></header>
      <div className="drawer-content">
        {!items.length ? <div className="cart-empty"><ShoppingBag size={35} /><h3>Your cart is cold.</h3><p>Pick something that makes the moment.</p><Link className="button button-primary" to="/shop" onClick={onClose}>Browse the shop</Link></div> : <div className="cart-lines">{items.map(({ product, quantity }) => <article className="cart-line" key={product.id}><div className="cart-thumb"><ProductImage product={product} /></div><div className="cart-line-info"><p>{product.brand}</p><h3>{product.name}</h3><span>{formatPKR(product.price)}</span><div className="quantity-control"><button onClick={() => setQuantity(product.id, quantity - 1)} aria-label={`Decrease ${product.name}`}><Minus size={13} /></button><b>{quantity}</b><button onClick={() => setQuantity(product.id, quantity + 1)} aria-label={`Increase ${product.name}`}><Plus size={13} /></button></div></div><div className="line-end"><strong>{formatPKR(product.price * quantity)}</strong><button onClick={() => remove(product.id)} aria-label={`Remove ${product.name}`}><Trash2 size={15} /></button></div></article>)}</div>}
      </div>
      {items.length > 0 && <footer className="drawer-summary"><div className="bundle-message">{itemCount >= 6 ? 'Bundle reward applied — 5% off.' : `${6 - itemCount} more drink${6 - itemCount === 1 ? '' : 's'} unlocks 5% off.`}</div><div className="summary-row"><span>Subtotal</span><b>{formatPKR(subtotal)}</b></div>{productSavings > 0 && <div className="summary-row saving"><span>Product offers</span><b>−{formatPKR(productSavings)}</b></div>}{bundleDiscount > 0 && <div className="summary-row saving"><span>Bundle reward</span><b>−{formatPKR(bundleDiscount)}</b></div>}<div className="summary-row"><span>Delivery</span><b>{delivery ? formatPKR(delivery) : 'FREE'}</b></div><div className="summary-total"><span>Total</span><b>{formatPKR(total)}</b></div><Link className="button button-primary button-full" to="/checkout" onClick={onClose}>Secure checkout <span>→</span></Link><button className="clear-cart" onClick={clear}>Clear cart</button></footer>}
    </motion.aside>
  </>}</AnimatePresence>;
}
