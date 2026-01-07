import type { Product } from './types';
import { useState } from 'react';

interface Props {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: Props) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="product-card" onClick={onClick}>
      {!imgError ? (
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="product-image"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="product-image-placeholder">🖼️</div>
      )}
      <div className="product-info">
        <span className="product-type">{product.itemType}</span>
        <h3>{product.name}</h3>
        <p className="price">€{product.price?.toFixed(2)}</p>
        <div className="tags">
          {product.tags?.slice(0, 2).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};