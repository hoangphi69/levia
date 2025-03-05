import {
  calcRatingOverall,
  calcRatingsPercentages,
} from '../../../lib/utils/calc';

export default function ProductReviewStats({
  ratings,
  className,
}: {
  ratings: number[];
  className?: string;
}) {
  const percentages = calcRatingsPercentages(ratings);
  const overall = calcRatingOverall(ratings);
  const total = ratings.length;

  return (
    <div className={`flex items-end gap-12 ${className}`}>
      <div className="space-y-2">
        <p className="font-bold text-5xl md:text-6xl">
          {overall}
          <span className="text-2xl">&#47;5.0</span>
        </p>
        <p className="text-muted-foreground">&#40;{total} đánh giá&#41;</p>
      </div>

      <div className="flex flex-col gap-0 w-full">
        {percentages.map((percentage, index, array) => (
          <div key={index} className="flex items-center gap-4 w-full">
            <div className="bg-secondary w-full h-2 overflow-hidden">
              <div
                style={{ width: `calc(${percentage * 100}% + 2px)` }}
                className="bg-gradient-to-r h-full from-accent-gold to-accent-almond"
              ></div>
            </div>
            <span className="text-muted-foreground text-sm">
              {array.length - index}.0
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
