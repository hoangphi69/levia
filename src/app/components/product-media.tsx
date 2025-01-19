import type { ProductMedia } from '@prisma/client';
import SmoothImage from './smooth-image';
import MediumZoom from './zoom';

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
  switch (style) {
    case 'image_left':
      return (
        <article className="gap-5 md:gap-12 grid md:grid-cols-2 text-center md:text-left">
          <SmoothImage
            width={0}
            height={0}
            className="rounded-ss-[3rem] md:rounded-ss-[5rem] w-full h-[400px]"
            sizes="100vw"
            src={media_url}
            alt=""
          />

          <div className="space-y-2 md:space-y-4 place-self-center">
            <h3 className="font-semibold text-2xl">{title}</h3>
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          </div>
        </article>
      );

    case 'image_right':
      return (
        <article className="gap-5 md:gap-12 grid md:grid-cols-2 text-center md:text-left">
          <div className="space-y-2 md:space-y-4 place-self-center">
            <h3 className="font-semibold text-2xl">{title}</h3>
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          </div>

          <SmoothImage
            width={0}
            height={0}
            className="rounded-ss-[3rem] md:rounded-ss-[5rem] w-full h-[400px]"
            sizes="100vw"
            src={media_url}
            alt=""
          />
        </article>
      );

    case 'image_bottom':
      return (
        <article className="gap-5 md:gap-6 grid text-center">
          <div className="space-y-2 md:space-y-4 max-w-[55ch] place-self-center">
            <h3 className="font-semibold text-2xl">{title}</h3>
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          </div>

          <SmoothImage
            width={0}
            height={0}
            className="rounded-ss-[3rem] md:rounded-ss-[5rem] w-full h-auto"
            sizes="100vw"
            src={media_url}
            alt=""
          />
        </article>
      );

    default:
      return (
        <article className="rounded-ss-[3rem] md:rounded-ss-[5rem] w-full overflow-hidden">
          <SmoothImage
            width={0}
            height={0}
            className="w-full h-auto"
            sizes="100vw"
            src={media_url}
            alt=""
          />
        </article>
      );
  }
}
