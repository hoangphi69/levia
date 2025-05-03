import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Textarea } from '@/components/shadcn/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn/tooltip';
import { ProductReview } from '@prisma/client';
import { GripVertical, Trash2 } from 'lucide-react';
import { Reorder, useDragControls } from 'motion/react';
import { DateTimePicker } from './datetime-picker';
import ImageInput from './image-input';
import RatingSelect from './rating-select';

export default function ProductReviewItem({
  index,
  review,
  deleteReview,
  updateFileMap,
  changeReviewImage,
  changeReviewRating,
  changeReviewAuthor,
  changeReviewComment,
  changeReviewDate,
}: {
  index: number;
  review: ProductReview;
  deleteReview: () => void;
  updateFileMap: (blob: string, file: File) => void;
  changeReviewImage: (blob: string) => void;
  changeReviewRating: (rating: number) => void;
  changeReviewAuthor: (author: string) => void;
  changeReviewComment: (comment: string) => void;
  changeReviewDate: (date: Date) => void;
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item value={review} dragListener={false} dragControls={controls}>
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
              <Button variant={'outline'} size={'icon'} onClick={deleteReview}>
                <span className="sr-only">Xoá review</span>
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Xoá review</TooltipContent>
          </Tooltip>
        </div>

        <fieldset className="flex flex-col *:flex-1 gap-4">
          <ImageInput
            value={review.image}
            onChange={changeReviewImage}
            updateFileMap={updateFileMap}
          />
        </fieldset>

        <fieldset className="gap-4 grid grid-cols-3 grid-rows-[max-content_1fr] col-span-2">
          <Label className="text-muted-foreground">
            User:
            <Input
              name="author"
              value={review.author ?? undefined}
              onChange={(e) => changeReviewAuthor(e.target.value)}
              type="text"
              className="mt-2 text-foreground !text-base"
              placeholder="Quan gamer"
            />
          </Label>

          <Label className="text-muted-foreground">
            Đánh giá:
            <RatingSelect value={review.rating} onChange={changeReviewRating} />
          </Label>

          <Label className="text-muted-foreground">
            Ngày tạo:
            <DateTimePicker
              value={review.created_at}
              onChange={changeReviewDate}
            />
          </Label>

          <Label className="flex flex-col col-span-3 text-muted-foreground">
            Nội dung:
            <Textarea
              name="comment"
              value={review.comment ?? undefined}
              onChange={(e) => changeReviewComment(e.target.value)}
              className="mt-2 h-full text-foreground !text-base"
              placeholder="Mô tả ngắn gọn, làm nổi bật những điểm mạnh chính của sản phẩm."
            />
          </Label>
        </fieldset>
      </div>
    </Reorder.Item>
  );
}
