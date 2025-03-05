import type { ProductMedia } from '@prisma/client';
import SmoothImage from '../../../../components/wrapper/smooth-image';
import MediumZoom from '../../../../components/wrapper/zoom';

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
        <article className="gap-5 md:gap-12 grid md:grid-cols-2 md:text-left text-center">
          <SmoothImage
            width={0}
            height={0}
            className="rounded-ss-[3rem] md:rounded-ss-[5rem] w-full h-[400px]"
            sizes="100vw"
            src={media_url}
            alt=""
          />

          <div className="place-self-center space-y-2 md:space-y-4">
            <h3 className="font-semibold text-2xl">{title}</h3>
            <p className="text-muted-foreground text-lg">{subtitle}</p>
          </div>
        </article>
      );

    case 'image_right':
      return (
        <article className="gap-5 md:gap-12 grid md:grid-cols-2 md:text-left text-center">
          <div className="place-self-center space-y-2 md:space-y-4">
            <h3 className="font-semibold text-2xl">{title}</h3>
            <p className="text-muted-foreground text-lg">{subtitle}</p>
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
          <div className="place-self-center space-y-2 md:space-y-4 max-w-[55ch]">
            <h3 className="font-semibold text-2xl">{title}</h3>
            <p className="text-muted-foreground text-lg">{subtitle}</p>
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
