import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

export default function PasswordInput({
  ...props
}: React.ComponentPropsWithoutRef<'input'>) {
  const [hidden, setHidden] = useState(true);

  return (
    <div className="relative">
      <Input {...props} type={hidden ? 'password' : 'text'} />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setHidden((prev) => !prev)}
      >
        {hidden ? (
          <>
            <span className="sr-only">Hiện mật khẩu</span>
            <Eye />
          </>
        ) : (
          <>
            <span className="sr-only">Ẩn mật khẩu</span>
            <EyeOff />
          </>
        )}
      </Button>
    </div>
  );
}
