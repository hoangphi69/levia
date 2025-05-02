import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Textarea } from '@/components/shadcn/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn/tooltip';
import { ProductMedia, Style } from '@prisma/client';
import { GripVertical, Trash2 } from 'lucide-react';
import { Reorder, useDragControls } from 'motion/react';
import ImageInput from './image-input';
import SelectInput from './select-input';
import StylePreview from './style-preview';

export default function ProductMediaItem({
  index,
  media,
  changeMediaURL,
  updateFileMap,
  changeMediaStyle,
  changeMediaTitle,
  changeMediaSubtitle,
  deleteMedia,
}: {
  index: number;
  media: ProductMedia;
  changeMediaURL: (blob: string) => void;
  updateFileMap: (blob: string, file: File) => void;
  changeMediaStyle: (style: Style) => void;
  changeMediaTitle: (title: string) => void;
  changeMediaSubtitle: (subtitle: string) => void;
  deleteMedia: () => void;
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item value={media} dragListener={false} dragControls={controls}>
      <div className="box-content gap-6 grid grid-cols-[max-content_repeat(3,1fr)] bg-background py-6 w-full min-h-[300px]">
        <div className="flex flex-col gap-4 pr-4 border-r">
          <span className="text-border font-mono text-7xl text-right">
            {index + 1}
          </span>

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
              <Button variant={'outline'} size={'icon'} onClick={deleteMedia}>
                <span className="sr-only">Xoá media</span>
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Xoá media</TooltipContent>
          </Tooltip>
        </div>
        <fieldset className="flex flex-col *:flex-1 gap-4">
          <ImageInput
            value={media.media_url}
            onChange={changeMediaURL}
            updateFileMap={updateFileMap}
          />
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <Label className="text-muted-foreground">
            Bố cục:
            <SelectInput value={media.style} onChange={changeMediaStyle} />
          </Label>

          <Label className="flex flex-col flex-1 text-muted-foreground">
            Preview:
            <StylePreview style={media.style} />
          </Label>
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <Label className="text-muted-foreground">
            Tiêu đề:
            <Input
              name="title"
              value={media.title ?? undefined}
              onChange={(e) => changeMediaTitle(e.target.value)}
              type="text"
              className="mt-2 text-foreground !text-base"
              placeholder="Thiết kế hiện đại, tinh tế"
              disabled={media.style === 'image_only'}
            />
          </Label>

          <Label className="flex flex-col flex-1 text-muted-foreground">
            Nội dung:
            <Textarea
              name="subtitle"
              value={media.subtitle ?? undefined}
              onChange={(e) => changeMediaSubtitle(e.target.value)}
              className="mt-2 h-full text-foreground !text-base"
              placeholder="Mô tả ngắn gọn, làm nổi bật những điểm mạnh chính của sản phẩm."
              disabled={media.style === 'image_only'}
            />
          </Label>
        </fieldset>
      </div>
    </Reorder.Item>
  );
}
