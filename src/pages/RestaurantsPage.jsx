import { restaurants } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import './RestaurantsPage.css';

export default function RestaurantsPage() {
  return (
    <main className="restaurants-page">
      <header className="restaurants-hero">
        <div className="container restaurants-hero-inner">
          <img src="/imagenes/logo.png" alt="Clinica Camsa" className="restaurants-hero-logo" />
          <span className="restaurants-hero-brand">CLÍNICA CAMSA</span>
          <span className="restaurants-hero-tagline">COMPLEMENTA TU EXPERIENCIA</span>
        </div>
      </header>

      <section className="restaurants-section">
        <div className="container">
          <h1 className="restaurants-title">RESTAURANTES</h1>
          <div className="restaurants-grid">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
