import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shadcn/carousel';
import SmoothImage from '../../../../components/wrapper/smooth-image';
import Zoom from '../../../../components/wrapper/zoom';

export default function ProductCarousel({
  images,
}: {
  images: string[] | undefined;
}) {
  return (
    <Carousel>
      <div className="border rounded-ss-[3rem] md:rounded-ss-[5rem] overflow-hidden">
        <CarouselContent className="-ml-0">
          {images?.map((image, index) => (
            <CarouselItem key={index} className="pl-0">
              <Zoom zoomImg={{ src: image }}>
                <SmoothImage
                  src={image}
                  width={500}
                  height={400}
                  className="bg-secondary w-full h-[400px]"
                  alt=""
                />
              </Zoom>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
      <CarouselPrevious className="hidden md:inline-flex left-0 disabled:opacity-0 border-border w-12 h-12 -translate-x-1/2" />
      <CarouselNext className="hidden md:inline-flex right-0 disabled:opacity-0 border-border w-12 h-12 translate-x-1/2" />
    </Carousel>
  );
}
