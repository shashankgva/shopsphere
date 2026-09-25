import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export const selectWishlistItems = (state: RootState) => state.wishlist.items;

export const selectWishlistCount = createSelector(
  [selectWishlistItems],
  (items) => items.length,
);

export const selectWishlistProductIds = createSelector(
  [selectWishlistItems],
  (items) => new Set(items.map((item) => item.id)),
);
