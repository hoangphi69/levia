import type { Product } from '@prisma/client';
import SmoothImage from './smooth-image';

type ProductCard = Pick<Product, 'title' | 'price'> & { image: string };

export default function ProductCard({ image, title, price }: ProductCard) {
  return (
    <article>
      <div className="bg-secondary">
        <SmoothImage
          className="w-full"
          width={300}
          height={300}
          src={image}
          alt=""
        />
      </div>
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
