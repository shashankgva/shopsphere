import type { CheckoutState } from '../../types/checkout';
import { checkoutSchema } from './checkoutSchema';

export const initialCheckoutState: CheckoutState = {
  success: false,
  message: '',
  errors: {},
};

export async function checkoutAction(
  previousState: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  console.log('Previous state>>>', previousState);

  const billingSameAsShipping = formData.get('billingSameAsShipping') === 'on';

  const rawData = {
    email: formData.get('email'),
    shippingAddress: {
      firstName: formData.get('shipping.firstName'),
      lastName: formData.get('shipping.lastName'),
      addressLine1: formData.get('shipping.addressLine1'),
      addressLine2: formData.get('shipping.addressLine2'),
      city: formData.get('shipping.city'),
      state: formData.get('shipping.state'),
      postalCode: formData.get('shipping.postalCode'),
      country: formData.get('shipping.country'),
    },

    billingSameAsShipping,
    billingAddress: billingSameAsShipping
      ? undefined
      : {
          firstName: formData.get('billing.firstName'),
          lastName: formData.get('billing.lastName'),
          addressLine1: formData.get('billing.addressLine1'),
          addressLine2: formData.get('billing.addressLine2'),
          city: formData.get('billing.city'),
          state: formData.get('billing.state'),
          postalCode: formData.get('billing.postalCode'),
          country: formData.get('billing.country'),
        },
    deliveryMethod: formData.get('deliveryMethod'),
    paymentMethod: formData.get('paymentMethod'),
  };

  const result = checkoutSchema.safeParse(rawData);

  if (!result.success) {
    const flattened = result.error.flatten();

    return {
      success: false,
      message: 'Please correct the highlighted fields.',
      errors: flattened.fieldErrors,
    };
  }

  /*
    * Fake delay
    *
    * Later this becomes
    * 
    * createOrder()
    * payment processing
    * inventory validation

  */

  await new Promise((resolve) => setTimeout(resolve, 1500));

  const orderId = `ORD-${Date.now()}`;

  return {
    success: true,
    message: 'Your order has been placed successfully.',
    errors: {},
    orderId,
  };
}
