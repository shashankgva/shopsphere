import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import ProductGridSkeleton from '../components/product/ProductGridSkeleton';
import ProductToolbar, {
  type SortOption,
} from '../components/product/ProductToolbar';

import { useGetProductsQuery } from '../services/productsApi';
import { useDeferredValue, useMemo, useState, useTransition } from 'react';
import useDebounce from '../hooks/useDebounce';
import Pagination from '../components/product/Pagination';

const PAGE_SIZE = 12;

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') ?? '';

  const [search, setSearch] = useState(initialSearch);

  const [isPending, startTransition] = useTransition();

  const debouncedSearch = useDebounce(search, 400);

  const deferredSearch = useDeferredValue(debouncedSearch);

  const category = searchParams.get('category') ?? '';

  const page = Math.max(1, Number(searchParams.get('page')) || 1);

  const sort = (searchParams.get('sort') ?? 'default') as SortOption;

  const skip = (page - 1) * PAGE_SIZE;

  const sortConfig = useMemo(() => {
    switch (sort) {
      case 'price-low':
        return {
          sortBy: 'price' as const,
          order: 'asc' as const,
        };
      case 'price-high':
        return {
          sortBy: 'price' as const,
          order: 'desc' as const,
        };
      case 'title-asc':
        return {
          sortBy: 'title' as const,
          order: 'asc' as const,
        };
      case 'title-desc':
        return {
          sortBy: 'title' as const,
          order: 'desc' as const,
        };
      default:
        return {};
    }
  }, [sort]);

  /*
   * Normal Products
   */

  const standardQuery = useGetProductsQuery(
    {
      limit: PAGE_SIZE,
      skip,
      ...sortConfig,
    },
    {
      skip: Boolean(deferredSearch) || Boolean(category),
    },
  );

  /*
   * Search Products
   */

  const searchQuery = useGetProductsQuery(
    {
      query: deferredSearch,
      limit: PAGE_SIZE,
      skip,
    },
    {
      skip: !deferredSearch,
    },
  );

  /*
   * Category Products
   */

  const categoryQuery = useGetProductsQuery(
    {
      category,
      limit: PAGE_SIZE,
      skip,
    },
    {
      skip: !category || Boolean(deferredSearch),
    },
  );

  const activeQuery = deferredSearch
    ? searchQuery
    : category
      ? categoryQuery
      : standardQuery;
  const { data, isLoading, isError, refetch, isFetching } = activeQuery;

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;

  function updateSearchParams(
    updates: Record<string, string | undefined>,
  ): void {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  }

  function handleSearchChange(value: string) {
    setSearch(value);

    startTransition(() => {
      updateSearchParams({
        search: value || undefined,
        page: undefined,
      });
    });
  }

  function handleSortChange(value: SortOption) {
    startTransition(() => {
      updateSearchParams({
        sort: value === 'default' ? undefined : value,
        page: undefined,
      });
    });
  }

  function handlePageChange(nextPage: number) {
    startTransition(() => {
      updateSearchParams({
        page: nextPage === 1 ? undefined : String(nextPage),
      });
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <section>
      <PageHeader total={data?.total} />
      <ProductToolbar
        search={search}
        sort={sort}
        isPending={isPending}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />
      {isLoading ? (
        <ProductGridSkeleton />
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : data && data.products.length > 0 ? (
        <>
          <div
            className={
              isFetching
                ? 'opacity-60 transition-opacity'
                : 'opacity-100 transition-opacity'
            }
          >
            <ProductGrid products={data.products} />
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            isPending={isPending}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <EmptyState />
      )}
    </section>
  );
}

interface PageHeaderProps {
  total?: number;
}

function PageHeader({ total }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="mt-1 text-slate-500">
          Discover products from all categories
        </p>
      </div>
      {total !== undefined && (
        <p className="text-sm text-slate-500">{total} products</p>
      )}
    </div>
  );
}

interface ErrorStateProps {
  onRetry: () => void;
}

function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
      <h2 className="font-semibold text-red-800">Unable to load products</h2>
      <button
        className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white "
        type="button"
        onClick={onRetry}
      >
        Try Again
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
      <h2 className="text-lg font-semibold">No products found.</h2>
      <p className="mt-2 text-slate-500">Try another search or category</p>
    </div>
  );
}

export default ProductsPage;
