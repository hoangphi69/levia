'use client';

import { getAllArticles } from '@/actions/article';
import { Checkbox } from '@/components/shadcn/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableHeader } from '../_components/data-table/data-table-header';
import { Badge } from '@/components/shadcn/badge';
import { Button } from '@/components/shadcn/button';
import { Trash } from 'lucide-react';
import { formattedDate } from '@/lib/utils/format';
import Link from 'next/link';

export type Articles = Awaited<ReturnType<typeof getAllArticles>>[number];

export const columns: ColumnDef<Articles>[] = [
  {
    id: 'select',
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <div className="flex place-content-center w-full min-w-[40px]">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={() => table.toggleAllPageRowsSelected()}
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
  },

  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableHeader column={column} title="Tiêu đề" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2 max-w-[75ch]">
        {row.original.tags.map((tag, i) => (
          <Badge key={i} variant="outline" className="text-nowrap">
            {tag}
          </Badge>
        ))}
        <Link
          href={`articles/${row.original.id}`}
          className="hover:underline line-clamp-1"
        >
          {row.original.title}
        </Link>
      </div>
    ),
  },

  {
    accessorKey: 'description',
    header: 'Nội dung',
    cell: ({ row }) => (
      <div className="line-clamp-1">{row.original.description}</div>
    ),
  },

  {
    accessorKey: 'author',
    header: ({ column }) => (
      <DataTableHeader column={column} title="Người viết" />
    ),
  },

  {
    accessorKey: 'created_at',
    header: ({ column }) => <DataTableHeader column={column} title="Ngày" />,
    cell: ({ row }) => <div>{formattedDate(row.original.created_at, '/')}</div>,
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
          <Button variant={'ghost'} className="group">
            <span className="sr-only">Xoá bài viết</span>
            <Trash className="group-hover:text-red-500 transition-colors" />
          </Button>
        </div>
      );
    },
  },
];
