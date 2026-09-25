import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';
import type { CartState } from '../../types/cart';
import { syncCart } from './cartThunk';

interface AddToCartPayload {
  product: Product;
  quantity?: number;
}

interface UpdateQuantityPayload {
  productId: number;
  quantity: number;
}

const initialState: CartState = {
  items: [],
  syncStatus: 'idle',
  syncError: null,
  lastSyncedAt: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { product, quantity = 1 } = action.payload;

      const existingItem = state.items.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + quantity,
          product.stock,
        );
        return;
      }

      state.items.push({
        product,
        quantity: Math.min(quantity, product.stock),
      });
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload,
      );
    },

    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { productId, quantity } = action.payload;

      const item = state.items.find((item) => item.product.id === productId);

      if (!item) {
        return;
      }

      item.quantity = Math.max(1, Math.min(quantity, item.product.stock));
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncCart.pending, (state) => {
        state.syncStatus = 'loading';
        state.syncError = null;
      })
      .addCase(syncCart.fulfilled, (state) => {
        state.syncStatus = 'succeeded';
        state.syncError = null;
        state.lastSyncedAt = Date.now();
      })
      .addCase(syncCart.rejected, (state, action) => {
        state.syncStatus = 'failed';

        state.syncError =
          action.payload ??
          action.error.message ??
          'Unable to synchronize cart.';
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
