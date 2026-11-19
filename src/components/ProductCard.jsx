import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPKR } from '../utils/commerce';
import ProductImage from './ProductImage';

export default function ProductCard({ product, onFlyToCart, onNotice }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();

  const handleAdd = (e) => {
    if (!product.inStock) return;
    const cartEl = document.querySelector('.cart-control');
    const cardImg = e.currentTarget.closest('.product-card')?.querySelector('.product-image');
    if (cardImg && cartEl && onFlyToCart) {
      const startRect = cardImg.getBoundingClientRect();
      const targetRect = cartEl.getBoundingClientRect();
      onFlyToCart({
        id: Date.now(),
        image: product.image,
        startX: startRect.left + 15,
        startY: startRect.top,
        targetX: targetRect.left + 8,
        targetY: targetRect.top + 8,
        productId: product.id,
        productName: product.name,
        brand: product.brand,
        accent: '#951837'
      });
    } else {
      if (add(product.id)) {
        onNotice?.(`${product.name} added to bag.`);
      }
    }
  };

  return (
    <motion.article className="product-card" layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="product-visual">
        <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
          <ProductImage product={product} className="product-image" />
        </Link>
        <div className="product-labels">
          {product.discount > 0 && <span className="sale-label">−{product.discount}%</span>}
          {product.bestseller && <span>Best seller</span>}
        </div>
        <div className="product-actions">
          <button 
            className={has(product.id) ? 'active' : ''} 
            onClick={() => toggle(product.id)} 
            aria-label="Toggle wishlist"
          >
            <Heart size={18} fill={has(product.id) ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <div className="product-copy">
        <p className="product-brand">{product.brand}</p>
        <Link to={`/product/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <div className="product-meta">
          <span>{product.size}</span>
          <span className={product.inStock ? 'stock' : 'out'}>
            {product.inStock ? 'In stock' : 'Out of stock'}
          </span>
        </div>
        <div className="product-bottom">
          <div className="price">
            {product.oldPrice && <del>{formatPKR(product.oldPrice)}</del>}
            <strong>{formatPKR(product.price)}</strong>
          </div>
          <button 
            className="add-cart" 
            disabled={!product.inStock} 
            onClick={handleAdd}
          >
            {product.inStock ? <><ShoppingBag size={16} /> Add to Bag</> : 'Sold out'}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
