export default function ReviewStats({ ratings }: { ratings: number[] }) {
  const percentages = ratingsPercentages(ratings);
  const overall = ratingOverall(ratings);
  const total = ratings.length;

  return (
    <div className="flex items-center gap-6">
      <div className="space-y-2">
        <p className="font-bold text-5xl md:text-6xl">
          {overall}
          <span className="text-h3">/5.0</span>
        </p>
        <p className="text-gray-1 text-h5">&#40;{total} đánh giá&#41;</p>
      </div>

      <div className="flex flex-col gap-0 w-full">
        {percentages.map((percentage, index, array) => (
          <div key={index} className="flex items-center gap-4 w-full">
            <div className="bg-black w-full h-2 overflow-hidden">
              <div
                style={{ width: `calc(${percentage * 100}% + 2px)` }}
                className="bg-white h-full"
              ></div>
            </div>
            <span className="text-gray-1 text-h6">
              {array.length - index}.0
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ratingsPercentages(ratings: number[]) {
  const totalRatings = ratings.length;
  const starCounts = [0, 0, 0, 0, 0];

  ratings.forEach((rating) => starCounts[starCounts.length - rating]++);

  const percentages = starCounts.map((count) => count / totalRatings);

  return percentages;
}

function ratingOverall(ratings: number[]) {
  return (ratings.reduce((acc, curr) => curr + acc) / ratings.length).toFixed(
    1
  );
}
