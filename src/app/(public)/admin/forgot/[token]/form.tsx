'use client';

import { resetPassword } from '@/actions/auth';
import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { Label } from '@/components/shadcn/label';
import { useForm } from '@/hooks/use-form';
import { ResetPasswordFormSchema } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import PasswordInput from '../../../_components/components/password-input';

export default function ResetPasswordForm({
  token,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { token: string }) {
  const { errors, submit, pending } = useForm({
    schema: ResetPasswordFormSchema,
    action: resetPassword,
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
          <CardTitle className="text-2xl">Cập nhật mật khẩu</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <div className="flex flex-col gap-6">
              <input type="hidden" name="token" value={token} />
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

              <br />

              <Button type="submit" className="w-full" disabled={pending}>
                Cập nhật mật khẩu
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
