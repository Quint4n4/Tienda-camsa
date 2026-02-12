import './Hero.css';

export default function Hero({ onShopClick }) {
    return (
        <section className="hero">
            <div className="hero-background"></div>
            <div className="container hero-content">
                <span className="hero-badge">Ciencia Regenerativa Avanzada</span>
                <h1 className="hero-title">
                    Recupera tu vitalidad<br />
                    <span className="text-gradient">celula a celula.</span>
                </h1>
                <p className="hero-subtitle">
                    Terapias biológicas de última generación diseñadas para potenciar
                    la capacidad natural de tu cuerpo para sanar y rejuvenecer.
                </p>
                <div className="hero-actions">
                    <button className="btn btn-primary btn-lg" onClick={onShopClick}>
                        Ver Tratamientos
                    </button>
                    <button className="btn btn-outline btn-lg">
                        Conocer la Ciencia
                    </button>
                </div>
            </div>
        </section>
    );
}
