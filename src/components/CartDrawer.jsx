import { X, Trash2, ArrowRight, CheckCircle, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useWhatsApp } from '../hooks/useWhatsApp';
import { sendRestaurantOrderTo } from '../hooks/useRestaurantOrder';
import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQty, onClearCart, onClearProductCart, onClearRestaurantOrder }) {
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [restaurantNames, setRestaurantNames] = useState({});
    const { sendOrder: sendProductOrder } = useWhatsApp();

    const productItems = cartItems.filter(i => i.type !== 'restaurant');
    const restaurantItems = cartItems.filter(i => i.type === 'restaurant');
    const restaurantGroups = restaurantItems.reduce((acc, item) => {
        if (!acc[item.restaurantId]) {
            acc[item.restaurantId] = { restaurantName: item.restaurantName, contactPhone: item.contactPhone, items: [] };
        }
        acc[item.restaurantId].items.push(item);
        return acc;
    }, {});

    const productTotal = productItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleProductCheckout = async (e) => {
        e.preventDefault();
        if (!productItems.length) return;
        setIsSubmitting(true);
        try {
            sendProductOrder(productItems, formData);
            setIsSuccess(true);
            onClearProductCart();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSendRestaurantOrder = (restaurantId, contactPhone, restaurantName, items) => {
        const customerName = restaurantNames[restaurantId] ?? '';
        const orderPayload = items.map(({ name, price, quantity }) => ({ name, price, quantity }));
        sendRestaurantOrderTo(contactPhone, restaurantName, orderPayload, customerName);
        onClearRestaurantOrder(restaurantId);
        setRestaurantNames(prev => ({ ...prev, [restaurantId]: '' }));
    };

    if (!isOpen) return null;

    return (
        <div className="drawer-overlay" onClick={onClose}>
            <div className="drawer-content" onClick={e => e.stopPropagation()}>
                <div className="drawer-header">
                    <h2>{isSuccess ? '¡Pedido Confirmado!' : isCheckingOut ? 'Finalizar Compra' : 'Tu Carrito'}</h2>
                    <button className="close-btn-sm" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {isSuccess ? (
                    <div className="success-view">
                        <div className="success-icon">
                            <CheckCircle size={64} color="var(--accent-secondary)" />
                        </div>
                        <h3>¡Gracias por tu compra, {formData.name}!</h3>
                        <p>Hemos recibido tu pedido correctamente. Te contactaremos por WhatsApp en breve para coordinar el pago y envío.</p>
                        <button className="btn btn-primary full-width" onClick={onClose}>
                            Seguir Explorando
                        </button>
                    </div>
                ) : isCheckingOut ? (
                    <form className="checkout-form" onSubmit={handleProductCheckout}>
                        <div className="form-group">
                            <label>Nombre Completo</label>
                            <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Ej. Juan Pérez" />
                        </div>
                        <div className="form-group">
                            <label>Teléfono (con lada)</label>
                            <input type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="Ej. 55 1234 5678" />
                        </div>
                        <div className="form-group">
                            <label>Dirección de Envío</label>
                            <textarea required value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} placeholder="Calle, Número, Colonia, Ciudad, CP" rows="3" />
                        </div>
                        <div className="checkout-summary">
                            <div className="summary-row total">
                                <span>Total a Pagar</span>
                                <span>${productTotal.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="checkout-actions">
                            <button type="button" className="btn btn-outline" onClick={() => setIsCheckingOut(false)}>Volver</button>
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Enviando...' : 'Confirmar Pedido'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="cart-items">
                        {cartItems.length === 0 ? (
                            <div className="empty-cart">
                                <p>Tu carrito está vacío.</p>
                                <button className="btn btn-outline" onClick={onClose}>Ver Productos</button>
                            </div>
                        ) : (
                            <>
                                {productItems.length > 0 && (
                                    <div className="cart-section">
                                        <h3 className="cart-section-title">Productos tienda</h3>
                                        {productItems.map(item => (
                                            <div key={item.id} className="cart-item">
                                                <img src={item.image} alt={item.name} className="cart-item-img" />
                                                <div className="cart-item-details">
                                                    <h4>{item.name}</h4>
                                                    <p className="cart-item-price">${item.price.toLocaleString()}</p>
                                                    <div className="qty-controls">
                                                        <button onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}>-</button>
                                                        <span>{item.quantity}</span>
                                                        <button onClick={() => onUpdateQty(item.id, item.quantity + 1)}>+</button>
                                                    </div>
                                                </div>
                                                <button className="remove-btn" onClick={() => onRemoveItem(item.id)}><Trash2 size={18} /></button>
                                            </div>
                                        ))}
                                        <div className="drawer-footer drawer-footer-inline">
                                            <div className="summary-row total">
                                                <span>Total</span>
                                                <span>${productTotal.toLocaleString()}</span>
                                            </div>
                                            <button type="button" className="btn btn-primary full-width" onClick={() => setIsCheckingOut(true)}>
                                                Finalizar Compra <ArrowRight size={18} />
                                            </button>
                                            <button type="button" className="btn btn-whatsapp full-width" onClick={() => { sendProductOrder(productItems); onClearProductCart(); }}>
                                                <MessageCircle size={18} />
                                                Pedir por WhatsApp
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {Object.entries(restaurantGroups).map(([restaurantId, { restaurantName, contactPhone, items }]) => {
                                    const totalRest = items.reduce((s, i) => s + (i.price || 0) * i.quantity, 0);
                                    const name = restaurantNames[restaurantId] ?? '';
                                    return (
                                        <div key={restaurantId} className="cart-section">
                                            <h3 className="cart-section-title">{restaurantName}</h3>
                                            {items.map(item => (
                                                <div key={item.id} className="cart-item cart-item-no-img">
                                                    <div className="cart-item-details">
                                                        <h4>{item.name}</h4>
                                                        <p className="cart-item-price">${(item.price || 0).toLocaleString()}</p>
                                                        <div className="qty-controls">
                                                            <button onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}>-</button>
                                                            <span>{item.quantity}</span>
                                                            <button onClick={() => onUpdateQty(item.id, item.quantity + 1)}>+</button>
                                                        </div>
                                                    </div>
                                                    <button className="remove-btn" onClick={() => onRemoveItem(item.id)}><Trash2 size={18} /></button>
                                                </div>
                                            ))}
                                            <div className="drawer-footer drawer-footer-inline">
                                                <label className="menu-page-name-label">
                                                    Tu nombre
                                                    <input
                                                        type="text"
                                                        className="menu-page-name-input"
                                                        placeholder="Nombre para el pedido"
                                                        value={name}
                                                        onChange={e => setRestaurantNames(prev => ({ ...prev, [restaurantId]: e.target.value }))}
                                                    />
                                                </label>
                                                <div className="summary-row total">
                                                    <span>Total</span>
                                                    <span>${totalRest.toLocaleString()}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn btn-whatsapp full-width"
                                                    onClick={() => handleSendRestaurantOrder(restaurantId, contactPhone, restaurantName, items)}
                                                >
                                                    <MessageCircle size={18} />
                                                    Pedir por WhatsApp
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
