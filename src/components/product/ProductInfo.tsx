import { useState } from 'react';
import type { Product } from '../../types/product';
import {
  Heart,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  Undo2,
} from 'lucide-react';
import QuantitySelector from './QuantitySelector';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart } from '../../features/cart/cartSlice';
import { selectWishlistProductIds } from '../../features/wishlist/wishlistSelectors';
import { toggleWishlist } from '../../features/wishlist/wishlistSlice';

interface ProductInfoProps {
  product: Product;
}

function ProductInfo({ product }: ProductInfoProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  const isOutOfStock = product.stock === 0;

  const wishlistProductIds = useAppSelector(selectWishlistProductIds);

  const isWishlisted = wishlistProductIds.has(product.id);
  return (
    <div>
      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium text-blue-600">{product.category}</span>
        {product.brand && (
          <>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">{product.brand}</span>
          </>
        )}
      </div>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
        {product.title}
      </h1>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1">
          <Star size={18} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{product.rating.toFixed(1)}</span>
        </div>
        <span className="text-sm text-slate-500">
          {product.reviews.length} reviews
        </span>
        <span className="text-slate-300">|</span>
        <StockStatus stock={product.stock} />
      </div>
      <div className="mt-6 flex flex-wrap items-end gap-3">
        <span className="text-3xl font-bold text-slate-900">
          {discountedPrice.toFixed(2)}
        </span>
        {product.discountPercentage > 0 && (
          <>
            <span className="text-lg text-slate-400 line-through">
              {product.price.toFixed(2)}
            </span>
            <span className="rounded-full bg-green-100 px-2.5 py-1 text-sm font-semibold text-green-700">
              Save {product.discountPercentage.toFixed(0)}%
            </span>
          </>
        )}
      </div>
      <p className="leading-7 text-slate-600">{product.description}</p>
      {!isOutOfStock && (
        <>
          <div className="mt-7">
            <p className="mb-2 text-sm font-semibold text-slate-700">
              Quantity
            </p>
            <QuantitySelector
              quantity={quantity}
              max={product.stock}
              onChange={setQuantity}
            />
          </div>
          {quantity === product.stock && (
            <p className="text-sm text-red-600 font-medium">
              Maximum available quantity reached.
            </p>
          )}
        </>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={isOutOfStock}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          onClick={() => dispatch(addToCart({ product, quantity }))}
        >
          <ShoppingCart size={20} />
          {isOutOfStock ? 'Out of stock' : 'Add to cart'}
        </button>
        <button
          type="button"
          aria-label={
            isWishlisted
              ? `Remove ${product.title} from wishlist`
              : `Add ${product.title} to wishlist`
          }
          onClick={() => dispatch(toggleWishlist(product))}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          <Heart
            size={20}
            className={isWishlisted ? 'fill-red-500 text-red-500' : ''}
          />{' '}
          <span className="sm:hidden lg:inline">
            {isWishlisted ? 'Wishlisted' : 'Wishlist'}
          </span>
        </button>
      </div>
      <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        <InfoRow
          icon={<Truck size={20} />}
          title="Shipping"
          value={product.shippingInformation}
        />
        <InfoRow
          icon={<ShieldCheck size={20} />}
          title="Warranty"
          value={product.warrantyInformation}
        />
        <InfoRow
          icon={<Undo2 size={20} />}
          title="Returns"
          value={product.returnPolicy}
        />
      </div>
    </div>
  );
}

function StockStatus({ stock }: { stock: number }) {
  if (stock === 0) {
    return (
      <span className="text-sm font-medium text-red-600">Out of stock</span>
    );
  }

  if (stock <= 5) {
    return (
      <span className="text-sm font-medium text-orange-600">
        Only {stock} left
      </span>
    );
  }

  return <span className="text-sm font-medium text-green-600">In stock</span>;
}

interface InfoRowProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function InfoRow({ icon, value, title }: InfoRowProps) {
  return (
    <div className="flex gap-3 p-4">
      <div className="mt-0.5 text-slate-500">{icon}</div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-sm text-slate-500">{value}</p>
      </div>
    </div>
  );
}

export default ProductInfo;
