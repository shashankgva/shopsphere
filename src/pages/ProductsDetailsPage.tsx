import { Link, useParams } from 'react-router-dom';
import {
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
} from '../services/productsApi';
import ProductDetailsSkeleton from '../components/product/ProductDetailSkeleton';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductSpecifications from '../components/product/ProductSpecifications';
import { Suspense, lazy } from 'react';
import ProductGridSkeleton from '../components/product/ProductGridSkeleton';
import ProductGrid from '../components/product/ProductGrid';

const ProductReviews = lazy(
  () => import('../components/product/ProductReviews'),
);

function ProductsDetailsPage() {
  const { productId } = useParams<{ productId: string }>();

  const id = Number(productId);

  const {
    data: product,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetProductByIdQuery(id, { skip: !Number.isFinite(id) });

  console.log(product, isLoading, isFetching, isError, error, refetch);

  if (!Number.isFinite(id)) {
    return (
      <ProductError
        title="Invalid Product"
        message="The product ID is invalid."
      />
    );
  }

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (isError || !product) {
    return (
      <ProductError
        title="Product unavailable"
        message="We couldnt load this product."
        onRetry={refetch}
      />
    );
  }

  return (
    <section>
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
        <Link to="/products" className="hover:text-blue-600">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span>{product.category}</span>
        <span className="mx-2">/</span>
        <span className="text-slate-900">{product.title}</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} title={product.title} />
        <ProductInfo product={product} />
      </div>
      <ProductSpecifications product={product} />
      <Suspense
        fallback={
          <div className="mt-12 rounded-xl bg-slate-100 p-8 text-slate-500">
            Loading reviews...
          </div>
        }
      >
        <ProductReviews reviews={product.reviews} />
      </Suspense>
      <RelatedProducts
        category={product.category}
        currentProductId={product.id}
      />
    </section>
  );
}

interface ProductErrorProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

function ProductError({ title, message, onRetry }: ProductErrorProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-10 text-center">
      <h1 className="text-xl font-bold text-red-800">{title}</h1>
      <p className="mt-2 text-red-600">{message}</p>
      <div className="mt-5 flex justify-between gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white"
          >
            Try again
          </button>
        )}
        <Link
          to="/products"
          className="rounded-lg border border-red-300 px-4 py-2 font-medium text-red-700"
        >
          Back to products
        </Link>
      </div>
    </div>
  );
}

interface RelatedProductsProps {
  category: string;
  currentProductId: number;
}

function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  const { data, isLoading, isError } = useGetProductsByCategoryQuery({
    category,
    limit: 5,
    skip: 0,
  });

  if (isLoading) {
    return (
      <section className="mt-12">
        <h2 className="mb-5 text-2xl font-bold">You may also like</h2>
        <ProductGridSkeleton />
      </section>
    );
  }

  if (isError || !data) return null;

  const products = data.products
    .filter((product) => product.id !== currentProductId)
    .slice(0, 4);

  if (!products.length) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-5 text-2xl font-bold">You may also like</h2>
      <ProductGrid products={products} />
    </section>
  );
}

export default ProductsDetailsPage;
