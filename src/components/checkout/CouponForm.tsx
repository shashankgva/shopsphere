import { useActionState, useOptimistic } from 'react';
import { applyCoupon } from '../../services/fakeCouponApi';
import type { CouponState } from '../../types/coupon';
import { useAppDispatch } from '../../app/hooks';
import { setCoupon } from '../../features/checkout/checkoutSlice';

const initialState: CouponState = {
  coupon: null,
  message: '',
};

function CouponForm() {
  const dispatch = useAppDispatch();
  async function couponAction(
    previousState: CouponState,
    formData: FormData,
  ): Promise<CouponState> {
    const code = String(formData.get('coupon') ?? '');

    if (!code.trim()) {
      return {
        coupon: previousState.coupon,
        message: 'Enter a coupon code.',
      };
    }

    try {
      const coupon = await applyCoupon(code);

      dispatch(setCoupon(coupon));

      return {
        coupon,
        message: `${coupon.code} applied successfully.`,
      };
    } catch (error) {
      return {
        coupon: previousState.coupon,
        message: 'Invalid coupon code.',
      };
    }
  }
  const [state, dispatchAction, isPending] = useActionState(
    couponAction,
    initialState,
  );
  const [optimisticCode, setOptimisticCode] = useOptimistic(
    state.coupon?.code ?? '',
  );

  async function formAction(formData: FormData) {
    const code = String(formData.get('coupon') ?? '')
      .trim()
      .toUpperCase();

    setOptimisticCode(code);

    dispatchAction(formData);
  }
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="font-bold">Coupon</h2>
      <form action={formAction} className="mt-4 flex gap-2">
        <input
          type="text"
          name="coupon"
          placeholder="Coupon code"
          className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {isPending ? 'Applying...' : 'Apply'}
        </button>
      </form>
      {optimisticCode && isPending && (
        <p className="mt-3 text-sm text-blue-600">
          Applying <strong>{optimisticCode}</strong>
        </p>
      )}
      {state.message && !isPending && (
        <p className="mt-3 text-sm text-blue-600">{state.message}</p>
      )}
    </div>
  );
}
export default CouponForm;
