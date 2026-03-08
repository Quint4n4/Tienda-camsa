import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import HomePage from './pages/HomePage';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantMenuPage from './pages/RestaurantMenuPage';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.type !== 'restaurant' && item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.type !== 'restaurant' && item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQty) => {
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const clearProductCart = () => {
    setCartItems(prev => prev.filter(item => item.type === 'restaurant'));
  };

  const clearRestaurantOrder = (restaurantId) => {
    setCartItems(prev => prev.filter(item => item.type !== 'restaurant' || item.restaurantId !== restaurantId));
  };

  return (
    <div className="app">
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              addToCart={addToCart}
            />
          }
        />
        <Route path="/restaurantes" element={<RestaurantsPage />} />
        <Route path="/restaurantes/:slug" element={<RestaurantMenuPage />} />
      </Routes>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQty={updateQuantity}
        onClearCart={clearCart}
        onClearProductCart={clearProductCart}
        onClearRestaurantOrder={clearRestaurantOrder}
      />

      <Footer />
    </div>
  );
}

export default App;
