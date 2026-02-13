import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ cartCount, onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="logo">
          <img src="/imagenes/logo.png" alt="Clinica Camsa" style={{ height: '50px', width: 'auto', display: 'block' }} />
        </Link>

        <div className="nav-actions">
          <Link to="/restaurantes" className="nav-link">Restaurantes</Link>
          <button className="cart-btn" onClick={onOpenCart}>
            <ShoppingCart size={24} strokeWidth={1.5} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}
