import { useState, useRef } from 'react';
import { ArrowDownRight, ChevronDown, Sparkles, ShoppingBag, Eye, Zap, Flame, Snowflake, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../utils/commerce';
import ProductImage from './ProductImage';

const HERO_DRINKS = [
  {
    id: 'coca-cola-original',
    name: 'Coca-Cola Original',
    brand: 'Coca-Cola',
    tagline: 'Timeless Original Cola',
    temp: '2.8°C Sub-Zero',
    pressure: '5.2 BAR High Fizz',
    aura: 'rgba(230, 26, 39, 0.45)',
    accent: '#E61A27'
  },
  {
    id: 'pepsi-original',
    name: 'Pepsi Original',
    brand: 'Pepsi',
    tagline: 'Bold Refreshment & Fizz',
    temp: '2.5°C Sub-Zero',
    pressure: '5.4 BAR Crisp Fizz',
    aura: 'rgba(0, 92, 185, 0.45)',
    accent: '#005CB9'
  },
  {
    id: 'red-bull-original',
    name: 'Red Bull Original',
    brand: 'Red Bull',
    tagline: 'Vitalizes Body & Mind',
    temp: '3.0°C Chilled',
    pressure: '4.9 BAR Taurine Boost',
    aura: 'rgba(224, 18, 54, 0.45)',
    accent: '#E01236'
  },
  {
    id: 'monster-energy-original',
    name: 'Monster Energy Original',
    brand: 'Monster',
    tagline: 'Unleash The Beast',
    temp: '2.4°C Sub-Zero',
    pressure: '5.1 BAR Max Energy',
    aura: 'rgba(92, 184, 92, 0.45)',
    accent: '#5CB85C'
  },
  {
    id: 'starbucks-frappuccino-vanilla',
    name: 'Starbucks Frappuccino Vanilla',
    brand: 'Starbucks',
    tagline: 'Arabica Coffee & Cream',
    temp: '4.0°C Chilled',
    pressure: 'Smooth Nitro Brew',
    aura: 'rgba(199, 149, 95, 0.45)',
    accent: '#C7955F'
  },
  {
    id: 'sprite',
    name: 'Sprite',
    brand: 'Sprite',
    tagline: 'Lemon-Lime Effervescence',
    temp: '2.2°C Sub-Zero',
    pressure: '5.5 BAR Crisp Spark',
    aura: 'rgba(0, 166, 81, 0.45)',
    accent: '#00A651'
  }
];

export default function Hero({ onQuickView, onNotice }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { add } = useCart();

  const activeMeta = HERO_DRINKS[activeIdx];
  const activeProduct = products.find((p) => p.id === activeMeta.id) || products[0];

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleAddToCart = () => {
    if (add(activeProduct.id)) {
      onNotice?.(`${activeProduct.name} added to cart.`);
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hero-section"
      aria-label="SIPSTATION Hero Stage"
    >
      <div className="hero-grid-texture" />
      <div
        className="hero-glow hero-glow-one"
        style={{
          background: activeMeta.aura,
          transition: 'background 0.8s ease'
        }}
      />
      <div className="hero-glow hero-glow-two" />

      <div className="shell hero-inner">
        {/* Left Copy Column */}
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span>Luxury Beverage Vault & Storefront</span>
          </div>

          <h1 className="hero-title">
            YOUR DRINK.<br />
            <em>YOUR MOMENT.</em>
          </h1>

          <p className="hero-description">
            From everyday favorites to energy-packed essentials. Discover the drinks you love, all in one place.
          </p>

          <div className="hero-buttons">
            <Link className="button button-primary" to="/shop">
              Shop Now <ArrowDownRight size={17} />
            </Link>
            <Link className="button button-ghost" to="/shop#categories">
              Explore Categories
            </Link>
          </div>

          {/* Interactive Hero Brand Selector */}
          <div className="hero-selector" aria-label="Quick Select Authentic Beverage">
            <span className="selector-label">Interactive 3D Stage:</span>
            <div className="selector-chips">
              {HERO_DRINKS.map((item, idx) => (
                <button
                  key={item.id}
                  className={`selector-chip ${idx === activeIdx ? 'active' : ''}`}
                  onClick={() => setActiveIdx(idx)}
                  style={idx === activeIdx ? { borderColor: item.accent, color: '#fff' } : {}}
                >
                  {item.brand}
                </button>
              ))}
            </div>
          </div>

          <div className="hero-statline">
            <span><b>71+</b> authentic drinks</span>
            <span><b>08</b> curated categories</span>
            <span><b>01</b> sub-zero fridge</span>
          </div>
        </motion.div>

        {/* Right 3D Interactive Stage Column */}
        <div className="hero-3d-stage">
          <motion.div
            className="hero-perspective-box"
            animate={{
              rotateY: mousePos.x * 24,
              rotateX: -mousePos.y * 24
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          >
            {/* Centerpiece 3D Floating Can */}
            <div className="centerpiece-aura" style={{ background: activeMeta.aura }} />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                className="centerpiece-can"
                initial={{ opacity: 0, scale: 0.88, rotateY: -80, y: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, rotateY: 80, y: -20 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                <ProductImage product={activeProduct} className="centerpiece-img" />

                {/* Centerpiece telemetry card */}
                <div className="telemetry-card">
                  <div className="telemetry-top">
                    <span className="telemetry-brand">{activeMeta.brand}</span>
                    <span className="telemetry-tag">{activeMeta.tagline}</span>
                  </div>
                  <h3 className="telemetry-name">{activeProduct.name}</h3>
                  <div className="telemetry-gauges">
                    <div className="gauge">
                      <Snowflake size={12} />
                      <span>{activeMeta.temp}</span>
                    </div>
                    <div className="gauge">
                      <Zap size={12} />
                      <span>{activeMeta.pressure}</span>
                    </div>
                  </div>
                  <div className="telemetry-actions">
                    <div className="telemetry-price">
                      {activeProduct.oldPrice && <del>{formatPKR(activeProduct.oldPrice)}</del>}
                      <strong>{formatPKR(activeProduct.price)}</strong>
                    </div>
                    <div className="telemetry-buttons">
                      <button
                        className="telemetry-btn"
                        onClick={handleAddToCart}
                        title="Add to Cart"
                      >
                        <ShoppingBag size={14} /> Add
                      </button>
                      <button
                        className="telemetry-btn ghost"
                        onClick={() => onQuickView?.(activeProduct)}
                        title="Quick View"
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Orbiting / Surround Atmospheric Cans (Parallax Depth) */}
            <motion.div
              className="orbit-product orbit-1"
              animate={{
                x: mousePos.x * -35,
                y: mousePos.y * -35 + Math.sin(Date.now() / 1000) * 8
              }}
              transition={{ type: 'spring', stiffness: 90, damping: 20 }}
            >
              <img src="/images/products/pepsi-original.jpg" alt="Pepsi" />
            </motion.div>

            <motion.div
              className="orbit-product orbit-2"
              animate={{
                x: mousePos.x * 40,
                y: mousePos.y * 40 + Math.cos(Date.now() / 1000) * 10
              }}
              transition={{ type: 'spring', stiffness: 90, damping: 20 }}
            >
              <img src="/images/products/red-bull-original.jpg" alt="Red Bull" />
            </motion.div>

            <motion.div
              className="orbit-product orbit-3"
              animate={{
                x: mousePos.x * -25,
                y: mousePos.y * 25
              }}
              transition={{ type: 'spring', stiffness: 90, damping: 20 }}
            >
              <img src="/images/products/monster-energy-original.jpg" alt="Monster Energy" />
            </motion.div>

            <motion.div
              className="orbit-product orbit-4"
              animate={{
                x: mousePos.x * 30,
                y: mousePos.y * -30
              }}
              transition={{ type: 'spring', stiffness: 90, damping: 20 }}
            >
              <img src="/images/products/sprite.jpg" alt="Sprite" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Cinematic Bottom Scroll Prompt */}
      <div className="scroll-prompt">
        <ChevronDown size={16} /> Scroll to discover the catalog
      </div>
    </section>
  );
}
