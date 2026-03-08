import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { getRestaurantBySlug } from '../data/restaurants';
import RestaurantGallery from '../components/RestaurantGallery';
import './RestaurantMenuPage.css';

export default function RestaurantMenuPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const restaurant = getRestaurantBySlug(slug);
  const [logoError, setLogoError] = useState(false);

  if (!restaurant) {
    navigate('/restaurantes', { replace: true });
    return null;
  }

  const showLogo = restaurant.logo && !logoError;
  const galleryImages = restaurant.galleryImages ?? [];

  return (
    <main className="menu-page">
      <div className="menu-page-layout">
        <header className="menu-page-header">
          {showLogo ? (
            <img
              src={restaurant.logo}
              alt={restaurant.name}
              className="menu-page-logo"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="menu-page-logo-placeholder">{restaurant.name.charAt(0)}</div>
          )}
          <div className="menu-page-header-text">
            <h1 className="menu-page-title">{restaurant.name}</h1>
            <p className="menu-page-desc">{restaurant.shortDescription}</p>
          </div>
        </header>

        <section className="menu-page-gallery" aria-label="Galería de imágenes">
          <RestaurantGallery images={galleryImages} />
        </section>

        {restaurant.menuUrl && (
          <div className="menu-page-actions">
            <a
              href={restaurant.menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary menu-page-menu-link"
            >
              <ExternalLink size={18} />
              Ver menú completo
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
