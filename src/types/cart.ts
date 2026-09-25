import type { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export type CartSyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface CartState {
  items: CartItem[];
  syncStatus: CartSyncStatus;
  syncError: string | null;
  lastSyncedAt: number | null;
}
