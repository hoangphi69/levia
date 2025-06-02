import { deleteProductByModel } from '@/actions/product';
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
import _ from 'lodash';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { Product } from './columns';

export default function ProductRemoveModal({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  const [state, action] = useActionState(
    async () => await deleteProductByModel(product.model),
    null
  );

  useEffect(() => {
    if (!state) return;
    if (state.success) toast.success('Xoá sản phẩm thành công.');
    else toast.error('Xoá sản phẩm không thành công.');
  }, [state]);

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
          <form action={action}>
            <Button
              className="bg-destructive-foreground hover:bg-destructive border border-destructive text-destructive hover:text-foreground"
              type="submit"
            >
              Xác nhận
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
