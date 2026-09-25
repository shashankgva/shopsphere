import { Star } from 'lucide-react';
import type { ProductReview } from '../../types/product';

interface ProductReviewsProps {
  reviews: ProductReview[];
}

function ProductReviews({ reviews }: ProductReviewsProps) {
  if (reviews.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <article
            key={`${review.reviewerEmail}-${index}`}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, star) => (
                <Star
                  key={star}
                  size={16}
                  className={
                    star < review.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-slate-300'
                  }
                />
              ))}
            </div>
            <p className="mt-4 text-slate-700">{review.comment}</p>
            <p className="mt-4 text-sm font-semibold">{review.reviewerName}</p>
            <time className="text-xs text-slate-400">
              {new Date(review.date).toLocaleDateString()}
            </time>
          </article>
        ))}
      </div>
    </section>
  );
}
export default ProductReviews;
