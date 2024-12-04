export default function ProductCard({
  image,
  title,
  price,
}: {
  image: string;
  title: string;
  price: number;
}) {
  const formattedPrice = Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'vnd',
  }).format(price);

  return (
    <article>
      <img className="w-full" src={image} alt="" />
      <p className="mt-4 font-bold text-lg">{title}</p>
      <p>từ {formattedPrice}</p>
    </article>
  );
}
