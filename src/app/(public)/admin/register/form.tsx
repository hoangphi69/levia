'use client';

import { register } from '@/actions/auth';
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
import { RegisterFormSchema } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import PasswordInput from '../../_components/components/password-input';

export function RegisterForm({
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { errors, submit, pending } = useForm({
    schema: RegisterFormSchema,
    action: register,
  });

  useEffect(() => {
    if (errors?.message && errors.success) {
      toast.success(errors.message);
      redirect(errors.redirect);
    } else if (errors?.message && !errors.success) {
      toast.error(errors.message);
    }
  }, [errors]);

  return (
    <div className={cn('flex flex-col gap-6', props.className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Đăng ký admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <div className="flex flex-col gap-6">
              <div className="gap-2 grid">
                <Label htmlFor="name">Tên</Label>
                <Input
                  name="name"
                  id="name"
                  type="name"
                  placeholder="lavie"
                  className={
                    errors?.name &&
                    'border-destructive bg-destructive-foreground'
                  }
                />
                {errors?.name && (
                  <small className="text-destructive">{errors.name}</small>
                )}
              </div>

              <div className="gap-2 grid">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="example@email.com"
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
                {/* <Input
                  id="password"
                  name="password"
                  type="password"
                  className={
                    errors?.password &&
                    'border-destructive bg-destructive-foreground'
                  }
                  /> */}
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

              <div className="gap-2 grid">
                <Label htmlFor="confirm_password">Nhập lại mật khẩu</Label>
                <PasswordInput
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  className={
                    errors?.confirm_password &&
                    'border-destructive bg-destructive-foreground'
                  }
                />
                {errors?.confirm_password && (
                  <small className="text-destructive">
                    {errors.confirm_password}
                  </small>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={pending}>
                Tạo tài khoản
              </Button>

              <Button variant={'outline'} className="w-full" asChild>
                <Link href={'/admin/login'}>Đăng nhập</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
