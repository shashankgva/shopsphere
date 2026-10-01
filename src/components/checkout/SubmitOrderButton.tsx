import { LoaderCircle, Lock } from 'lucide-react';
import { useFormStatus } from 'react-dom';

function SubmitOrderButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {pending ? (
        <>
          <LoaderCircle size={19} className="animate-spin" />
          Placing Order...
        </>
      ) : (
        <>
          <Lock size={18} /> Place order
        </>
      )}
    </button>
  );
}
export default SubmitOrderButton;
