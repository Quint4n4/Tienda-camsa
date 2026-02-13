import { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { getRestaurantBySlug } from '../data/restaurants';
import MenuItemCard from '../components/MenuItemCard';
import './RestaurantMenuPage.css';

export default function RestaurantMenuPage({ cartItems, onAddToCartRestaurant, onOpenCart }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const restaurant = getRestaurantBySlug(slug);
  const sectionRefs = useRef({});
  const [expandedCategories, setExpandedCategories] = useState(() => ({}));
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [logoError, setLogoError] = useState(false);
  const showLogo = restaurant?.logo && !logoError;

  const restaurantCartItems = (cartItems || []).filter(
    (i) => i.type === 'restaurant' && i.restaurantId === slug
  );

  const categories = restaurant?.menu?.categories ?? [];

  useEffect(() => {
    if (!categories.length) return;
    setExpandedCategories((prev) => {
      const hasInitialized = Object.keys(prev).length > 0;
      if (hasInitialized) return prev;
      return categories.reduce((acc, c) => ({ ...acc, [c.id]: true }), {});
    });
  }, [restaurant?.slug, categories.length]);

  const getQuantity = (itemId) => {
    const entry = restaurantCartItems.find((i) => i.itemId === itemId);
    return entry?.quantity ?? 0;
  };

  const addToOrder = (item) => {
    if (!restaurant) return;
    onAddToCartRestaurant(item, restaurant);
    onOpenCart();
  };

  const scrollToCategory = (categoryId) => {
    setActiveCategoryId(categoryId);
    setExpandedCategories((prev) => ({ ...prev, [categoryId]: true }));
    requestAnimationFrame(() => {
      sectionRefs.current[categoryId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  if (!restaurant) {
    navigate('/restaurantes', { replace: true });
    return null;
  }

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

        <nav className="menu-page-nav" aria-label="Categorías del menú">
          <div className="menu-page-nav-inner">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`menu-page-nav-card ${activeCategoryId === category.id ? 'menu-page-nav-card--active' : ''}`}
                onClick={() => scrollToCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </nav>

        <div className="menu-page-content">
          {categories.map((category) => {
            const isExpanded = expandedCategories[category.id] !== false;
            return (
              <section
                key={category.id}
                ref={(el) => { sectionRefs.current[category.id] = el; }}
                className="menu-category"
                id={`cat-${category.id}`}
              >
                <button
                  type="button"
                  className="menu-category-header"
                  onClick={() => toggleCategory(category.id)}
                  aria-expanded={isExpanded}
                >
                  <span className="menu-category-title">{category.name}</span>
                  <span className="menu-category-count">{category.items?.length ?? 0} ítems</span>
                  {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {isExpanded && (
                  <div className="menu-items-grid">
                    {category.items?.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        quantity={getQuantity(item.id)}
                        onAdd={addToOrder}
                      />
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
