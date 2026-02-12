import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
// Hero removed for minimalist design
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import { products } from './data/products';
import { Microscope, Activity, ShieldCheck } from 'lucide-react';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cart Logic
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
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

  const scrollToShop = () => {
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main>
        {/* Minimalist Header for Product Focus */}
        <div className="container" style={{ paddingTop: '100px', paddingBottom: '3rem', textAlign: 'center' }}>
          <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>Excelencia en Medicina Regenerativa</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', fontWeight: 300 }}>Soluciones biotecnológicas de vanguardia para tu bienestar integral.</p>
        </div>

        <section id="shop" className="products-section" style={{ paddingTop: '0' }}>
          <div className="container">
            <div className="product-grid">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <img src="/imagenes/logo.png" alt="Clinica Camsa Logo" style={{ height: '60px', width: 'auto' }} />
              <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--accent-primary)' }}>Clinica Camsa</h3>
            </div>
            <p>La ciencia de la regeneración celular.</p>
          </div>
          <div className="footer-links">
            <a href="#">Términos</a>
            <a href="#">Privacidad</a>
            <a href="#">Contacto</a>
          </div>
          <p className="copyright">© 2026 Clinica Camsa. Todos los derechos reservados.</p>
        </div>
      </footer>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQty={updateQuantity}
        onClearCart={clearCart}
      />
    </div>
  );
}

export default App;
