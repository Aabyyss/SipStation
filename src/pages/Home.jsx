import { useState, useMemo } from 'react';
import Symphony3D from '../components/Symphony3D';
import Newsletter from '../components/Newsletter';
import ProductGrid from '../components/ProductGrid';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { ShieldCheck, Truck, Sparkles } from 'lucide-react';

export default function Home({ onFlyToCart, onNotice }) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      {/* 1. HOME: The 3D Beverage Symphony */}
      <div id="home">
        <Symphony3D onFlyToCart={onFlyToCart} onNotice={onNotice} />
      </div>

      {/* 2. CATEGORIES: Clean Category Filter & Authentic Drinks Grid */}
      <section className="shell section" id="categories">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Genuine Beverage Vault</p>
            <h2>Explore by <em>category.</em></h2>
          </div>
          <div className="category-stats-badge">
            <Sparkles size={14} />
            <span>{filteredProducts.length} Drinks Available</span>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="category-chips-bar" aria-label="Filter by category">
          <button 
            type="button" 
            className={`cat-pill ${selectedCategory === '' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('')}
          >
            All Drinks ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              type="button"
              className={`cat-pill ${selectedCategory === cat.name ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Full Products Grid for the Selected Category */}
        <div className="catalog-drink-grid">
          <ProductGrid 
            products={filteredProducts} 
            onFlyToCart={onFlyToCart} 
            onNotice={onNotice} 
          />
        </div>
      </section>

      {/* 3. ABOUT: Story, Heritage and Newsletter */}
      <section className="about-block" id="about">
        <div className="shell about-inner">
          <div>
            <p className="eyebrow">The SIPSTATION Standard</p>
            <h2>GOOD DRINKS.<br /><em>GOOD MOMENTS.</em></h2>
          </div>
          <p>
            SIPSTATION brings together the drinks you know, the flavors you love, and the energy you need. From ice-cold colas and crisp citrus classics to artisanal canned coffees and high-voltage energy drinks—every bottle is stored at sub-zero perfection.
          </p>
        </div>

        <div className="shell trust-row">
          <article>
            <ShieldCheck size={26} />
            <div>
              <h3>100% Authentic Packaging</h3>
              <p>Genuine cans and bottles directly from authorized bottlers and distributors.</p>
            </div>
          </article>
          <article>
            <Truck size={26} />
            <div>
              <h3>Ice-Cold Delivery</h3>
              <p>Sample rates calculated in real time. Free delivery on orders of 6+ cans.</p>
            </div>
          </article>
          <article>
            <Sparkles size={26} />
            <div>
              <h3>Sub-Zero Chilled Storage</h3>
              <p>Maintained at a brisk 2°C – 4°C for immediate, refreshing enjoyment.</p>
            </div>
          </article>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
