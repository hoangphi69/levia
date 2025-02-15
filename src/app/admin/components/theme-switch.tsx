'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuRadioItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeSwitch({
  ...props
}: React.ComponentProps<typeof Button>) {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button {...props} variant={'outline'} size={'icon'}>
          <Sun className="dark:hidden" />
          <Moon className="dark:block hidden" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right">
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light">
            Chế độ sáng
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Chế độ tối</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            Theo hệ thống
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
