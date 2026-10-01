import { z } from 'zod';

const addressSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  addressLine1: z.string().trim().min(5, 'Enter a valid address'),
  addressLine2: z.string().trim().optional(),
  city: z.string().trim().min(2, 'City is required'),
  state: z.string().trim().min(2, 'State is required'),
  postalCode: z.string().trim().min(3, 'Postal code is required'),
  country: z.string().trim().min(2, 'Country is required'),
});

export const checkoutSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  shippingAddress: addressSchema,
  billingSameAsShipping: z.boolean(),
  billingAddress: addressSchema.optional(),
  deliveryMethod: z.enum(['standard', 'express']),
  paymentMethod: z.enum(['card', 'cod']),
});
