import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import {
  selectCartSubtotal,
  selectCartTotal,
  selectShipping,
  selectTax,
} from '../../features/cart/cartSelectors';

function OrderSummary() {
  const subtotal = useAppSelector(selectCartSubtotal);
  const shipping = useAppSelector(selectShipping);
  const tax = useAppSelector(selectTax);

  const total = useAppSelector(selectCartTotal);

  return (
    <aside className="rounded-2xl border border-slate-200bg-white p-6">
      <h2 className="text-xl font-bold">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <SummaryRow label="Subtotal" value={subtotal} />
        <SummaryRow
          label="Shipping"
          value={shipping}
          free={shipping === 0 && subtotal > 0}
        />
        <SummaryRow label="Estimated tax" value={tax} />
        <div className="border-t border-slate-200 pt-4">
          <SummaryRow label="Total" value={total} emphasized />
        </div>
      </div>
      <Link
        to="/checkout"
        className="mt-6 block rounded-xl bg-slate-900 px-5 py-3 text-center font-semibold text-white hover:bg-blue-600"
      >
        Proceed to checkout
      </Link>
      <Link
        to="/products"
        className="mt-3 text-center block text-sm font-medium text-blue-600"
      >
        Continue Shopping
      </Link>
    </aside>
  );
}

interface SummaryRowProps {
  label: string;
  value: number;
  free?: boolean;
  emphasized?: boolean;
}

function SummaryRow({
  label,
  value,
  free = false,
  emphasized = false,
}: SummaryRowProps) {
  return (
    <div className="flex justify-between gap-4">
      <span className={emphasized ? 'font-bold' : 'text-slate-600'}>
        {label}
      </span>
      <span className={emphasized ? 'font-bold text-xl' : 'font-medium'}>
        {free ? 'FREE' : `$${value.toFixed(2)}`}
      </span>
    </div>
  );
}

export default OrderSummary;
