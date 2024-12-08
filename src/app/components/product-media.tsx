import type { ProductMedia } from '@prisma/client';

type ProductMediaComponent = Pick<
  ProductMedia,
  'title' | 'subtitle' | 'media_url' | 'style'
>;

export default function ProductMedia({
  title,
  subtitle,
  media_url,
  style,
}: ProductMediaComponent) {
  return (
    <div
      className={`grid md:gap-12 gap-5 text-center
        ${
          style === 'image_right'
            ? 'md:grid-cols-2 md:text-left'
            : style === 'image_left'
            ? 'md:grid-cols-2 md:text-right'
            : style === 'image_only'
            ? ''
            : '!gap-0'
        }`}
    >
      <div
        className={`max-w-[55ch] place-self-center space-y-1 md:space-y-4 ${
          style === 'image_left' ? 'md:order-2' : ''
        }`}
      >
        <h3 className="font-extrabold text-h3">{title}</h3>
        <p className="text-gray-1 text-h5">{subtitle}</p>
      </div>

      <div className="h-40 md:h-[25rem]">
        <img
          className="block w-full h-full object-center object-cover"
          src={media_url}
          alt=""
        />
      </div>
    </div>
  );
}
