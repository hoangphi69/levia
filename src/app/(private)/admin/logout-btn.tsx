'use client';

import { Button } from '@/components/shadcn/button';
import { logout } from '@/lib/actions/auth';
import React from 'react';

export default function LogoutBtn() {
  return (
    <Button
      variant={'outline'}
      size={'icon'}
      onClick={logout}
      className="w-10 h-10"
    >
      Đăng xuất
    </Button>
  );
}
