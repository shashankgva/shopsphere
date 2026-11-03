import type { ZodError } from 'zod';
import type { CheckoutErrors, CheckoutState } from '../../types/checkout';
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
  return validateCheckout(formData);
}

export async function validateCheckout(
  formData: FormData,
): Promise<CheckoutState> {
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
    return {
      success: false,
      message: 'Please correct the highlighted fields.',
      errors: flattenErrors(result.error),
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

  const values = result.data;

  return {
    success: true,
    message: 'Checkout information is valid.',
    errors: {},
    data: {
      email: values.email,
      shippingAddress: values.shippingAddress,
      billingAddress: values.billingSameAsShipping
        ? values.shippingAddress
        : values.billingAddress,
      deliveryMethod: values.deliveryMethod,
      paymentMethod: values.paymentMethod,
    },
  };
}

function flattenErrors(error: ZodError) {
  const errors: CheckoutErrors = {};

  for (const issue of error.issues) {
    const path = issue.path.join('.');

    if (path && !errors[path]) {
      errors[path] = issue.message;
    }
  }

  return errors;
}
