function ProductDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="aspect-square rounded-2xl bg-slate-200" />

          <div className="mt-4 grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg bg-slate-200"
              />
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="h-4 w-24 rounded bg-slate-200" />

          <div className="h-10 w-3/4 rounded bg-slate-200" />

          <div className="h-5 w-32 rounded bg-slate-200" />

          <div className="h-9 w-40 rounded bg-slate-200" />

          <div className="h-24 w-full rounded bg-slate-200" />

          <div className="h-12 w-full rounded bg-slate-200" />

          <div className="h-12 w-full rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsSkeleton;
