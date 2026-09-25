import { Heart, Search, ShoppingCart } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { selectCartItemCount } from '../../features/cart/cartSelectors';
import { selectWishlistCount } from '../../features/wishlist/wishlistSelectors';

function Header() {
  const cartItemCount = useAppSelector(selectCartItemCount);
  const wishlistCount = useAppSelector(selectWishlistCount);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl flex h-16 items-center gap-8 px-6">
        <Link
          to="/"
          className="shrink-0 text-2xl font-bold tracking-tight text-slate-900"
        >
          ShopSphere
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'font-medium text-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? 'font-medium text-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }
          >
            Products
          </NavLink>
        </nav>
        <div className="mx-auto hidden max-w-xl flex-1 md:block">
          <div className="relative">
            <Search
              className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
              size={19}
            />

            <input
              type="search"
              placeholder="Search Products..."
              className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pr-4 pl-10 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 "
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          >
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            aria-label="Shopping Cart"
            className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          >
            <ShoppingCart size={22} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center h-5 min-w-5 justify-center rounded-full bg-blue-600 px-1 text-xs font-semibold text-white">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Header;
