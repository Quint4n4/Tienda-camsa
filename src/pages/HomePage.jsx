import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { products } from '../data/products';
import '../App.css';

export default function HomePage({
  selectedProduct,
  setSelectedProduct,
  addToCart,
}) {
  return (
    <>
      <main>
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

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </>
  );
}
