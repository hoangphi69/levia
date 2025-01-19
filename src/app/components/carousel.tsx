import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import SmoothImage from './smooth-image';
import Zoom from './zoom';

export default function CarouselProduct({
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
      <CarouselPrevious className="md:inline-flex left-0 hidden disabled:opacity-0 border-border w-12 h-12 -translate-x-1/2" />
      <CarouselNext className="md:inline-flex right-0 hidden disabled:opacity-0 border-border w-12 h-12 translate-x-1/2" />
    </Carousel>
  );
}
