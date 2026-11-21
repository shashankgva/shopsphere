import { useActionState, useState } from 'react';
import {
  checkoutAction,
  initialCheckoutState,
  validateCheckout,
} from '../../features/checkout/checkoutAction';
import FormField from './FormField';
import AddressFields from './AddressFields';
import DeliveryMethod from './DeliveryMethod';
import PaymentMethod from './PaymentMethod';
import SubmitOrderButton from './SubmitOrderButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../../features/cart/cartSelectors';
import { useCreateOrderMutation } from '../../services/ordersApi';
import type { CheckoutState } from '../../types/checkout';
import { clearCart } from '../../features/cart/cartSlice';
import { resetCheckout } from '../../features/checkout/checkoutSlice';
import { selectCoupon } from '../../features/checkout/checkoutSelectors';
import type { CreateOrderRequest } from '../../types/orderApi';

function CheckoutForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector(selectCartItems);
  const coupon = useAppSelector(selectCoupon);

  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation();

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  async function placeOrderAction(
    previousState: CheckoutState,
    formData: FormData,
  ): Promise<CheckoutState> {
    const validation = await validateCheckout(formData);

    if (!validation.success || !validation.data) {
      return validation;
    }
    console.log('cartItems>>>', cartItems);
    if (cartItems.length === 0) {
      return {
        success: false,
        message: 'Your cart is empty.',
        errors: {},
      };
    }

    const request = {
      items: cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      shippingAddress: {
        ...validation.data.shippingAddress,
        email: validation.data.email,
      },
      deliveryMethod: validation.data.deliveryMethod,
      paymentMethod: validation.data.paymentMethod,
      couponCode: coupon ?? undefined,
    } satisfies CreateOrderRequest;

    try {
      const order = await createOrder(request).unwrap();

      dispatch(clearCart());
      dispatch(resetCheckout());
      navigate(`/orders/${order.id}`, { replace: true });

      return {
        success: true,
        message: 'Order created successfully.',
        errors: {},
        data: validation.data,
      };
    } catch (error) {
      console.error('Order creation failed.', error);
      return {
        success: false,
        message: 'We couldnt place your order. Please try again.',
        errors: {},
      };
    }
  }

  const [state, formAction, isPending] = useActionState(
    placeOrderAction,
    initialCheckoutState,
  );

  return (
    <form action={formAction} className="space-y-8" noValidate>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 ">
        <h2 className="text-xl font-bold">Contact</h2>
        <div className="mt-5">
          <FormField
            label="Email Address"
            name="email"
            type="email"
            required
            autoComplete="email"
            error={state.errors.email}
          />
        </div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-bold">Shipping Address</h2>
        <div className="mt-5">
          <AddressFields prefix="shipping" errors={state.errors} />
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
            <AddressFields prefix="billing" errors={state.errors} />
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

export default CheckoutForm;
