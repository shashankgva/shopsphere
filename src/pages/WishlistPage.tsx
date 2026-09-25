import { Heart } from 'lucide-react';
import { useAppSelector } from '../app/hooks';
import { selectWishlistItems } from '../features/wishlist/wishlistSelectors';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';

function WishlistPage() {
  const products = useAppSelector(selectWishlistItems);

  if (!products.length) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="rounded-full bg-slate-100 p-6">
          <Heart size={42} className="text-slate-400" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">Your wishlist is empty</h1>
        <p className="mt-2 text-slate-500">
          Save products you're interested in for later.
        </p>
        <Link
          to="/products"
          className="mt-6 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white"
        >
          Explore products
        </Link>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-7">
        <h1 className="text-3xl font-bold">Wishlist</h1>
        <p className="mt-1 text-slate-500">
          {products.length} saved{' '}
          {products.length === 1 ? 'product' : 'products'}
        </p>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
export default WishlistPage;
