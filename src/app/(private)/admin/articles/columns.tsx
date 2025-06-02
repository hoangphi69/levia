'use client';

import { getAllArticles } from '@/actions/article';
import { Checkbox } from '@/components/shadcn/checkbox';
import { ColumnDef } from '@tanstack/react-table';

export type Articles = Awaited<ReturnType<typeof getAllArticles>>[number];

export const columns: ColumnDef<Articles>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex place-content-center w-full">
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
    enableSorting: false,
    enableHiding: false,
  },
];
