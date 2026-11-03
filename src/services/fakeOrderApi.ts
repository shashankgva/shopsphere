import type { CreateOrderRequest, Order } from '../types/order';

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function createFakeOrder(
  request: CreateOrderRequest,
): Promise<Order> {
  await wait(1500);

  const subtotal = request.products.reduce(
    (total, product) => total + product.quantity * 20,
    0,
  );

  const shipping = request.deliveryMethod === 'express' ? 14.99 : 0;

  const tax = subtotal * 0.08;

  return {
    id: `ORD-${Date.now()}`,
    userId: request.userId,
    email: request.email,
    products: request.products.map((product) => ({
      productId: product.id,
      title: `Product ${product.id}`,
      thumbnail: '',
      price: 20,
      quantity: product.quantity,
    })),
    shippingAddress: request.shippingAddress,
    billingAddress: request.billingAddress,
    deliveryMethod: request.deliveryMethod,
    paymentMethod: request.paymentMethod,
    subtotal,
    shipping,
    tax,
    total: subtotal + shipping + tax,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };
}
