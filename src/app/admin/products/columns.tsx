'use client';

import { formattedPrice } from '@/app/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { DataTableHeader } from './data-table-header';

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
    cell: ({ row }) => (
      <Badge variant={'outline'}>{row.getValue('category_title')}</Badge>
    ),
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
        <DropdownMenu>
          <div className="w-full text-center">
            <DropdownMenuTrigger asChild>
              <Button variant={'ghost'}>
                <span className="sr-only">Tuỳ chọn</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <span className="text-muted-foreground">Tuỳ chọn</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Edit />
              <span>Sửa</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash />
              <span>Xoá</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
