import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart } from '../../features/cart/cartSlice';
import { selectWishlistProductIds } from '../../features/wishlist/wishlistSelectors';
import { toggleWishlist } from '../../features/wishlist/wishlistSlice';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const wishlistProductIds = useAppSelector(selectWishlistProductIds);

  const isWishlisted = wishlistProductIds.has(product.id);

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover: -translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-contain p-5 transition duration-300 group-hover:scale-105"
          />
        </Link>
        <button
          type="button"
          aria-label={
            isWishlisted
              ? `Remove ${product.title} from wishlist`
              : `Add ${product.title} to wishlist`
          }
          onClick={() => dispatch(toggleWishlist(product))}
          className="absolute top-3 right-3 rounded-full bg-white p-2 shadow-sm transition hover:bg-slate-100"
        >
          <Heart
            size={18}
            className={isWishlisted ? 'fill-red-500 text-red-500' : ''}
          />
        </button>

        {product.discountPercentage > 0 && (
          <span className="absolute top-3 left-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="mb-1 text-xs font-medium tracking-wide text-slate-500 uppercase">
          {product.category}
        </p>
        <Link to={`/products/${product.id}`}>
          <h2 className="line-clamp-2 min-h-12 font-semibold text-slate-900 hover:text-blue-600">
            {product.title}
          </h2>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">
            {product.rating.toFixed(1)}
          </span>
        </div>
        <div className="mt-4 flex items-end gap-2">
          <span className="text-xl font-bold">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-slate-400 line-through">
              {product.price.toFixed(2)}
            </span>
          )}
        </div>
        {product.stock === 0 && (
          <span className="text-sm font-semibold text-red-500">
            Out of stock
          </span>
        )}

        {product.stock < 5 && (
          <span className="text-sm font-semibold text-red-400">
            Only {product.stock} left
          </span>
        )}
        {product.stock > 5 && (
          <span className="text-sm font-semibold text-green-500">In stock</span>
        )}

        {product.stock !== 0 && (
          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600"
            disabled={product.stock === 0}
            onClick={() => dispatch(addToCart({ product, quantity: 1 }))}
          >
            <ShoppingCart size={18} />{' '}
            {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
          </button>
        )}
      </div>
    </article>
  );
}
export default ProductCard;
