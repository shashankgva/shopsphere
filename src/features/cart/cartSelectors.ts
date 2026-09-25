import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
);

export const selectCartSubtotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => {
    const discountedPrice =
      item.product.price * (1 - item.product.discountPercentage / 100);

    return total + discountedPrice * item.quantity;
  }, 0),
);

export const selectShipping = createSelector(
  [selectCartSubtotal],
  (subtotal) => {
    if (subtotal === 0) {
      return 0;
    }

    return subtotal > 100 ? 0 : 9.99;
  },
);

export const selectTax = createSelector(
  [selectCartSubtotal],
  (subtotal) => subtotal * 0.08,
);

export const selectCartTotal = createSelector(
  [selectCartSubtotal, selectShipping, selectTax],
  (subtotal, shipping, tax) => subtotal + shipping + tax,
);
