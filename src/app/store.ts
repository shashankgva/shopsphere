import { configureStore } from '@reduxjs/toolkit';

import { productsApi } from '../services/productsApi';
import cartReducer from '../features/cart/cartSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import { loadCart, saveCart } from '../utils/storage';

const persistedCart = loadCart();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },

  preloadedState: persistedCart ? { cart: persistedCart } : undefined,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.subscribe(() => {
  saveCart(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
