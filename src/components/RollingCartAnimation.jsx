import { motion, AnimatePresence } from 'framer-motion';

export default function RollingCartAnimation({ flyingItem, onComplete }) {
  if (!flyingItem) return null;

  // Screen midpoint targets for a grand cinematic rolling arc
  const screenMidX = typeof window !== 'undefined' ? Math.max(160, window.innerWidth / 2 - 110) : 400;
  const screenMidY = typeof window !== 'undefined' ? Math.max(100, window.innerHeight * 0.3) : 220;

  return (
    <AnimatePresence>
      <motion.div
        key={flyingItem.id}
        className="flying-cart-container"
        initial={{
          top: flyingItem.startY,
          left: flyingItem.startX,
          scale: 0.9,
          rotate: 0,
          opacity: 0
        }}
        animate={{
          top: [
            flyingItem.startY,
            Math.max(60, flyingItem.startY - 140),
            screenMidY,
            screenMidY - 20,
            Math.max(40, (screenMidY + flyingItem.targetY) / 2),
            flyingItem.targetY
          ],
          left: [
            flyingItem.startX,
            (flyingItem.startX + screenMidX) / 2,
            screenMidX,
            screenMidX + (flyingItem.targetX - screenMidX) * 0.5,
            flyingItem.targetX - 25,
            flyingItem.targetX
          ],
          rotate: [0, 480, 1080, 1680, 2280, 2880],
          scale: [0.9, 1.45, 1.5, 1.35, 0.7, 0.12],
          opacity: [0, 1, 1, 1, 0.95, 0]
        }}
        transition={{
          duration: 5.2,
          ease: [0.25, 0.1, 0.25, 1],
          times: [0, 0.18, 0.45, 0.72, 0.92, 1]
        }}
        onAnimationComplete={onComplete}
      >
        {/* Dynamic Glow Aura */}
        <div 
          className="flying-aura-backdrop" 
          style={{
            background: `radial-gradient(circle, ${flyingItem.accent || '#a02045'} 0%, rgba(128,0,32,0.45) 50%, transparent 75%)`
          }}
        />

        {/* Big Rotating Drink Visual */}
        <div className="flying-bottle-frame">
          <img 
            src={flyingItem.image} 
            alt={flyingItem.productName || 'Beverage'} 
            className="flying-can-img" 
          />
        </div>

        {/* Orbiting Fizzy Sparkle Bubbles */}
        <div className="flying-fizzy-stream" aria-hidden="true">
          <span className="flying-bubble b1" />
          <span className="flying-bubble b2" />
          <span className="flying-bubble b3" />
          <span className="flying-bubble b4" />
          <span className="flying-bubble b5" />
        </div>

        {/* Floating Flight Banner */}
        <div className="flying-dossier-pill">
          <span className="flying-pulse-dot" />
          <span className="flying-title">{flyingItem.productName || 'DRINK'}</span>
          <span className="flying-action">ROLLING TO BAG</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
