import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import RollingCartAnimation from './components/RollingCartAnimation';
import { useCart } from './context/CartContext';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Wishlist from './pages/Wishlist';
import About from './pages/About';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [flyingItem, setFlyingItem] = useState(null);
  const [cartBouncing, setCartBouncing] = useState(false);
  const { add } = useCart();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    if (!notice) return undefined;
    const id = setTimeout(() => setNotice(''), 3000);
    return () => clearTimeout(id);
  }, [notice]);

  const triggerFlyToCart = (itemData) => {
    setFlyingItem(itemData);
    // 5.2-second cinematic roll: item plunges into cart bag at ~4.9s
    setTimeout(() => {
      add(itemData.productId, 1);
      setCartBouncing(true);
      if (itemData.productName) {
        setNotice(`Added ${itemData.productName} to bag`);
      }
      setTimeout(() => setCartBouncing(false), 900);
    }, 4900);
  };

  const common = { onFlyToCart: triggerFlyToCart, onNotice: setNotice };

  return (
    <>
      <Navbar onCart={() => setCartOpen(true)} cartBouncing={cartBouncing} />
      <Routes>
        <Route path="/" element={<Home {...common} />} />
        <Route path="/shop" element={<Shop {...common} />} />
        <Route path="/product/:id" element={<ProductDetails {...common} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/wishlist" element={<Wishlist {...common} />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home {...common} />} />
      </Routes>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <RollingCartAnimation flyingItem={flyingItem} onComplete={() => setFlyingItem(null)} />
      {notice && <div className="toast" role="status">{notice}</div>}
    </>
  );
}
