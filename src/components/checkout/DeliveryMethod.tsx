function DeliveryMethod() {
  return (
    <fieldset>
      <legend className="text-lg font-semibold">Delivery Method</legend>
      <div className="mt-4 space-y-3">
        <label className="flex items-center justify-between cursor-pointer rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="deliveryMethod"
              value="standard"
              defaultChecked
            />
            <div>
              <p className="font-medium">Standard Delivery</p>
              <p className="text-sm text-slate-500">4-6 business days</p>
            </div>
          </div>
          <span className="font-medium">FREE</span>
        </label>
        <label className="flex items-center justify-between cursor-pointer rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <input type="radio" name="deliveryMethod" value="express" />
            <div>
              <p className="font-medium">Express Delivery</p>
              <p className="text-sm text-slate-500">1-2 business days</p>
            </div>
          </div>
          <span className="font-medium">$14.99</span>
        </label>
      </div>
    </fieldset>
  );
}
export default DeliveryMethod;
