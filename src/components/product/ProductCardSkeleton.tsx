function ProductCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="aspect-square bg-slate-200" />

      <div className="space-y-3 p-4">
        <div className="h-3 w-1/3 rounded bg-slate-200" />

        <div className="h-5 w-full rounded bg-slate-200" />

        <div className="h-5 w-3/4 rounded bg-slate-200" />

        <div className="h-4 w-1/4 rounded bg-slate-200" />

        <div className="h-7 w-1/2 rounded bg-slate-200" />

        <div className="h-10 w-full rounded bg-slate-200" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
