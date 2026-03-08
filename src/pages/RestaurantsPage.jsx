import { restaurants } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import './RestaurantsPage.css';

export default function RestaurantsPage() {
  return (
    <main className="restaurants-page">
      <section className="restaurants-section">
        <div className="container">
          <h1 className="restaurants-title">RESTAURANTES</h1>
          <div className="restaurants-grid">
            {restaurants.slice(0, 3).map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
