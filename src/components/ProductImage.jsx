import { useState } from 'react';

export default function ProductImage({ product, className = '' }) {
  const [missing, setMissing] = useState(false);
  if (missing) return <div className={`product-image-fallback ${className}`} aria-label={`${product.name} image unavailable`}><span>{product.brand}</span><small>IMAGE PREVIEW</small></div>;
  return <img className={className} src={product.image} alt={product.imageAlt} loading="lazy" onError={() => setMissing(true)} />;
}
