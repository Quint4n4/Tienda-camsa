import { X, Trash2, ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQty, onClearCart }) {
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call to n8n
        const orderData = {
            customer: formData,
            order: cartItems.map(item => ({
                product: item.name,
                qty: item.quantity,
                price: item.price
            })),
            total: total
        };

        console.log("Sending to n8n:", orderData);

        // Mock delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
        onClearCart();
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
                        <p>Hemos recibido tu pedido correctamente. Un especialista te contactará por Telegram en breve para coordinar el pago y envío.</p>
                        <button className="btn btn-primary full-width" onClick={onClose}>
                            Seguir Explorando
                        </button>
                    </div>
                ) : isCheckingOut ? (
                    <form className="checkout-form" onSubmit={handleCheckout}>
                        <div className="form-group">
                            <label>Nombre Completo</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ej. Juan Pérez"
                            />
                        </div>
                        <div className="form-group">
                            <label>Teléfono (con lada)</label>
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="Ej. 55 1234 5678"
                            />
                        </div>
                        <div className="form-group">
                            <label>Dirección de Envío</label>
                            <textarea
                                required
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                                placeholder="Calle, Número, Colonia, Ciudad, CP"
                                rows="3"
                            />
                        </div>

                        <div className="checkout-summary">
                            <div className="summary-row total">
                                <span>Total a Pagar</span>
                                <span>${total.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="checkout-actions">
                            <button type="button" className="btn btn-outline" onClick={() => setIsCheckingOut(false)}>
                                Volver
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Enviando...' : 'Confirmar Pedido'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.length === 0 ? (
                                <div className="empty-cart">
                                    <p>Tu carrito está vacío.</p>
                                    <button className="btn btn-outline" onClick={onClose}>Ver Productos</button>
                                </div>
                            ) : (
                                cartItems.map(item => (
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
                                        <button className="remove-btn" onClick={() => onRemoveItem(item.id)}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="drawer-footer">
                                <div className="summary-row total">
                                    <span>Total</span>
                                    <span>${total.toLocaleString()}</span>
                                </div>
                                <button className="btn btn-primary full-width" onClick={() => setIsCheckingOut(true)}>
                                    Finalizar Compra <ArrowRight size={18} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
