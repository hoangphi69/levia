import type { Product } from '@prisma/client';
import SmoothImage from '../../../components/wrapper/smooth-image';
import { formattedPrice } from '../../lib/utils/format';

type ProductCard = Pick<Product, 'title' | 'price'> & { image: string };

export default function ProductCard({ image, title, price }: ProductCard) {
  return (
    <article className="flex flex-col w-full h-full">
      <SmoothImage
        className="bg-secondary mb-4 rounded-ss-[3rem] w-full aspect-square"
        width={300}
        height={300}
        src={image}
        alt=""
      />
      <p className="font-bold text-lg line-clamp-2">{title}</p>
      <p className="text-muted-foreground">từ {formattedPrice(price)}</p>
    </article>
  );
}
