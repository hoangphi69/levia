'use client';

import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { login } from '@/lib/actions/auth';
import { cn } from '@/lib/utils';
import { useActionState } from 'react';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    // TODO:
    // Apply client-side validation
    // Re-style the form
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="flex flex-col gap-6">
              <div className="gap-2 grid">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className={
                    state?.email &&
                    'border-destructive bg-destructive-foreground'
                  }
                  required
                />
                {state?.email && (
                  <small className="text-destructive">{state.email}</small>
                )}
              </div>

              <div className="gap-2 grid">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className={
                    state?.password &&
                    'border-destructive bg-destructive-foreground'
                  }
                />
                {state?.password && (
                  <small className="text-destructive">{state.password}</small>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={pending}>
                Đăng nhập
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
