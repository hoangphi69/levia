'use client';

import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { useForm } from '@/hooks/use-form';
import { login } from '@/actions/auth';
import { LoginFormSchema } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import PasswordInput from '../../_components/components/password-input';

export function LoginForm({ ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const { errors, submit, pending } = useForm({
    schema: LoginFormSchema,
    action: login,
  });

  return (
    <div className={cn('flex flex-col gap-6', props.className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Đăng nhập admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <div className="flex flex-col gap-6">
              <div className="gap-2 grid">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  className={
                    errors?.email &&
                    'border-destructive bg-destructive-foreground'
                  }
                />
                {errors?.email && (
                  <small className="text-destructive">{errors.email}</small>
                )}
              </div>

              <div className="gap-2 grid">
                <Label htmlFor="password">Mật khẩu</Label>
                <PasswordInput
                  id="password"
                  name="password"
                  type="password"
                  className={
                    errors?.password &&
                    'border-destructive bg-destructive-foreground'
                  }
                />
                {errors?.password && (
                  <small className="text-destructive">{errors.password}</small>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={pending}>
                Đăng nhập
              </Button>

              <Button variant={'outline'} className="w-full" asChild>
                <Link href={'/admin/register'}>Đăng ký</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
