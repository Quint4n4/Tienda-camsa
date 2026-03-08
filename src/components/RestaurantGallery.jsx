import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './RestaurantGallery.css';

export default function RestaurantGallery({ images = [] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(id);
  }, [images.length]);

  if (images.length === 0) return null;

  const goPrev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const goNext = () => setCurrent((prev) => (prev + 1) % images.length);

  return (
    <div className="restaurant-gallery">
      <div className="restaurant-gallery-main">
        {images.map((src, i) => (
          <div
            key={i}
            className={`restaurant-gallery-slide ${i === current ? 'restaurant-gallery-slide--active' : ''}`}
            aria-hidden={i !== current}
          >
            <img src={src} alt="" className="restaurant-gallery-img" />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="restaurant-gallery-btn restaurant-gallery-btn--prev"
            onClick={goPrev}
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            type="button"
            className="restaurant-gallery-btn restaurant-gallery-btn--next"
            onClick={goNext}
            aria-label="Siguiente imagen"
          >
            <ChevronRight size={28} />
          </button>

          <div className="restaurant-gallery-dots" role="tablist" aria-label="Navegación de imágenes">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-label={`Imagen ${i + 1}`}
                className={`restaurant-gallery-dot ${i === current ? 'restaurant-gallery-dot--active' : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
