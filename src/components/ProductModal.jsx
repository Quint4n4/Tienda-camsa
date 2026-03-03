import { X, ShoppingCart, Check, ChevronDown, ChevronUp, Play, Maximize2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import './ProductModal.css';

export default function ProductModal({ product, isOpen, onClose, onAddToCart }) {
    const videoRef = useRef(null);
    const videoFullscreenContainerRef = useRef(null);
    const [usesOpen, setUsesOpen] = useState(false);
    const [benefitsOpen, setBenefitsOpen] = useState(false);
    const [modeOfUseOpen, setModeOfUseOpen] = useState(false);
    const [flyerError, setFlyerError] = useState(false);
    const [postError, setPostError] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const hasFlyer = product?.flyer && !flyerError;
    const hasPost = product?.post && !postError;
    const hasExtendedInfo = product?.uses?.length || product?.benefits?.length || product?.modeOfUse;

    const slides = useMemo(() => {
        if (!product) return [];
        const items = [];

        // Video primero para acceder rápido
        if (product.video) {
            const isYoutube = product.video.includes('youtube.com') || product.video.includes('youtu.be');
            items.push({ type: 'video', url: product.video, isYoutube });
        }

        // Después imágenes relacionadas
        if (product.image) {
            items.push({ type: 'image', src: product.image, alt: product.name || 'Imagen del producto' });
        }
        if (hasFlyer) items.push({ type: 'image', src: product.flyer, alt: 'Imagen del producto' });
        if (hasPost) items.push({ type: 'image', src: product.post, alt: 'Imagen del producto' });

        return items;
    }, [product, hasFlyer, hasPost]);

    useEffect(() => {
        if (isOpen && product) {
            document.body.style.overflow = 'hidden';
            setUsesOpen(false);
            setBenefitsOpen(false);
            setModeOfUseOpen(false);
            setFlyerError(false);
            setPostError(false);
            if (slides.length > 0) setCurrentSlide(0);
        } else {
            document.body.style.overflow = 'unset';
            if (videoRef.current) videoRef.current.pause();
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, product?.id, slides]);

    useEffect(() => {
        if (!isOpen) return;
        const handler = (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                setCurrentSlide((prev) => (prev <= 0 ? slides.length - 1 : prev - 1));
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                setCurrentSlide((prev) => (prev >= slides.length - 1 ? 0 : prev + 1));
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen, slides.length]);

    if (!isOpen || !product) return null;

    const slide = slides[currentSlide] || null;

    const toggleFullscreen = () => {
        const el = videoFullscreenContainerRef.current;
        if (!el?.requestFullscreen) return;
        if (document.fullscreenElement === el) {
            document.exitFullscreen().catch(() => {});
        } else if (!document.fullscreenElement) {
            el.requestFullscreen().catch(() => {});
        }
    };

    const renderSlide = (s) => {
        if (!s) return null;
        if (s.type === 'video') {
            const videoContent = s.isYoutube ? (
                <>
                    <div className="video-wrapper">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${(s.url.split('v=')[1]?.split('&')[0] || s.url.split('youtu.be/')[1]?.split('?')[0])}?autoplay=0&rel=0&playsinline=1`}
                            title={product.name}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                            allowFullScreen
                            className="modal-video"
                        />
                    </div>
                </>
            ) : (
                <div className="video-wrapper">
                    <video
                        ref={videoRef}
                        src={s.url}
                        poster={product.image}
                        controls
                        loop
                        className="modal-video"
                        playsInline
                    />
                </div>
            );
            return (
                <div
                    ref={videoFullscreenContainerRef}
                    className="video-fullscreen-container"
                >
                    {videoContent}
                    <div className="video-fullscreen-controls">
                        <button
                            type="button"
                            className="video-fullscreen-btn"
                            onClick={toggleFullscreen}
                            aria-label="Ver o salir de pantalla completa"
                        >
                            <Maximize2 size={20} />
                            Pantalla completa
                        </button>
                    </div>
                </div>
            );
        }
        if (s.type === 'image') {
            return (
                <div className="modal-image-wrapper">
                    <img
                        src={s.src}
                        alt={s.alt || 'Imagen del producto'}
                        className="modal-flyer-post-image"
                        onError={() => {
                            if (s.src === product.flyer) setFlyerError(true);
                            if (s.src === product.post) setPostError(true);
                        }}
                    />
                </div>
            );
        }
        return null;
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-grid">
                    <div className="modal-media">
                        <div className="modal-main-media">
                            {slide ? renderSlide(slide) : (
                                <p className="modal-image-placeholder">Imagen no disponible</p>
                            )}
                        </div>
                        {slides.length > 1 && (
                            <div className="modal-thumbnails" role="list">
                                {slides.map((thumb, index) => {
                                    const isActive = index === currentSlide;
                                    const isVideoThumb = thumb.type === 'video';
                                    const label = isVideoThumb
                                        ? 'Ver video del producto'
                                        : (thumb.alt || `Imagen ${index + 1} del producto`);
                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            className={`modal-thumbnail ${isActive ? 'modal-thumbnail--active' : ''}`}
                                            onClick={() => setCurrentSlide(index)}
                                            aria-label={label}
                                            aria-current={isActive ? 'true' : undefined}
                                            role="listitem"
                                        >
                                            {isVideoThumb ? (
                                                <div className="modal-thumbnail-video">
                                                    <Play size={18} />
                                                </div>
                                            ) : (
                                                <img
                                                    src={thumb.src}
                                                    alt={thumb.alt || label}
                                                    className="modal-thumbnail-image"
                                                    onError={() => {
                                                        if (thumb.src === product.flyer) setFlyerError(true);
                                                        if (thumb.src === product.post) setPostError(true);
                                                    }}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
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
