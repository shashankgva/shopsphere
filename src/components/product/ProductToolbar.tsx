import { Search } from 'lucide-react';

export type SortOption =
  | 'default'
  | 'price-low'
  | 'price-high'
  | 'rating-high'
  | 'title-asc'
  | 'title-desc';

interface ProductToolbarProps {
  search: string;
  sort: SortOption;
  isPending: boolean;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

function ProductToolbar({
  search,
  sort,
  isPending,
  onSearchChange,
  onSortChange,
}: ProductToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-md">
        <Search
          size={18}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
        />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search products..."
          className="w-full rounded-lg border border-slate-300 py-2.5 pr-4 pl-10 outline-none focus:border-blue-500 "
        />
      </div>
      <div className="flex items-center gap-3">
        {isPending && (
          <span className="text-sm text-blue-600">Updating...</span>
        )}

        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value as SortOption)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
        >
          <option value="default">Sort: Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating-high">Rating: High to Low</option>
          <option value="title-asc">Name: A-Z</option>
          <option value="title-desc">Name: Z-A</option>
        </select>
      </div>
    </div>
  );
}

export default ProductToolbar;
