import { configureStore } from '@reduxjs/toolkit';

import { shopApi } from '../services/shopApi';
import cartReducer from '../features/cart/cartSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import checkoutReducer from '../features/checkout/checkoutSlice';
import { loadCart, saveCart } from '../utils/storage';
import { ordersApi } from '../services/ordersApi';

const persistedCart = loadCart();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    checkout: checkoutReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },

  preloadedState: persistedCart ? { cart: persistedCart } : undefined,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(shopApi.middleware)
      .concat(ordersApi.middleware),
});

store.subscribe(() => {
  saveCart(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
