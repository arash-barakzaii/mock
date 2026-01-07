import type { UiProduct } from './types';
import { useState } from 'react';

interface Props {
  product: UiProduct;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: Props) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="product-card" onClick={onClick}>
      {!imgError && product.imageUrl ? (
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="product-image"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="product-image-placeholder">🖼️</div>
      )}
      <div className="product-info">
        <span className="product-type">{product.category}</span>
        <h3>{product.title}</h3>
        <p className="price">€{product.price.toFixed(2)}</p>
        <div className="tags">
          {product.tags.slice(0, 2).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};