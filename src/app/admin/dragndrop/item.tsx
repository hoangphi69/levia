import SmoothImage from '@/components/wrapper/smooth-image';
import { Button } from '@/components/shadcn/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn/tooltip';
import { GripVertical, RefreshCcw, Trash2 } from 'lucide-react';
import { Reorder, useDragControls } from 'motion/react';

export default function Item({ url }: { url: string }) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={url}
      dragListener={false}
      dragControls={controls}
      className="group relative hover:shadow-lg h-[300px] select-none"
    >
      <SmoothImage
        src={url}
        width={640}
        height={400}
        alt=""
        className="rounded-xl size-full pointer-events-none"
      />

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
            <Button variant={'outline'} size={'icon'}>
              <span className="sr-only">Đổi ảnh</span>
              <RefreshCcw />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Đổi ảnh</TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={700}>
          <TooltipTrigger asChild>
            <Button
              variant={'outline'}
              size={'icon'}
              // onClick={() => setItems(items.filter((i) => i.id !== item.id))}
            >
              <span className="sr-only">Xoá ảnh</span>
              <Trash2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Xoá ảnh</TooltipContent>
        </Tooltip>
      </div>
    </Reorder.Item>
  );
}
