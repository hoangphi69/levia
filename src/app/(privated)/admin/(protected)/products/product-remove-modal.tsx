import { Button } from '@/components/shadcn/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn/tooltip';
import { Product } from './columns';
import _ from 'lodash';
import { removeProductAction } from './actions';

export default function ProductRemoveModal({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <Tooltip delayDuration={1500}>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>{children}</DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <span>Xoá sản phẩm</span>
        </TooltipContent>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Xác nhận xoá{' '}
            <span className="text-accent-gold">
              {_.lowerFirst(product.title)}
            </span>
          </DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không
            thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>Huỷ</Button>
          </DialogClose>
          <Button
            className="bg-destructive-foreground hover:bg-destructive border border-destructive text-destructive hover:text-foreground"
            onClick={() => removeProductAction(product)}
          >
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
