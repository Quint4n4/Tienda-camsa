import { X, ShoppingCart, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import './ProductModal.css';

export default function ProductModal({ product, isOpen, onClose, onAddToCart }) {
    const videoRef = useRef(null);
    const [usesOpen, setUsesOpen] = useState(false);
    const [benefitsOpen, setBenefitsOpen] = useState(false);
    const [modeOfUseOpen, setModeOfUseOpen] = useState(false);

    const hasExtendedInfo = product?.uses?.length || product?.benefits?.length || product?.modeOfUse;

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setUsesOpen(false);
            setBenefitsOpen(false);
            setModeOfUseOpen(false);
            if (videoRef.current) {
                videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
            }
        } else {
            document.body.style.overflow = 'unset';
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !product) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-grid">
                    <div className="modal-media">
                        <div className="video-wrapper">
                            {product.video && (product.video.includes('youtube.com') || product.video.includes('youtu.be')) ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${product.video.split('v=')[1]?.split('&')[0]}?autoplay=1&mute=1&loop=1&playlist=${product.video.split('v=')[1]?.split('&')[0]}`}
                                    title={product.name}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="modal-video"
                                ></iframe>
                            ) : (
                                <video
                                    ref={videoRef}
                                    src={product.video}
                                    poster={product.image}
                                    controls
                                    loop
                                    className="modal-video"
                                />
                            )}
                        </div>
                    </div>

                    <div className="modal-details">
                        <span className="modal-category">{product.category}</span>
                        <h2 className="modal-title">{product.name}</h2>
                        <p className="modal-price">${product.price.toLocaleString()}</p>

                        <p className="modal-description">
                            {product.tagline ?? product.description}
                        </p>

                        {(product.volume || product.productType) && (
                            <div className="modal-meta">
                                {product.productType && <span className="modal-meta-item">{product.productType}</span>}
                                {product.volume && <span className="modal-meta-item">Cont. Net. {product.volume}</span>}
                            </div>
                        )}

                        {hasExtendedInfo ? (
                            <div className="modal-accordions">
                                {product.uses?.length > 0 && (
                                    <div className="accordion">
                                        <button type="button" className="accordion-trigger" onClick={() => setUsesOpen(!usesOpen)} aria-expanded={usesOpen}>
                                            {usesOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                            Ver usos en afecciones
                                        </button>
                                        {usesOpen && (
                                            <ul className="accordion-content modal-list">
                                                {product.uses.map((use, index) => (
                                                    <li key={index}>{use}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                                {product.benefits?.length > 0 && (
                                    <div className="accordion">
                                        <button type="button" className="accordion-trigger" onClick={() => setBenefitsOpen(!benefitsOpen)} aria-expanded={benefitsOpen}>
                                            {benefitsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                            Ver beneficios
                                        </button>
                                        {benefitsOpen && (
                                            <ul className="accordion-content modal-list">
                                                {product.benefits.map((benefit, index) => (
                                                    <li key={index}>{benefit}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                                {product.modeOfUse && (
                                    <div className="accordion">
                                        <button type="button" className="accordion-trigger" onClick={() => setModeOfUseOpen(!modeOfUseOpen)} aria-expanded={modeOfUseOpen}>
                                            {modeOfUseOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                            Ver modo de uso
                                        </button>
                                        {modeOfUseOpen && (
                                            <p className="accordion-content modal-mode-of-use">{product.modeOfUse}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <ul className="modal-features">
                                {product.features?.map((feature, index) => (
                                    <li key={index} className="feature-item">
                                        <Check size={16} className="feature-icon" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <button className="btn btn-primary btn-lg full-width" onClick={() => onAddToCart(product)}>
                            <ShoppingCart size={20} />
                            Añadir al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
