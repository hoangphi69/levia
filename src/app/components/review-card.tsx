import type { ProductReview } from '@prisma/client';

type ReviewCard = Pick<
  ProductReview,
  'author' | 'comment' | 'rating' | 'image' | 'created_at'
>;

export default function ReviewCard({
  author,
  comment,
  rating,
  image,
  created_at,
}: ReviewCard) {
  return (
    <div className="hover:shadow-lg transition-shadow">
      <img className="block w-full max-h-40 object-cover" src={image} alt="" />
      <div className="space-y-4 bg-dark-1 p-6">
        <RatingStars rating={rating} />
        <p className="text-gray-1 text-h5">{comment}</p>
        <div className="flex justify-between">
          <span className="font-bold text-h6">{author}</span>
          <span className="font-light text-gray-1 text-h6">
            {created_at.toISOString()}
          </span>
        </div>
      </div>
    </div>
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => {
        if (index + 1 <= rating)
          return (
            <svg
              key={index}
              className="w-4 fill-accent-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
            >
              <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
            </svg>
          );
        return (
          <svg
            key={index}
            className="w-4 fill-gray-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
          >
            <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
          </svg>
        );
      })}
    </div>
  );
}
