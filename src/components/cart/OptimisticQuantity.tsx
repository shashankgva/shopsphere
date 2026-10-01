import { startTransition, useOptimistic, useState } from 'react';

interface OptimisticQuantityProps {
  initialQuantity: number;
}

function OptimisticQuantity({ initialQuantity }: OptimisticQuantityProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(quantity);

  async function saveQuantity(nextQuantity: number): Promise<number> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    throw new Error('Error updating quantity!');

    return nextQuantity;
  }

  function handleIncrease() {
    const nextQuantity = optimisticQuantity + 1;

    startTransition(async () => {
      setOptimisticQuantity(nextQuantity);

      const savedQuantity = await saveQuantity(nextQuantity);
      startTransition(() => setQuantity(savedQuantity));
    });
  }

  return (
    <div>
      <p>Quantity: {optimisticQuantity}</p>
      <button type="button" onClick={handleIncrease}>
        +
      </button>
    </div>
  );
}
export default OptimisticQuantity;
