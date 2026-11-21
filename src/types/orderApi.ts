import type { Coupon } from './coupon';

export type DeliveryMethod = 'standard' | 'express';

export type PaymentMethod = 'card' | 'paypal' | 'cash_on_delivery';

export type OrderStatus =
  | 'placed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CreateOrderRequest {
  items: Array<{
    productId: number;
    quantity: number;
  }>;
  shippingAddress: OrderAddress;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  couponCode?: Coupon;
}

export interface OrderLineItem {
  productId: number;
  title: string;
  thumbnail: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  items: OrderLineItem[];
  shippingAddress: OrderAddress;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  couponCode: Coupon | null;
  subtotal: number;
  shippingFee: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}
