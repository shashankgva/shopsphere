import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { removeFromCart, updateQuantity } from '../../features/cart/cartSlice';
import type { CartItem as CartItemType } from '../../types/cart';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  const { product, quantity } = item;

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);
  const lineTotal = discountedPrice * quantity;

  function handleQuantityChange(nextQuantity: number) {
    dispatch(updateQuantity({ productId: product.id, quantity: nextQuantity }));
  }
  return (
    <article className="flex flex-col gap-5 border-b border-slate-200 py-6 last:border-0 sm:flex-row">
      <Link
        to={`/products/${product.id}`}
        className="h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-slate-100"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain p-3"
        />
      </Link>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {product.category}
            </p>
            <Link
              to={`/products/${product.id}`}
              className="mt-1 block font-semibold hover:text-blue-600"
            >
              {product.title}
            </Link>
            <p className="mt-1 text-sm text-slate-500">
              ${discountedPrice.toFixed(2)} each
            </p>
          </div>
          <button
            type="button"
            aria-label={`Remove ${product.title}`}
            onClick={() => dispatch(removeFromCart(product.id))}
            className="self-start rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={19} />
          </button>
        </div>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-5">
          <div>
            <p className="mb-2 text-xs font-medium text-slate-500">Quantity</p>
            <div className="inline-flex overflow-hidden rounded-lg border border-slate-300">
              <button
                type="button"
                disabled={quantity <= 1}
                onClick={() => handleQuantityChange(quantity - 1)}
                className="flex h-9 w-9 items-center justify-center hover:bg-slate-100 disabled:opacity-30"
              >
                <Minus size={15} />
              </button>
              <span className="flex h-9 min-w-10 items-center justify-center border-x border-slate-300 text-sm font-medium">
                {quantity}
              </span>
              <button
                type="button"
                disabled={quantity >= product.stock}
                onClick={() => handleQuantityChange(quantity + 1)}
                className="flex h-9 w-9 items-center justify-center hover:bg-slate-100 disabled:opacity-30"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>
          <p className="text-lg font-bold">{lineTotal.toFixed(2)}</p>
        </div>
      </div>
    </article>
  );
}
export default CartItem;
