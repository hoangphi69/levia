'use client';

import { Button } from '@/components/shadcn/button';
import { HeartIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function RatingSelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const [rating, setRating] = useState(value);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => setRating(value), [value]);

  return (
    <div className="flex items-center mt-2 pr-4 pl-2 border rounded-md w-full max-w-[300px] h-9">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((score) => (
        <Button
          key={score}
          variant="ghost"
          className="group hover:bg-transparent px-1 py-2"
          onClick={() => {
            setRating(score);
            onChange(score);
          }}
          onMouseEnter={() => setHoverRating(score)}
          onMouseLeave={() => setHoverRating(0)}
        >
          <HeartIcon
            className={`transition-colors ${
              score <= rating
                ? 'text-accent-gold'
                : score <= hoverRating
                ? 'text-muted-foreground'
                : 'text-muted-foreground'
            }`}
            fill={
              score <= rating
                ? 'currentColor'
                : score <= hoverRating
                ? 'currentColor'
                : ''
            }
          />
        </Button>
      ))}

      <span className="ml-auto font-semibold text-base">{rating}.0</span>
    </div>
  );
}
