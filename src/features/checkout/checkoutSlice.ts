import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Coupon } from '../../types/coupon';

interface CheckoutState {
  coupon: Coupon | null;
}

const initialState: CheckoutState = {
  coupon: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCoupon: (state, action: PayloadAction<Coupon>) => {
      state.coupon = action.payload;
    },
    removeCoupon: (state) => {
      state.coupon = null;
    },
    resetCheckout: (state) => {
      state.coupon = null;
    },
  },
});

export const { setCoupon, removeCoupon, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
