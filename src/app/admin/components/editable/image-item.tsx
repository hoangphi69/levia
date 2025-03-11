import { Button } from '@/components/shadcn/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn/tooltip';
import SmoothImage from '@/components/wrapper/smooth-image';
import Zoom from '@/components/wrapper/zoom';
import { GripVertical, Trash2 } from 'lucide-react';
import { Reorder, useDragControls } from 'motion/react';

export default function ImageItem({
  image,
  index,
  onRemove,
}: {
  image: string;
  index: number;
  onRemove: (item: string) => void;
}) {
  const controls = useDragControls();

  return (
    <div
      data-index={index + 1}
      className="before:top-1/2 before:left-1/2 before:absolute relative before:content-center before:text-border border-2 border-dashed rounded-xl before:font-mono before:text-7xl before:content-[attr(data-index)] before:-translate-x-1/2 before:-translate-y-1/2"
    >
      <Reorder.Item
        value={image}
        dragListener={false}
        dragControls={controls}
        className="group relative h-[300px] select-none"
      >
        <Zoom>
          <SmoothImage
            src={image}
            width={640}
            height={400}
            alt=""
            className="rounded-xl w-full h-[300px]"
          />
        </Zoom>

        <div className="top-0 right-0 absolute flex flex-col gap-2 opacity-0 group-hover:opacity-100 p-2 transition-opacity">
          <Tooltip delayDuration={700}>
            <TooltipTrigger asChild>
              <Button
                variant={'outline'}
                size={'icon'}
                className="cursor-grab"
                onPointerDown={(e) => controls.start(e)}
              >
                <span className="sr-only">Đổi thứ tự</span>
                <GripVertical />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Di chuyển</TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={700}>
            <TooltipTrigger asChild>
              <Button
                variant={'outline'}
                size={'icon'}
                onClick={() => onRemove(image)}
              >
                <span className="sr-only">Xoá ảnh</span>
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Xoá ảnh</TooltipContent>
          </Tooltip>
        </div>
      </Reorder.Item>
    </div>
  );
}
