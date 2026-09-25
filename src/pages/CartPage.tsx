import { ShoppingBag, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCartItems } from '../features/cart/cartSelectors';
import { Link } from 'react-router-dom';
import { clearCart } from '../features/cart/cartSlice';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import { syncCart } from '../features/cart/cartThunk';

function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);

  const syncStatus = useAppSelector((state) => state.cart.syncStatus);
  const syncError = useAppSelector((state) => state.cart.syncError);

  if (items.length === 0) {
    return <EmptyCart />;
  }

  async function handleSyncCart() {
    try {
      const serverCart = await dispatch(syncCart()).unwrap();
      console.log(`Server Cart:`, serverCart);
    } catch (error) {
      console.error('Sync failed', error);
    }
  }

  return (
    <section>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shopping cart</h1>
          <p className="mt-1 text-slate-500">
            Review your items before checkout.
          </p>
        </div>
        <button
          type="button"
          onClick={() => dispatch(clearCart())}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <Trash2 size={17} />
          Clear cart
        </button>
        <button
          type="button"
          disabled={syncStatus === 'loading'}
          onClick={handleSyncCart}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {syncStatus === 'loading' ? 'Syncing...' : 'Sync cart'}
        </button>
        {syncError && <p className="mt-3 text-sm text-red-600">{syncError}</p>}
      </div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0, 1fr)_360px]">
        <div className="rounded-2xl border border-slate-200 bg-white px-6">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>
        <div>
          <div className="sticky top-24">
            <OrderSummary />
          </div>
        </div>
      </div>
    </section>
  );
}

function EmptyCart() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="rounded-full bg-slate-100 p-6">
        <ShoppingBag size={42} className="text-slate-400" />
      </div>
      <h1 className="mt-6 text-2xl font-bold">Your cart is empty</h1>
      <p className="mt-2 max-w-md text-slate-500">
        Browse our products and add something you like.
      </p>
      <Link
        to="/products"
        className="mt-6 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-blue-600"
      >
        Start shopping
      </Link>
    </div>
  );
}

export default CartPage;
