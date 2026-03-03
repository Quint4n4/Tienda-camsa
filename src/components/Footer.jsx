export default function Footer() {
  return (
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
  );
}
