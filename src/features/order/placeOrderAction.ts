import type { CheckoutState } from '../../types/checkout';
import { validateCheckout } from '../checkout/checkoutAction';

export async function placeOrderAction(
  previousState: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  const validation = await validateCheckout(formData);

  if (!validation.success || !validation.data) {
    return validation;
  }
}
