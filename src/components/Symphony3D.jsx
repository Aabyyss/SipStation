import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, VolumeX, Sparkles, ChevronLeft, ChevronRight, 
  ShoppingBag, Eye, Snowflake, Zap, ArrowUpRight, Flame, Droplets, ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../utils/commerce';
import { products } from '../data/products';

export const SYMPHONY_FLAVORS = [
  {
    index: '01 / 06',
    slug: 'pepsi-original',
    brand: 'PEPSI',
    title: 'PEPSI ORIGINAL',
    badge: 'FOR THE LOVE OF IT',
    formulation: 'PREMIUM SODA / GLASS & PET',
    watermark: 'PEPSI',
    desc: 'Experience the timeless refreshment of Pepsi Original — a bold, sparkling cola with a perfectly balanced sweetness and refreshing fizz. Every sip delivers a crisp, invigorating taste that makes every moment more enjoyable. Best served ice cold for the ultimate refreshment.',
    specs: [
      { label: 'FLAVOR', val: 'Original Cola' },
      { label: 'TASTE', val: 'Bold, Sweet & Refreshing' },
      { label: 'BEST SERVED', val: '+ Ice Cold' },
      { label: 'CATEGORY', val: 'Carbonated Soft Drink' }
    ],
    notes: [
      'Rich caramelized cola flavor',
      'Refreshing citrus hints',
      'Crisp, lively carbonation',
      'Smooth, balanced sweetness'
    ],
    telemetry: [
      { label: 'CARBONATION', val: '98%', icon: 'spark' },
      { label: 'SERVING TEMP', val: '2°C - 4°C', icon: 'snow' },
      { label: 'SWEETNESS', val: 'BALANCED', icon: 'flame' },
      { label: 'ORIGIN', val: '1893', icon: 'shield' }
    ],
    price: 170,
    accent: '#005CB9',
    secondaryAccent: '#002B66',
    aura: 'rgba(0, 92, 185, 0.45)',
    glowTone: 'rgba(0, 140, 255, 0.28)',
    visual: '/img/pepsi-splash.png',
    fallbackVisual: '/images/products/pepsi-original.jpg',
    layout: 'right' // bottle on right, specs on left
  },
  {
    index: '02 / 06',
    slug: 'coca-cola-original',
    brand: 'COCA-COLA',
    title: 'COCA-COLA ORIGINAL',
    badge: 'REAL MAGIC : TASTE THE FEELING',
    formulation: 'CLASSIC CONTOUR FORMULA',
    watermark: 'COCA-COLA',
    desc: 'The universal signature of crisp, frosty, ice-cold joy across the globe. Chilled to perfection with fine effervescence, delivering the unmistakable secret recipe, velvety carbonation, and Madagascar vanilla undertones.',
    specs: [
      { label: 'FLAVOR', val: 'Classic Cola' },
      { label: 'TASTE', val: 'Rich, Smooth & Refreshing' },
      { label: 'BEST SERVED', val: '+ Ice Cold' },
      { label: 'CATEGORY', val: 'Carbonated Soft Drink' }
    ],
    notes: [
      'Warm Madagascar vanilla',
      'Subtle cinnamon spice',
      'Silky effervescent finish',
      'Signature Kola nut extract'
    ],
    telemetry: [
      { label: 'HERITAGE', val: '1886', icon: 'shield' },
      { label: 'TASTE PROFILE', val: 'ICONIC', icon: 'flame' },
      { label: 'CHILL LEVEL', val: '2°C Peak Frost', icon: 'snow' },
      { label: 'PRESSURE', val: '5.2 BAR', icon: 'spark' }
    ],
    price: 180,
    accent: '#E61A27',
    secondaryAccent: '#800020',
    aura: 'rgba(200, 20, 45, 0.48)',
    glowTone: 'rgba(128, 0, 32, 0.35)',
    visual: '/img/coca-cola-can.png',
    fallbackVisual: '/images/products/coca-cola-original.jpg',
    layout: 'left' // bottle on left, specs on right
  },
  {
    index: '03 / 06',
    slug: '7up',
    brand: '7UP',
    title: '7UP LEMON-LIME',
    badge: 'FEEL THE ZERO-RESISTANCE CRISP',
    formulation: 'AUTHENTIC ORIGINAL BOTTLE',
    watermark: '7UP',
    desc: 'An uplifting surge of 100% natural lemon and lime in its signature green bottle. Ultra-clean, zero-caffeine clarity that invigorates the senses with brisk effervescence and crystalline thirst-quenching bite.',
    specs: [
      { label: 'FLAVOR', val: 'Lemon-Lime' },
      { label: 'TASTE', val: 'Crisp, Light & Refreshing' },
      { label: 'BEST SERVED', val: '+ Chilled' },
      { label: 'CATEGORY', val: 'Lemon-Lime Soft Drink' }
    ],
    notes: [
      'Crisp Key lime zest',
      'Bright Meyer lemon oil',
      'Clean mineral sparkling water',
      'Dry, refreshing snap'
    ],
    telemetry: [
      { label: 'BOTTLE COLOR', val: 'GREEN', icon: 'shield' },
      { label: 'CAP ACCENT', val: 'GREEN', icon: 'flame' },
      { label: 'CAFFEINE', val: '0 MG', icon: 'snow' },
      { label: 'CITRUS EXTRACT', val: '100%', icon: 'spark' }
    ],
    price: 165,
    accent: '#00A859',
    secondaryAccent: '#004D26',
    aura: 'rgba(0, 168, 89, 0.45)',
    glowTone: 'rgba(0, 220, 100, 0.25)',
    visual: '/img/symphony/7up.png',
    fallbackVisual: '/images/products/7up.jpg',
    layout: 'right'
  },
  {
    index: '04 / 06',
    slug: 'sprite',
    brand: 'SPRITE',
    title: 'SPRITE CRISP CITRUS',
    badge: 'BORN TO REFRESH',
    formulation: 'ELECTRIC CARBONATED CITRUS',
    watermark: 'SPRITE',
    desc: 'Instant cut-through crispness with an unmistakable lemon-lime bite. Packaged in its signature green bottle with high-contrast electric green branding to shock the senses and obliterate thirst in a single gulp.',
    specs: [
      { label: 'FLAVOR', val: 'Lemon-Lime Citrus' },
      { label: 'TASTE', val: 'Fresh, Zesty & Crisp' },
      { label: 'BEST SERVED', val: '+ Ice Cold' },
      { label: 'CATEGORY', val: 'Sparkling Soft Drink' }
    ],
    notes: [
      'Zesty Persian lime',
      'Sicilian lemon essence',
      'Electric carbonation',
      'Ultra-cold crisp finish'
    ],
    telemetry: [
      { label: 'FIZZ INDEX', val: '99%', icon: 'spark' },
      { label: 'CHILL TEMP', val: '1.8°C Sub-Zero', icon: 'snow' },
      { label: 'CLARITY', val: 'PURE CRYSTAL', icon: 'shield' },
      { label: 'CAFFEINE', val: '0 MG', icon: 'flame' }
    ],
    price: 170,
    accent: '#008B44',
    secondaryAccent: '#003319',
    aura: 'rgba(0, 139, 68, 0.45)',
    glowTone: 'rgba(30, 215, 96, 0.25)',
    visual: '/img/sprite-can.png',
    fallbackVisual: '/images/products/sprite.jpg',
    layout: 'left'
  },
  {
    index: '05 / 06',
    slug: 'mirinda-orange',
    brand: 'MIRINDA',
    title: 'MIRINDA ORANGE',
    badge: 'UNAPOLOGETICALLY BOLD',
    formulation: 'INTENSE VALENCIA FRUIT BURST',
    watermark: 'MIRINDA',
    desc: 'Bold, daring, and unapologetically rich. Every sip crackles with fiery orange joy, sun-drenched mandarin sweetness, and an explosive effervescent burst that turns any routine break into a vibrant celebration.',
    specs: [
      { label: 'FLAVOR', val: 'Orange' },
      { label: 'TASTE', val: 'Sweet, Fruity & Refreshing' },
      { label: 'BEST SERVED', val: '+ Chilled' },
      { label: 'CATEGORY', val: 'Orange Soft Drink' }
    ],
    notes: [
      'Sun-drenched Valencia orange',
      'Sweet mandarin nectar',
      'Zippy effervescent fizz',
      'Juicy citrus finish'
    ],
    telemetry: [
      { label: 'CITRUS BURST', val: '100%', icon: 'flame' },
      { label: 'BUBBLE POP', val: '96%', icon: 'spark' },
      { label: 'PALATE FEEL', val: 'SWEET & FRUITY', icon: 'snow' },
      { label: 'GLOW TONE', val: 'DEEP ORANGE', icon: 'shield' }
    ],
    price: 165,
    accent: '#FF6E00',
    secondaryAccent: '#803700',
    aura: 'rgba(255, 110, 0, 0.45)',
    glowTone: 'rgba(255, 140, 20, 0.28)',
    visual: '/img/symphony/mirinda.png',
    fallbackVisual: '/images/products/mirinda-orange.jpg',
    layout: 'right'
  },
  {
    index: '06 / 06',
    slug: 'red-bull-original',
    brand: 'RED BULL',
    title: 'RED BULL ORIGINAL',
    badge: 'VITALIZES BODY AND MIND',
    formulation: 'HIGH-PERFORMANCE ENERGY',
    watermark: 'RED BULL',
    desc: 'Appreciated worldwide by top athletes, busy professionals, and active minds. The legendary blue-and-silver can packed with alpine fresh water, taurine, caffeine, and B-group vitamins to sharpen performance.',
    specs: [
      { label: 'FLAVOR', val: 'Classic Energy Blend' },
      { label: 'TASTE', val: 'Crisp, Tart & Invigorating' },
      { label: 'BEST SERVED', val: '+ Ice Cold' },
      { label: 'CATEGORY', val: 'Functional Energy Drink' }
    ],
    notes: [
      'Signature alpine taurine note',
      'Crisp apple-tart finish',
      'B-Group vitamin infusion',
      'Fine micro-bubbles'
    ],
    telemetry: [
      { label: 'CAFFEINE', val: '80 MG / 250ml', icon: 'flame' },
      { label: 'TAURINE', val: '1000 MG', icon: 'spark' },
      { label: 'CHILL TEMP', val: '3.0°C', icon: 'snow' },
      { label: 'ENERGY SURGE', val: 'PEAK FOCUS', icon: 'shield' }
    ],
    price: 390,
    accent: '#D82338',
    secondaryAccent: '#500014',
    aura: 'rgba(216, 35, 56, 0.48)',
    glowTone: 'rgba(255, 60, 80, 0.25)',
    visual: '/img/redbull-can.png',
    fallbackVisual: '/images/products/red-bull-original.jpg',
    layout: 'left'
  }
];

// Synth audio for crisp soda fizz
function playSodaFizz() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const bufferSize = ctx.sampleRate * 0.35;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.12));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1600;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.32);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch (err) {
    // Audio context may be restricted by autoplay policy
  }
}

export default function Symphony3D({ onFlyToCart, onNotice }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { add } = useCart();

  // Automatically cycle through 3D visuals by default every 3 seconds
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % SYMPHONY_FLAVORS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered, currentIdx]);

  const flavor = SYMPHONY_FLAVORS[currentIdx];
  const matchingProduct = products.find((p) => p.id === flavor.slug) || {
    id: flavor.slug,
    name: flavor.title,
    brand: flavor.brand,
    price: flavor.price,
    size: '330 ml'
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const switchFlavor = (idx) => {
    if (idx < 0) idx = SYMPHONY_FLAVORS.length - 1;
    if (idx >= SYMPHONY_FLAVORS.length) idx = 0;
    setCurrentIdx(idx);
    if (soundEnabled) playSodaFizz();
  };

  const handleOrder = () => {
    if (soundEnabled) playSodaFizz();
    const bottleEl = document.querySelector('.hero-3d-bottle-img') || document.querySelector('.bottle-visual-wrapper');
    const cartEl = document.querySelector('.cart-control');
    if (bottleEl && cartEl && onFlyToCart) {
      const startRect = bottleEl.getBoundingClientRect();
      const targetRect = cartEl.getBoundingClientRect();
      onFlyToCart({
        id: Date.now(),
        image: flavor.visual,
        startX: startRect.left + startRect.width / 4,
        startY: startRect.top + 20,
        targetX: targetRect.left + 8,
        targetY: targetRect.top + 8,
        productId: matchingProduct.id,
        productName: flavor.title,
        brand: flavor.brand,
        accent: flavor.accent || '#800020'
      });
    } else {
      if (add(matchingProduct.id)) {
        onNotice?.(`${flavor.title} added to bag.`);
      }
    }
  };

  // Pre-generate 28 floating fizzy bubbles with random positions
  const bubbles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: `${(i * 3.6 + Math.sin(i * 1.7) * 8) % 94}%`,
    top: `${(i * 3.4 + Math.cos(i * 2.1) * 12) % 92}%`,
    size: 4 + (i % 6) * 2.5,
    duration: 3.5 + (i % 5) * 1.2,
    delay: (i % 7) * 0.4
  }));

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="symphony-viewport"
      id="3d-symphony"
      aria-label="3D Beverage Symphony"
    >
      {/* Dynamic Brand Ambient Aura Glow */}
      <div 
        className="symphony-aura-primary"
        style={{ background: flavor.aura, transition: 'background 0.8s ease' }}
      />
      <div 
        className="symphony-aura-secondary"
        style={{ background: flavor.glowTone, transition: 'background 0.8s ease' }}
      />

      {/* Floating Carbonation Fizz Particles */}
      <div className="symphony-bubbles-container" aria-hidden="true">
        {bubbles.map((b) => (
          <span 
            key={b.id} 
            className="fizz-bubble"
            style={{
              left: b.left,
              top: b.top,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              borderColor: flavor.accent
            }}
          />
        ))}
      </div>

      {/* Giant Watermark Typography in Background */}
      <div className="symphony-watermark" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.span
            key={flavor.watermark}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 0.12, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -30 }}
            transition={{ duration: 0.6 }}
          >
            {flavor.watermark}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Symphony Top Sub-Bar with Quick Flavor Pills and Sound Toggle */}
      <div className="symphony-subnav shell">
        <div className="subnav-left">
          <span className="discovery-pill">
            <Sparkles size={13} className="sparkle-icon" />
            <span>NEXT-GEN BEVERAGE DISCOVERY</span>
          </span>
          <span className="symphony-slogan desktop-only">Six world-class soda icons reimagined in an interactive scroll symphony.</span>
        </div>

        <div className="subnav-right">
          {/* Audio toggle button */}
          <button 
            type="button" 
            className={`sound-btn ${soundEnabled ? 'active' : ''}`}
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) playSodaFizz();
            }}
            title={soundEnabled ? 'Mute fizz audio' : 'Enable fizz audio'}
            aria-label="Toggle audio effects"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{soundEnabled ? 'FIZZ ON' : 'MUTED'}</span>
          </button>

          {/* Quick Flavor Pills */}
          <div className="flavor-pills">
            {SYMPHONY_FLAVORS.map((item, idx) => (
              <button
                key={item.brand}
                type="button"
                className={`flavor-pill ${idx === currentIdx ? 'active' : ''}`}
                onClick={() => switchFlavor(idx)}
                style={idx === currentIdx ? { borderColor: item.accent, color: '#fff', background: item.secondaryAccent } : {}}
              >
                <span>{item.brand}</span>
                {idx === currentIdx && !isHovered && (
                  <motion.span
                    key={`pill-prog-${idx}`}
                    className="pill-progress-bar"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3.0, ease: 'linear' }}
                    style={{ background: item.accent }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main 3D Symphony Stage */}
      <div className={`shell symphony-stage-grid ${flavor.layout === 'left' ? 'layout-reversed' : ''}`}>
        
        {/* Dossier Side (Specs, Tasting Notes, Telemetry, Order CTA) */}
        <motion.div 
          className="symphony-dossier"
          key={`dossier-${flavor.slug}`}
          initial={{ opacity: 0, x: flavor.layout === 'left' ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: flavor.layout === 'left' ? -40 : 40 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          {/* Header Row: Formulation + Index Badge */}
          <div className="dossier-meta-row">
            <span className="formulation-badge">
              <Droplets size={12} />
              <span>{flavor.formulation}</span>
            </span>
            <span className="index-badge" style={{ borderColor: flavor.accent, color: '#fff' }}>
              <b>{flavor.index}</b> {flavor.badge}
            </span>
          </div>

          {/* Title & Brand Headline */}
          <h1 className="dossier-title">
            <span className="brand-glow-tag" style={{ color: flavor.accent }}>{flavor.brand}</span><br />
            {flavor.title.replace(flavor.brand, '').trim() || 'CLASSIC'}
          </h1>

          <p className="dossier-desc">{flavor.desc}</p>

          {/* Professional Product Specification Grid */}
          <div className="dossier-specs-box">
            <div className="specs-box-heading">
              <Zap size={13} style={{ color: flavor.accent }} />
              <span>PROFESSIONAL PRODUCT SPECIFICATION</span>
            </div>
            <div className="specs-grid">
              {flavor.specs.map((s) => (
                <div key={s.label} className="spec-item">
                  <small>{s.label}</small>
                  <strong>{s.val}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Tasting Profile & Flavor Notes Capsules */}
          <div className="tasting-notes-box">
            <div className="tasting-heading">
              <Sparkles size={13} style={{ color: flavor.accent }} />
              <span>TASTING PROFILE & FLAVOR NOTES</span>
            </div>
            <div className="notes-capsules">
              {flavor.notes.map((note) => (
                <span key={note} className="note-capsule">
                  <span className="note-dot" style={{ background: flavor.accent }} />
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* 4 Telemetry Metrics Cards */}
          <div className="telemetry-row">
            {flavor.telemetry.map((t) => (
              <div key={t.label} className="telemetry-cell">
                <span className="cell-label">{t.label}</span>
                <strong className="cell-val" style={{ color: '#fff' }}>{t.val}</strong>
              </div>
            ))}
          </div>

          {/* Pricing & Direct Order Actions */}
          <div className="dossier-action-bar">
            <div className="dossier-price-tag">
              <small>VAULT PRICE</small>
              <strong>{formatPKR(flavor.price)}</strong>
            </div>

            <div className="dossier-buttons">
              <button
                type="button"
                className="btn-order-pulse"
                onClick={handleOrder}
                style={{ 
                  background: `linear-gradient(135deg, ${flavor.accent}, ${flavor.secondaryAccent})`,
                  boxShadow: `0 8px 30px ${flavor.aura}`
                }}
              >
                <ShoppingBag size={18} />
                <span>ADD TO BAG</span>
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 3D Central Bottle Showcase Stage */}
        <div className="symphony-3d-pedestal">
          <motion.div 
            className="bottle-perspective-mount"
            animate={{
              rotateY: mousePos.x * 28,
              rotateX: -mousePos.y * 24
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 18 }}
          >
            {/* Ambient Backlight Halo behind the bottle */}
            <div 
              className="bottle-aura-halo" 
              style={{ background: flavor.aura, boxShadow: `0 0 100px ${flavor.aura}` }} 
            />

            {/* Frost Crystal Crown Top Effect */}
            <div className="frost-glint-effect" aria-hidden="true" />

            {/* The 3D Frosted Bottle with Roll-Back and Upfront Visualization */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`bottle-${flavor.slug}`}
                className="bottle-visual-wrapper"
                initial={{ 
                  opacity: 0, 
                  scale: 0.35, 
                  z: -350, 
                  rotateY: -160, 
                  rotateZ: -16, 
                  y: 40 
                }}
                animate={{ 
                  opacity: 1, 
                  scale: [0.35, 1.18, 0.94, 1.14, 1.05], 
                  z: [-350, 70, -75, 55, 0], 
                  rotateY: [-160, -15, 22, -8, 0], 
                  rotateZ: [-16, 0, 8, -4, 0], 
                  y: [40, -10, 6, -5, 0] 
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.3, 
                  z: -420, 
                  rotateY: 160, 
                  rotateZ: 20, 
                  y: 35,
                  transition: { duration: 0.45, ease: 'easeIn' }
                }}
                transition={{ 
                  duration: 2.5, 
                  times: [0, 0.32, 0.58, 0.82, 1], 
                  ease: 'easeInOut' 
                }}
              >
                <img 
                  src={flavor.visual} 
                  alt={`${flavor.title} authentic 3D packaging`}
                  className="hero-3d-bottle-img"
                  onError={(e) => {
                    // Clean fallback to product photography if cutout fails
                    e.currentTarget.src = flavor.fallbackVisual;
                  }}
                />

                {/* Sub-Zero Condensation Drop Shadows */}
                <div className="bottle-ground-shadow" />
              </motion.div>
            </AnimatePresence>

            {/* Floating Live Telemetry Badge beside the bottle */}
            <motion.div 
              className="bottle-float-stat stat-chill"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <Snowflake size={14} style={{ color: '#72d2ff' }} />
              <div>
                <strong>SUB-ZERO CHILL</strong>
                <small>2.4°C Vault Stored</small>
              </div>
            </motion.div>

            <motion.div 
              className="bottle-float-stat stat-genuine"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
            >
              <ShieldCheck size={14} style={{ color: '#44d785' }} />
              <div>
                <strong>100% GENUINE</strong>
                <small>Authentic Packaging</small>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* Bottom Symphony Stepper & Navigation Arrows */}
      <div className="symphony-bottom-dock shell">
        <div className="dock-arrows">
          <button 
            type="button" 
            className="dock-arrow-btn" 
            onClick={() => switchFlavor(currentIdx - 1)}
            aria-label="Previous drink"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="dock-dots">
            {SYMPHONY_FLAVORS.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`dock-dot ${i === currentIdx ? 'active' : ''}`}
                onClick={() => switchFlavor(i)}
                style={i === currentIdx ? { background: flavor.accent } : {}}
                aria-label={`Go to drink ${i + 1}`}
              />
            ))}
          </div>

          <button 
            type="button" 
            className="dock-arrow-btn" 
            onClick={() => switchFlavor(currentIdx + 1)}
            aria-label="Next drink"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="dock-catalog-prompt">
          <a href="#categories" className="dock-scroll-link">
            <span>EXPLORE FULL STORE CATALOG ({products.length}+ DRINKS)</span>
            <span className="bounce-arrow">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
