import {
  Schema,
  model,
  type HydratedDocument,
  type InferSchemaType,
} from 'mongoose';

const addressSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, default: '' },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false },
);

const orderItemsSchema = new Schema(
  {
    productId: { type: Number, required: true },
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    lineTotal: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    items: {
      type: [orderItemsSchema],
      required: true,
    },
    shippingAddress: {
      type: addressSchema,
      required: true,
    },
    deliveryMethod: {
      type: String,
      enum: ['standard', 'express'],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'paypal', 'cash_on_delivery'],
      required: true,
    },
    couponCode: {
      type: String,
      default: null,
    },
    subtotal: { type: Number, required: true, min: 0 },
    shippingFee: { type: Number, required: true, min: 0 },
    tax: { type: Number, required: true, min: 0 },
    discount: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['placed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'placed',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type OrderDocument = HydratedDocument<
  InferSchemaType<typeof orderSchema>
>;

export const OrderModel = model('Order', orderSchema);

export type OrderStatus =
  | 'placed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export function toOrderResponse({
  _id,
  items,
  shippingAddress: {
    firstName,
    lastName,
    email,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
  },
  deliveryMethod,
  paymentMethod,
  couponCode,
  subtotal,
  shippingFee,
  tax,
  discount,
  total,
  status,
  createdAt,
}: OrderDocument) {
  return {
    id: _id.toString(),
    items: items.map(
      ({ productId, title, thumbnail, quantity, unitPrice, lineTotal }) => ({
        productId,
        title,
        thumbnail,
        quantity,
        unitPrice,
        lineTotal,
      }),
    ),
    shippingAddress: {
      firstName,
      lastName,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
    },
    deliveryMethod,
    paymentMethod,
    couponCode: couponCode ?? null,
    subtotal,
    shippingFee,
    tax,
    discount,
    total,
    status: status as OrderStatus,
    createdAt: createdAt.toISOString(),
  };
}
