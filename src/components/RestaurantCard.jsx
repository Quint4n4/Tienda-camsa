import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Truck, Phone, DollarSign } from 'lucide-react';
import './RestaurantCard.css';

export default function RestaurantCard({ restaurant }) {
  const [logoError, setLogoError] = useState(false);
  const showLogo = restaurant.logo && !logoError;

  return (
    <article className="restaurant-card">
      <div className="restaurant-card-logo-wrap">
        {showLogo ? (
          <img
            src={restaurant.logo}
            alt={restaurant.name}
            className="restaurant-card-logo"
            onError={() => setLogoError(true)}
          />
        ) : (
          <div className="restaurant-card-logo-placeholder">{restaurant.name.charAt(0)}</div>
        )}
      </div>
      <h2 className="restaurant-card-name">{restaurant.name}</h2>
      <p className="restaurant-card-desc">{restaurant.shortDescription}</p>
      <ul className="restaurant-card-info">
        <li>
          <Clock size={16} />
          <span>{restaurant.schedule}</span>
        </li>
        <li>
          <DollarSign size={16} />
          <span>{restaurant.deliveryCost}</span>
        </li>
        <li>
          <Truck size={16} />
          <span>{restaurant.waitTime}</span>
        </li>
        <li>
          <Phone size={16} />
          <span>{restaurant.contactPhone.replace(/^52(\d)(\d{3})(\d{3})(\d{4})$/, '+52 $1 $2 $3 $4').replace(/^52(\d{3})(\d{3})(\d{4})$/, '+52 $1 $2 $3')}</span>
        </li>
      </ul>
      <Link to={`/restaurantes/${restaurant.slug}`} className="btn btn-outline restaurant-card-btn">
        Ver menú
      </Link>
    </article>
  );
}
