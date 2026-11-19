import ProductCard from './ProductCard';

export default function ProductGrid({ products, onFlyToCart, onNotice }) {
  if (!products.length) return <div className="empty-results"><h3>No drinks found.</h3><p>Try adjusting your filters or category choice.</p></div>;
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onFlyToCart={onFlyToCart} 
          onNotice={onNotice} 
        />
      ))}
    </div>
  );
}
