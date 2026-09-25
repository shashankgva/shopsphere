import { createAsyncThunk } from '@reduxjs/toolkit';
import type { SaveCartRequest, ServerCart } from '../../types/serverCart';
import type { RootState } from '../../app/store';

export const syncCart = createAsyncThunk<
  ServerCart,
  void,
  { state: RootState; rejectValue: string }
>('cart/syncCart', async (_, thunkAPI) => {
  const state = thunkAPI.getState();

  const requestBody: SaveCartRequest = {
    userId: 1,
    products: state.cart.items.map((item) => ({
      id: item.product.id,
      quantity: item.quantity,
    })),
  };

  try {
    const response = await fetch('https://dummyjson.com/carts/add?delay=5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal: thunkAPI.signal,
    });

    if (!response.ok) {
      return thunkAPI.rejectWithValue('Unable to synchronize cart.');
    }

    return (await response.json()) as ServerCart;
  } catch (error) {
    if (thunkAPI.signal.aborted) {
      throw error;
    }

    return thunkAPI.rejectWithValue(
      'Something went wrong while synchronizing the cart.',
    );
  }
});
