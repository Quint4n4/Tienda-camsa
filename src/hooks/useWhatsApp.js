const WHATSAPP_NUMBER = "5217445514025"; // Reemplaza con tu número real (código de país + número, sin + ni espacios)

export function useWhatsApp() {
  const sendOrder = (cartItems, customer) => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) return;

    const itemsList = cartItems
      .map((item) => {
        const quantity = item.quantity ?? 1;
        const subtotal = (item.price * quantity).toFixed(2);
        return `• ${item.name} x${quantity} — $${subtotal}`;
      })
      .join("\n");

    const total = cartItems
      .reduce(
        (sum, item) => sum + item.price * (item.quantity ?? 1),
        0
      )
      .toFixed(2);

    let message = `¡Hola! Me gustaría hacer el siguiente pedido:\n\n${itemsList}\n\n*Total: $${total} MXN*\n\n¿Pueden confirmar disponibilidad?`;

    if (customer && (customer.name || customer.phone || customer.address)) {
      const customerLines = [
        "Datos del cliente:",
        customer.name ? `Nombre: ${customer.name}` : null,
        customer.phone ? `Teléfono: ${customer.phone}` : null,
        customer.address ? `Dirección: ${customer.address}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      message += `\n\n${customerLines}`;
    }

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  return { sendOrder };
}

