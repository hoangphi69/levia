import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table } from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex justify-between items-center">
      <div className="lg:flex items-center space-x-2 hidden">
        <p className="font-medium text-sm">Số lượng dòng</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="w-[70px] h-8">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <div className="text-muted-foreground text-sm">
          <span>{`Chọn ${
            table.getFilteredSelectedRowModel().rows.length
          } trên ${table.getFilteredRowModel().rows.length} dòng.`}</span>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="lg:flex hidden p-0 w-8 h-8"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Trang đầu</span>
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          className="p-0 w-8 h-8"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Trang trước</span>
          <ChevronLeft />
        </Button>
        <div className="flex justify-center items-center w-20 font-medium text-sm">
          {table.getState().pagination.pageIndex + 1} {'/'}
          {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          className="p-0 w-8 h-8"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Trang tiếp</span>
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          className="lg:flex hidden p-0 w-8 h-8"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Trang cuối</span>
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
}
