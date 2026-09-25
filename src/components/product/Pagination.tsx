interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isPending: boolean;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  isPending,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }
  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        type="button"
        disabled={currentPage === 1 || isPending}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>
      <span className="text-sm text-slate-600">
        {' '}
        Page <strong>{currentPage}</strong>
        {' of '} <strong>{totalPages}</strong>
      </span>
      <button
        type="button"
        disabled={currentPage === totalPages || isPending}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
export default Pagination;
