import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductFilters from '../components/ProductFilters';
import ProductGrid from '../components/ProductGrid';
import { brands, products } from '../data/products';
import { categories } from '../data/categories';

const cleanFilters = { category: '', brand: '', maxPrice: 600, inStock: false, sale: false };
export default function Shop({ onQuickView, onNotice }) {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('search') || '');
  const [filters, setFilters] = useState({ ...cleanFilters, category: params.get('category') || '', sale: params.get('sale') === 'true' });
  const [sort, setSort] = useState(params.get('sort') || 'featured'); const [shown, setShown] = useState(12);
  const matches = useMemo(() => products.filter((product) => { const haystack = `${product.name} ${product.brand} ${product.category}`.toLowerCase(); return haystack.includes(query.toLowerCase()) && (!filters.category || product.category === filters.category) && (!filters.brand || product.brand === filters.brand) && product.price <= filters.maxPrice && (!filters.inStock || product.inStock) && (!filters.sale || product.discount > 0); }).sort((a, b) => sort === 'price-low' ? a.price - b.price : sort === 'price-high' ? b.price - a.price : sort === 'name' ? a.name.localeCompare(b.name) : sort === 'bestselling' ? Number(b.bestseller) - Number(a.bestseller) || b.reviewCount - a.reviewCount : Number(b.featured) - Number(a.featured) || b.reviewCount - a.reviewCount), [query, filters, sort]);
  const updateFilters = (next) => { setFilters(next); setShown(12); };
  return <main className="page shop-page"><section className="page-intro shell"><p className="eyebrow">The full station</p><h1>Find your next <em>favourite.</em></h1><p>76 drinks. One perfectly stocked fridge.</p></section><section className="shell shop-controls"><div className="search-box"><Search size={19} /><input value={query} onChange={(event) => { setQuery(event.target.value); setShown(12); }} placeholder="Search by drink, brand or category" /></div><label className="sort-select">Sort <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="bestselling">Best selling</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Alphabetical</option></select></label></section><section className="shell shop-layout"><ProductFilters categories={categories} brands={brands} filters={filters} setFilters={updateFilters} count={matches.length} onClear={() => updateFilters(cleanFilters)} /><div className="catalog-area"><div className="category-chips"><button className={!filters.category ? 'active' : ''} onClick={() => updateFilters({ ...filters, category: '' })}>All drinks</button>{categories.map((category) => <button key={category.name} className={filters.category === category.name ? 'active' : ''} onClick={() => updateFilters({ ...filters, category: category.name })}>{category.name}</button>)}</div><ProductGrid products={matches.slice(0, shown)} onQuickView={onQuickView} onNotice={onNotice} />{shown < matches.length && <button className="load-more" onClick={() => setShown((current) => current + 12)}>Load more drinks <span>({matches.length - shown} left)</span></button>}</div></section></main>;
}
