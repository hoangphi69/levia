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
import { useForm } from '@/hooks/use-form';
import { login } from '@/lib/actions/auth';
import { LoginFormSchema } from '@/lib/definitions';
import { cn } from '@/lib/utils';

export function LoginForm({ ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const { errors, submit, pending } = useForm({
    schema: LoginFormSchema,
    action: login,
  });

  return (
    // TODO: Re-style the form
    <div className={cn('flex flex-col gap-6', props.className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Đăng nhập admin</CardTitle>
          <CardDescription>
            Đăng nhập vào tài khoản của bạn để tiếp tục.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <div className="flex flex-col gap-6">
              <div className="gap-2 grid">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="text"
                  placeholder="m@example.com"
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
                <Input
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
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
