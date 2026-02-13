import { Plus } from 'lucide-react';
import './MenuItemCard.css';

export default function MenuItemCard({ item, quantity = 0, onAdd }) {
  return (
    <div className="menu-item-card">
      <div className="menu-item-card-body">
        <h3 className="menu-item-card-name">{item.name}</h3>
        {item.price != null && (
          <p className="menu-item-card-price">${item.price.toLocaleString()} MXN</p>
        )}
        {item.description && (
          <p className="menu-item-card-desc">{item.description}</p>
        )}
        <div className="menu-item-card-actions">
          {quantity > 0 && <span className="menu-item-card-qty">{quantity} en pedido</span>}
          <button type="button" className="btn btn-primary btn-sm menu-item-card-add" onClick={() => onAdd(item)}>
            <Plus size={16} />
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}
