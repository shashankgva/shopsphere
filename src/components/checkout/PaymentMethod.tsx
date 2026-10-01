import { CreditCard, PackageCheck } from 'lucide-react';

function PaymentMethod() {
  return (
    <fieldset>
      <legend className="text-lg font-semibold">Payment method</legend>
      <div className="mt-4 space-y-3">
        <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-slate-200 p-4">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            defaultChecked
          />
          <CreditCard size={22} className="text-slate-500" />
          <div>
            <p className="font-medium">Credit / Debit card</p>
            <p className="text-sm text-slate-500">
              Payment will be simulated in this project.
            </p>
          </div>
        </label>
        <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-slate-200 p-4">
          <input type="radio" name="paymentMethod" value="cod" />
          <PackageCheck size={22} className="text-slate-500" />
          <div>
            <p className="font-medium">Cash on delivery</p>
            <p className="text-sm text-slate-500">
              Pay when your order arrives.
            </p>
          </div>
        </label>
      </div>
    </fieldset>
  );
}
export default PaymentMethod;
