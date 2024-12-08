import type { Product } from '@prisma/client';

type ProductCard = Pick<Product, 'title' | 'price'> & { image: string };

export default function ProductCard({ image, title, price }: ProductCard) {
  return (
    <article>
      <img className="w-full" src={image} alt="" />
      <p className="mt-4 font-bold text-lg">{title}</p>
      <p>từ {formattedPrice(price)}</p>
    </article>
  );
}

function formattedPrice(price: number | null) {
  if (!price) return 'N/A';

  return price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'vnd',
  });
}
