'use client';

import useDebounce from '@/hooks/use-debounce';
import { useRouter } from 'next/navigation';

export default function SearchProduct({ className }: { className?: string }) {
  const router = useRouter();

  const routerSearch = (search: string) => {
    router.replace(`?${new URLSearchParams({ search })}`, {
      scroll: false,
    });
  };

  const debouncedRouterSearch = useDebounce(routerSearch, 300);

  return (
    <div
      className={`flex justify-between items-center border bg-input has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-ring text-muted-foreground has-[:focus-visible]:text-foreground ${className}`}
    >
      <input
        className="focus-visible:ring-0 w-full input"
        onChange={(e) => {
          debouncedRouterSearch(e.currentTarget.value);
        }}
        type="search"
        placeholder="Tìm kiếm"
      />
      <span className="px-4 py-3 cursor-pointer material-symbols-outlined">
        search
      </span>
    </div>
  );
}
