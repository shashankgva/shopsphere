import * as z from 'zod';
import type { CreateOrderInput } from '../schemas/order.js';
import { HttpError } from '../utils/HttpError.js';

const DummyJsonProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number().nonnegative(),
  thumbnail: z.url(),
});

export async function priceOrder(input: CreateOrderInput) {}
