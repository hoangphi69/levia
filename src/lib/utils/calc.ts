function calcRatingsPercentages(ratings: number[]) {
  const totalRatings = ratings.length;
  const starCounts = [0, 0, 0, 0, 0];

  ratings.forEach((rating) => starCounts[starCounts.length - rating]++);

  const percentages = starCounts.map((count) => count / totalRatings);

  return percentages;
}

function calcRatingOverall(ratings: number[]) {
  return (ratings.reduce((acc, curr) => curr + acc) / ratings.length).toFixed(
    1
  );
}

export { calcRatingsPercentages, calcRatingOverall };
