import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProducts, setSelectedProduct } from './productsSlice';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import { ProductDetail } from './ProductDetail';

export const ProductList = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, searchTerm, sortBy, tagFilter, selectedProduct } = useAppSelector(s => s.products);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filtered = useMemo(() => {
    let result = [...items];
    
    // Tag Filter
    if (tagFilter) {
      result = result.filter(p => p.tags?.includes(tagFilter));
    }
    
    // Search
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort
    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
      return 0;
    });
    
    return result;
  }, [items, searchTerm, sortBy, tagFilter]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="products-page">
      <ProductFilters />
      
      <p className="results-count">{filtered.length} products found</p>
      
      <div className="products-grid">
        {filtered.slice(0, limit).map((p, i) => (
          <ProductCard 
            key={p.slug || i} 
            product={p} 
            onClick={() => dispatch(setSelectedProduct(p))}
          />
        ))}
      </div>

      {limit < filtered.length && (
        <button className="load-more" onClick={() => setLimit(l => l + 12)}>
          Load More ({filtered.length - limit} remaining)
        </button>
      )}

      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => dispatch(setSelectedProduct(null))} 
        />
      )}
    </div>
  );
};