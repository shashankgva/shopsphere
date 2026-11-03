import type { Address, DeliveryMethod, PaymentMethod } from './checkout';

export interface OrderProduct {
  productId: number;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

export interface CreateOrderRequest {
  userId: number;
  email: string;
  shippingAddress: Address;
  billingAddress: Address;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  products: {
    id: number;
    quantity: number;
  }[];
}

export type OrderStatus =
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  userId: number;
  email: string;
  products: OrderProduct[];
  shippingAddress: Address;
  billingAddress: Address;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}
