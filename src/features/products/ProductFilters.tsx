import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSearchTerm, setSortBy, setTagFilter } from './productsSlice';

export const ProductFilters = () => {
  const dispatch = useAppDispatch();
  const { searchTerm, sortBy, tagFilter, items } = useAppSelector(s => s.products);

  // Alle Tags aus den Produkten extrahieren
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    items.forEach(p => p.tags?.forEach(t => tags.add(t)));
    return Array.from(tags).sort().slice(0, 20); // Nur erste 20
  }, [items]);

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      
      <select 
        value={tagFilter || ''} 
        onChange={(e) => dispatch(setTagFilter(e.target.value || null))}
      >
        <option value="">All Tags</option>
        {allTags.map(tag => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </select>

      <select 
        value={sortBy} 
        onChange={(e) => dispatch(setSortBy(e.target.value as any))}
      >
        <option value="name">Name A-Z</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
      </select>
    </div>
  );
};