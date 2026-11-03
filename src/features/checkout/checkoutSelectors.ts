import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import {
  selectCartSubtotal,
  selectShipping,
  selectTax,
} from '../cart/cartSelectors';

export const selectCoupon = (state: RootState) => state.checkout.coupon;

export const selectDiscount = createSelector(
  [selectCartSubtotal, selectCoupon],
  (subtotal, coupon) => {
    if (!coupon) {
      return 0;
    }

    return subtotal * (coupon.discountPercentage / 100);
  },
);

export const selectCheckoutTotal = createSelector(
  [selectCartSubtotal, selectShipping, selectTax, selectDiscount],
  (subtotal, shipping, tax, discount) => {
    return subtotal + shipping + tax - discount;
  },
);
