'use client';

import type { ProductReview } from '@prisma/client';
import SmoothImage from './smooth-image';
import Zoom from './zoom';
import { formattedRelativeTime } from '../lib/utils';

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
    <article className="bg-secondary hover:shadow-lg transition-shadow">
      <Zoom zoomImg={{ src: image }}>
        <SmoothImage
          className="w-full max-h-[250px]"
          width={400}
          height={250}
          src={image}
          alt=""
        />
      </Zoom>
      <div className="relative z-10 space-y-4 bg-secondary -mt-[3rem] p-6 border rounded-se-[3rem]">
        <RatingStars rating={rating} />
        <p className="text-base">{comment}</p>
        <div className="flex justify-between">
          <span className="font-bold text-muted-foreground text-sm">
            {author}
          </span>
          <span className="font-light text-muted-foreground text-sm">
            {formattedRelativeTime(created_at)}
          </span>
        </div>
      </div>
    </article>
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div
      aria-label={`Comment with ${rating} stars rating`}
      className="flex gap-1"
    >
      {[...Array(5)].map((_, index) => {
        if (index + 1 <= rating)
          return (
            <span
              key={index}
              className="text-accent-gold text-lg leading-4 material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
          );
        return (
          <span
            key={index}
            className="text-border text-lg leading-4 material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
        );
      })}
    </div>
  );
}
