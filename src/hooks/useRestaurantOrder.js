export function sendRestaurantOrderTo(contactPhone, restaurantName, orderItems, customerName) {
  if (!contactPhone || !Array.isArray(orderItems) || orderItems.length === 0) return;

  const itemsList = orderItems
    .map((item) => {
      const qty = item.quantity ?? 1;
      const price = item.price ?? 0;
      const subtotal = (price * qty).toFixed(2);
      return `• ${item.name} x${qty} — $${subtotal}`;
    })
    .join("\n");

  const total = orderItems
    .reduce((sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1), 0)
    .toFixed(2);

  const nameLine = customerName?.trim()
    ? `\n*Pedido de:* ${customerName.trim()}\n`
    : "\n";

  const message = `¡Hola! Quiero hacer un pedido de *${restaurantName}*:${nameLine}\n${itemsList}\n\n*Total: $${total} MXN*\n\n¿Pueden confirmar disponibilidad?`;

  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${contactPhone}?text=${encodedMessage}`;

  if (typeof window !== "undefined") {
    window.open(url, "_blank");
  }
}

export function useRestaurantOrder(contactPhone, restaurantName) {
  const sendOrder = (orderItems, customerName) => {
    sendRestaurantOrderTo(contactPhone, restaurantName, orderItems, customerName);
  };
  return { sendOrder };
}
