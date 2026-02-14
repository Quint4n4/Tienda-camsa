import { Play, ShoppingCart } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart, onViewDetails }) {
    return (
        <div className="product-card">
            <div className="product-image-container" onClick={() => onViewDetails(product)}>
                {product.video && (
                    <div className="product-video-badge" aria-hidden="true">
                        <Play size={12} fill="currentColor" />
                    </div>
                )}
                <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                <div className="product-overlay">
                    <button className="view-details-btn">
                        <Play size={16} fill="currentColor" />
                        Ver Video
                    </button>
                </div>
            </div>

            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title" onClick={() => onViewDetails(product)}>{product.name}</h3>
                <p className="product-tagline">
                    {product.tagline ?? (product.description?.split('.')[0] ? product.description.split('.')[0] + '.' : product.description)}
                </p>
                <p className="product-price">${product.price.toLocaleString()}</p>

                <div className="product-actions">
                    <button className="btn btn-outline btn-sm" onClick={() => onViewDetails(product)}>
                        Detalles
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={() => onAddToCart(product)}>
                        <ShoppingCart size={16} />
                        Añadir
                    </button>
                </div>
            </div>
        </div>
    );
}
