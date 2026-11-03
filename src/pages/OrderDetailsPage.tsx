import { CheckCircle2, Package } from 'lucide-react';

import { Link, Navigate, useLocation, useParams } from 'react-router-dom';

import type { Order } from '../types/order';

function OrderDetailsPage() {
  const { orderId } = useParams<{
    orderId: string;
  }>();

  const location = useLocation();

  const order = (
    location.state as {
      order?: Order;
    } | null
  )?.order;

  if (!order) {
    return <Navigate to="/products" replace />;
  }

  return (
    <section className="mx-auto max-w-4xl">
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 size={52} className="mx-auto text-green-600" />

        <h1 className="mt-4 text-3xl font-bold text-green-900">
          Order confirmed
        </h1>

        <p className="mt-2 text-green-700">Thank you for your order.</p>

        <p className="mt-4 font-mono text-sm font-semibold">{orderId}</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-2">
            <Package size={20} />

            <h2 className="text-lg font-bold">Order details</h2>
          </div>

          <dl className="mt-5 space-y-4">
            <Row label="Status" value={order.status} />

            <Row label="Email" value={order.email} />

            <Row label="Delivery" value={order.deliveryMethod} />

            <Row label="Payment" value={order.paymentMethod} />

            <Row
              label="Placed"
              value={new Date(order.createdAt).toLocaleString()}
            />
          </dl>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold">Total</h2>

          <dl className="mt-5 space-y-4">
            <MoneyRow label="Subtotal" value={order.subtotal} />

            <MoneyRow label="Shipping" value={order.shipping} />

            <MoneyRow label="Tax" value={order.tax} />

            <div className="border-t border-slate-200 pt-4">
              <MoneyRow label="Total" value={order.total} strong />
            </div>
          </dl>
        </section>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/products"
          className="inline-block rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-blue-600"
        >
          Continue shopping
        </Link>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-500">{label}</dt>

      <dd className="font-medium capitalize">{value}</dd>
    </div>
  );
}

function MoneyRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: number;
  strong?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className={strong ? 'font-bold' : 'text-slate-500'}>{label}</dt>

      <dd className={strong ? 'text-xl font-bold' : 'font-medium'}>
        ${value.toFixed(2)}
      </dd>
    </div>
  );
}

export default OrderDetailsPage;
