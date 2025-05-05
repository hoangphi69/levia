'use server';

import { deleteProductByModel } from '@/actions/product';
import { toast } from 'sonner';
import { Product } from './columns';

export const removeProductAction = async (product: Product) => {
  const result = await deleteProductByModel(product.model);
  if (result) {
    toast.success('Đã xoá sản phẩm.');
  } else toast.error('Xoá sản phẩm không thành công.');
};
