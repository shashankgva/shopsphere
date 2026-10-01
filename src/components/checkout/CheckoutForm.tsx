import { useActionState, useState } from 'react';
import {
  checkoutAction,
  initialCheckoutState,
} from '../../features/checkout/checkoutAction';
import FormField from './FormField';
import AddressFields from './AddressFields';
import DeliveryMethod from './DeliveryMethod';
import PaymentMethod from './PaymentMethod';
import SubmitOrderButton from './SubmitOrderButton';

function CheckoutForm() {
  const [state, formAction, isPending] = useActionState(
    checkoutAction,
    initialCheckoutState,
  );

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  if (state.success) {
    return <OrderSuccess orderId={state.orderId} />;
  }
  return (
    <form action={formAction} className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 ">
        <h2 className="text-xl font-bold">Contact</h2>
        <div className="mt-5">
          <FormField
            label="Email Address"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-bold">Shipping Address</h2>
        <div className="mt-5">
          <AddressFields prefix="shipping" />
        </div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            name="billingSameAsShipping"
            checked={billingSameAsShipping}
            onChange={(event) => setBillingSameAsShipping(event.target.checked)}
          />
          <span className="font-medium">
            Billing address is the same as shipping.
          </span>
        </label>
        {!billingSameAsShipping && (
          <div className="mt-6">
            <h2 className="mb-5 text-xl font-bold">Billing Address</h2>
            <AddressFields prefix="billing" />
          </div>
        )}
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <DeliveryMethod />
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <PaymentMethod />
      </section>
      {state.message && !state.success && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {state.message}
        </div>
      )}
      <SubmitOrderButton />
      {isPending && (
        <p className="text-center text-sm text-slate-500">
          Please don't close this page while your order is being processed.
        </p>
      )}
    </form>
  );
}

function OrderSuccess({ orderId }: { orderId: string }) {
  return (
    <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
      <div className="text-5xl">✓</div>
      <h2 className="mt-4 text-2xl font-bold text-green-900">
        Order confirmed
      </h2>
      <p className="mt-2 text-green-700">
        Your order has been placed successfully.
      </p>
      {orderId && (
        <p className="mt-4 font-mono text-sm font-semibold">{orderId}</p>
      )}
    </div>
  );
}
export default CheckoutForm;
