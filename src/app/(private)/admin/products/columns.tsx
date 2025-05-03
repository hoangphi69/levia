'use client';

import { Badge } from '@/components/shadcn/badge';
import { Button } from '@/components/shadcn/button';
import { Checkbox } from '@/components/shadcn/checkbox';
import { formattedPrice } from '@/lib/utils/format';
import { ColumnDef } from '@tanstack/react-table';
import { Trash } from 'lucide-react';
import { DataTableHeader } from './data-table-header';
import ProductRemoveModal from './product-remove-modal';

export type Product = {
  id: string;
  model: string;
  title: string;
  price: number | null;
  category_title: string | undefined;
};

export const columns: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex place-content-center w-full">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected()}
          aria-label="Chọn tất cả"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex place-content-center w-full">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Chọn dòng"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'model',
    header: 'Model',
  },

  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableHeader column={column} title="Sản phẩm" />
    ),
  },

  {
    accessorKey: 'category_title',
    header: ({ column }) => (
      <DataTableHeader column={column} title="Danh mục" />
    ),
    cell: ({ row }) => {
      const value = row.getValue('category_title');
      if (value) return <Badge variant={'outline'}>{value as string}</Badge>;
      else return value;
    },
  },

  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableHeader
        column={column}
        title="Giá tiền"
        className="justify-end -mr-3"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right">{formattedPrice(row.getValue('price'))}</div>
    ),
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div
          className="w-full text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <ProductRemoveModal product={product}>
            <Button variant={'ghost'} className="group">
              <span className="sr-only">Xoá sản phẩm</span>
              <Trash className="group-hover:text-red-500 transition-colors" />
            </Button>
          </ProductRemoveModal>
        </div>
      );
    },
  },
];
