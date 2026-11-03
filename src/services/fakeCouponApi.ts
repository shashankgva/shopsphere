import type { Coupon } from '../types/coupon';

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function applyCoupon(code: string): Promise<Coupon> {
  await wait(1500);

  const normalized = code.trim().toUpperCase();

  if (normalized !== 'SAVE10') {
    throw new Error('Invalid coupon code.');
  }

  return {
    code: normalized,
    discountPercentage: 10,
  };
}
