'use client';

import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/use-debounce';
import { Table } from '@tanstack/react-table';

interface DataTableSearchProps<TData> {
  table: Table<TData>;
}

export default function DataTableSearch<TData>({
  table,
}: DataTableSearchProps<TData>) {
  return (
    <Input
      placeholder="Tìm kiếm sản phẩm..."
      // value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
      onChange={useDebounce(
        (e) => table.getColumn('title')?.setFilterValue(e.target.value),
        300
      )}
      className="max-w-sm"
    />
  );
}
