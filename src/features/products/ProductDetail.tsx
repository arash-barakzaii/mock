import type { Product } from './types';

interface Props {
  product: Product;
  onClose: () => void;
}

export const ProductDetail = ({ product, onClose }: Props) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="detail-content">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="detail-image"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          
          <div className="detail-info">
            <span className="detail-type">{product.itemType}</span>
            <h2>{product.name}</h2>
            <p className="detail-price">€{product.price?.toFixed(2)}</p>
            
            {product.description && (
              <p className="detail-description">{product.description}</p>
            )}
            
            {product.manufacturer && (
              <p className="detail-manufacturer">By {product.manufacturer}</p>
            )}
            
            <div className="tags">
              {product.tags?.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            
            <button className="btn-add-cart">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};