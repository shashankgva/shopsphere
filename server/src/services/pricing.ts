import * as z from 'zod';
import type { CreateOrderInput } from '../schemas/order.js';
import { HttpError } from '../utils/HttpError.js';

const DummyJsonProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number().nonnegative(),
  thumbnail: z.url(),
});

export async function priceOrder(input: CreateOrderInput) {
  const couponCode = input?.couponCode?.trim().toUpperCase();

  if (couponCode && couponCode !== 'SAVE10') {
    throw new HttpError('Invalid Coupon Code', 400);
  }

  const pricedLines = await Promise.all(
    input.items.map(async ({ productId, quantity }) => {
      let rawProduct: unknown;

      try {
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`,
        );

        if (!response.ok) {
          throw new HttpError(`Product ${productId} is unavailable`, 400);
        }

        rawProduct = await response.json();
      } catch (error) {
        if (error instanceof HttpError) {
          throw error;
        }

        throw new HttpError(
          'The product catalog is temporaroly unavailable.',
          502,
        );
      }

      const parsedProduct = DummyJsonProductSchema.safeParse(rawProduct);

      if (!parsedProduct.success || parsedProduct.data.id !== productId) {
        throw new HttpError(`Could not verify product ${productId}`, 502);
      }

      const product = parsedProduct.data;

      // Calculate in integer cents to avoid floating-point money errors.

      const unitPriceCents = Math.round(product.price * 100);
      const lineTotalInCents = unitPriceCents * quantity;

      return {
        productId: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        quantity,
        unitPriceCents,
        lineTotalInCents,
      };
    }),
  );

  const subtotalCents = pricedLines.reduce(
    (sum, item) => sum + item.lineTotalInCents,
    0,
  );

  const shippingFeeCents =
    input.deliveryMethod === 'express' ? 1299 : subtotalCents >= 5000 ? 0 : 599;

  const taxCents = subtotalCents * 0.08;

  const discountCents =
    couponCode === 'SAVE10' ? Math.round(subtotalCents * 0.1) : 0;

  const totalCents = Math.max(
    0,
    subtotalCents + shippingFeeCents - discountCents,
  );

  return {
    items: pricedLines.map(
      ({
        productId,
        title,
        thumbnail,
        quantity,
        unitPriceCents,
        lineTotalInCents,
      }) => ({
        productId,
        title,
        thumbnail,
        quantity,
        unitPrice: unitPriceCents / 100,
        lineTotal: lineTotalInCents / 100,
      }),
    ),
    shippingAddress: input.shippingAddress,
    deliveryMethod: input.deliveryMethod,
    paymentMethod: input.paymentMethod,
    couponCode,
    subtotal: subtotalCents / 100,
    shippingFee: shippingFeeCents / 100,
    tax: taxCents / 100,
    discount: discountCents / 100,
    total: totalCents / 100,
  };
}
