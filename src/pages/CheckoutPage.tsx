import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import OptimisticQuantity from '../components/cart/OptimisticQuantity';
import { selectCartItems } from '../features/cart/cartSelectors';
import CheckoutForm from '../components/checkout/CheckoutForm';
import CheckoutSummary from '../components/checkout/CheckoutSummary';

function CheckoutPage() {
  const items = useAppSelector(selectCartItems);

  if (!items.length) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
        <p className="mt-1 text-slate-500">
          Complete your shipping and payment information.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <CheckoutForm />
        <div>
          <div className="sticky top-24">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </section>
  );
}
export default CheckoutPage;
