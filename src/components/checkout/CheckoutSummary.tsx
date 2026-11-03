import { useAppSelector } from '../../app/hooks';
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartTotal,
  selectShipping,
  selectTax,
} from '../../features/cart/cartSelectors';
import {
  selectCheckoutTotal,
  selectDiscount,
} from '../../features/checkout/checkoutSelectors';

function CheckoutSummary() {
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const shipping = useAppSelector(selectShipping);
  const tax = useAppSelector(selectTax);
  const total = useAppSelector(selectCheckoutTotal);
  const discount = useAppSelector(selectDiscount);

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-bold">Order summary</h2>
      <div className="mt-6 space-y-5">
        {items.map(({ product, quantity }) => {
          const price = product.price * (1 - product.discountPercentage / 100);

          return (
            <div key={product.id} className="flex gap-3">
              <div className="relative h-16 w-16 shrink-0 rounded-lg bg-slate-100">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-contain p-1"
                />
                <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-700 px-1 text-xs text-white">
                  {quantity}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{product.title}</p>
                <p>${(price * quantity).toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 space-y-3 border-t border-slate-200 pt-5">
        <Row label="Subtotal" value={subtotal} />
        <Row label="Shipping" value={shipping} />
        <Row label="Tax" value={tax} />
        <div className="border-t border-slate-200 pt-3">
          <Row label="Total" value={total} strong />
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>

            <span>
              -$
              {discount.toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}

interface RowProps {
  label: string;
  value: number;
  strong?: boolean;
}

function Row({ label, value, strong = false }: RowProps) {
  return (
    <div className="flex justify-between gap-4">
      <span className={`${strong ? 'font-bold' : 'text-sm text-slate-600'}`}>
        {label}
      </span>
      <span
        className={`${strong ? 'text-xl font-bold' : 'text-sm font-medium'}`}
      >
        {value.toFixed(2)}
      </span>
    </div>
  );
}
export default CheckoutSummary;
