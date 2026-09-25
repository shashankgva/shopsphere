import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../services/productsApi';

const categories = [
  'Beauty',
  'Fragrances',
  'Furniture',
  'Groceries',
  'Laptops',
  'Smartphones',
];

function Sidebar() {
  const {
    data: categories,
    isLoading,
    isError,
    // error,
  } = useGetCategoriesQuery();

  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category');

  console.log(categories);

  return (
    <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white p-6 lg:block">
      <div className="sticky top-22">
        <h2 className="mb-4 font-semibold text-slate-900">Categories</h2>
        <nav className="flex flex-col gap-1">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 ${isActive ? 'bg-blue-50 font-medium text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`
            }
          >
            All Products
          </NavLink>
          {isLoading && (
            <p className="px-3 py-2 text-sm text-slate-400">
              Loading categories...
            </p>
          )}
          {isError && (
            <p className="px-3 py-2 text-sm text-red-500 ">
              Categories unavailable
            </p>
          )}
          {categories?.map((category) => {
            const isActive = activeCategory === category.slug;

            return (
              <Link
                key={category.slug}
                to={`/products?category=${category.slug}`}
                className={`rounded-lg px-3 py-2 text-sm transition ${isActive ? 'bg-blue-50 font-medium text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {category.name}
              </Link>
            );
          })}
        </nav>

        <div className="my-6 border-t border-slate-200" />
        <h2 className="mb-4 font-semibold text-slate-900">Price</h2>
        <div className="space-y-3 text-sm text-slate-600">
          <label htmlFor="" className="flex items-center gap-2">
            <input type="checkbox" />
            Under $50
          </label>
          <label htmlFor="" className="flex items-center gap-2">
            <input type="checkbox" />
            $50 - $100
          </label>
          <label htmlFor="" className="flex items-center gap-2">
            <input type="checkbox" />
            $100 - $500
          </label>
          <label htmlFor="" className="flex items-center gap-2">
            <input type="checkbox" />
            $500+
          </label>
        </div>
      </div>
    </aside>
  );
}
export default Sidebar;
