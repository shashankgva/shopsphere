export interface Address {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type DeliveryMethod = 'standard' | 'express';

export type PaymentMethod = 'card' | 'cod';

export interface CheckoutFormValues {
  email: string;
  shippingAddress: Address;
  billingSameAsShipping: boolean;
  billingAddress: Address;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
}

export interface CheckoutErrors {
  [field: string]: string[] | undefined;
}

export interface CheckoutState {
  success: boolean;
  message: string;
  errors: CheckoutErrors;
  orderId?: string;
}
