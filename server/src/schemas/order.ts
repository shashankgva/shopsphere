import * as z from 'zod';

const AddressSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.email(),
  phone: z.string().trim().min(7).max(30),
  addressLine1: z.string().trim().min(1).max(150),
  addressLine2: z.string().trim().max(150).optional(),
  city: z.string().trim().min(1).max(80),
  state: z.string().trim().min(1).max(80),
  postalCode: z.string().trim().min(1).max(20),
  country: z.string().trim().min(1).max(80),
});

const CartLineSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().min(1).max(99),
});

const CreateOrderSchema = z.object({
  items: z
    .array(CartLineSchema)
    .min(1, 'Your Cart is empty')
    .max(30, 'Too many different products')
    .refine(
      (items) =>
        new Set(items.map((item) => item.productId)).size === items.length,
      'Each product must appear only once.',
    ),
  shippingAddress: AddressSchema,
  deliveryMethod: z.enum(['card', 'paypal', 'cash_on_delivery']),
  couponCode: z.string().trim().toUpperCase().max(30).optional(),
});
