import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  min?: number;
  max: number;
  onChange: (quantity: number) => void;
}

function QuantitySelector({
  quantity,
  min = 1,
  max,
  onChange,
}: QuantitySelectorProps) {
  function decrease() {
    onChange(Math.max(min, quantity - 1));
  }
  function increase() {
    onChange(Math.min(max, quantity + 1));
  }
  return (
    <div className="inline-flex items-center overflow-hidden rounded-lg border border-slate-300">
      <button
        type="button"
        onClick={decrease}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className="flex h-11 w-11 items-center justify-center transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus size={17} />
      </button>
      <span className="flex h-11 min-w-12 items-center justify-center border-x border-slate-300 font-medium">
        {quantity}
      </span>
      <button
        type="button"
        onClick={increase}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className="flex h-11 w-11 items-center justify-center transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus size={17} />
      </button>
    </div>
  );
}
export default QuantitySelector;
