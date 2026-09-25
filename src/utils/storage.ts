import type { CartState } from '../types/cart';

const CART_KEY = 'shopsphere-cart';

export function loadCart(): CartState | undefined {
  try {
    const serialized = localStorage.getItem(CART_KEY);

    if (!serialized) {
      return undefined;
    }

    return JSON.parse(serialized) as CartState;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export function saveCart(cart: CartState): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error(error);
  }
}
