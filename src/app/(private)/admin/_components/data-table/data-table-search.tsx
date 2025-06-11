'use client';

import { Input } from '@/components/shadcn/input';
import useDebounce from '@/hooks/use-debounce';
import { Table } from '@tanstack/react-table';

interface DataTableSearchProps<TData> {
  table: Table<TData>;
}

export default function DataTableSearch<TData>({
  placeholder = '',
  table,
}: DataTableSearchProps<TData> & {
  placeholder?: string;
}) {
  return (
    <Input
      placeholder={placeholder}
      onChange={useDebounce(
        (e) => table.getColumn('title')?.setFilterValue(e.target.value),
        300
      )}
      className="max-w-sm"
    />
  );
}
