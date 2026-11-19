import { useEffect, useState } from 'react';
import { Heart, Menu, ShoppingBag, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const navItems = [
  { label: 'Home', target: '#home' },
  { label: 'Categories', target: '#categories' },
  { label: 'About', target: '#about' }
];

export default function Navbar({ onCart, cartBouncing }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const { count } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const listen = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', listen);
    listen();
    return () => window.removeEventListener('scroll', listen);
  }, []);

  useEffect(() => setOpen(false), [location.pathname, location.search]);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + target);
      return;
    }
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-inner">
        <Link className="wordmark" to="/" aria-label="SipStation home">
          <img src="/logo.png" alt="SipStation Logo" className="brand-logo-img" />
          <div className="brand-lockup">
            <div className="brand-title">
              <span className="brand-sip">Sip</span><span className="brand-station">Station</span>
            </div>
            <span className="brand-bar" />
            <span className="brand-motto">Stop. Sip. Repeat.</span>
          </div>
        </Link>

        {/* 3 Simple, Clean Links: Home, Categories, About */}
        <nav className={`nav-links ${open ? 'mobile-open' : ''}`} aria-label="Main navigation">
          {navItems.map(({ label, target }) => (
            <a 
              key={label} 
              href={target}
              onClick={(e) => handleNavClick(e, target)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <Link className="icon-control" to="/wishlist" aria-label={`Wishlist, ${count} items`}>
            <Heart size={19} />
            <b>{count}</b>
          </Link>

          <button 
            type="button"
            className={`icon-control cart-control ${cartBouncing ? 'cart-jiggle' : ''}`} 
            onClick={onCart} 
            aria-label={`Shopping bag, ${itemCount} items`}
          >
            <ShoppingBag size={19} />
            <b>{itemCount}</b>
          </button>

          <button 
            type="button"
            className="icon-control mobile-toggle" 
            onClick={() => setOpen(!open)} 
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
