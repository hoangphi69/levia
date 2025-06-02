'use client';

import { sendEmailResetPassword } from '@/actions/auth';
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
import { SendEmailResetPasswordFormSchema } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function SendEmailResetPasswordForm({
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { errors, submit, pending } = useForm({
    schema: SendEmailResetPasswordFormSchema,
    action: sendEmailResetPassword,
  });

  useEffect(() => {
    if (errors?.message && errors?.success) {
      toast.success(errors.message);
      document.querySelector('form')?.reset();
    } else if (errors?.message && !errors.success) {
      toast.error(errors.message);
    }
  }, [errors]);

  return (
    <div className={cn('flex flex-col gap-6', props.className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Quên mật khẩu</CardTitle>
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
                  className={
                    errors?.email &&
                    'border-destructive bg-destructive-foreground'
                  }
                />
                {errors?.email && (
                  <small className="text-destructive">{errors.email}</small>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={pending}>
                Gửi email
              </Button>

              <Button
                type="button"
                variant={'outline'}
                className="w-full"
                asChild
              >
                <Link href={'/admin/login'}>Quay về đăng nhập</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
