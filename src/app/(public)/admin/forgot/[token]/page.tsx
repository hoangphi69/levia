import { verifyResetPasswordToken } from '@/lib/utils/generators';
import { redirect } from 'next/navigation';
import SendEmailResetPasswordForm from '../form';
import ResetPasswordForm from './form';
import { Card } from '@/components/shadcn/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/alert';
import { AlertCircle } from 'lucide-react';
import { Dialog } from '@/components/shadcn/dialog';
import {
  DialogClose,
  DialogContent,
  DialogTitle,
} from '@radix-ui/react-dialog';

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  let form: React.ReactNode;
  const { token } = await params;
  const result = await verifyResetPasswordToken(token);

  if (result.valid) {
    form = (
      <ResetPasswordForm className="shadow-xl max-w-[400px]" token={token} />
    );
  } else if (result.expired) {
    form = (
      <div className="flex flex-col gap-4 w-max">
        <Alert variant="destructive" className="bg-destructive-foreground">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>Link đặt lại mật khẩu hết hiệu lực</AlertTitle>
          <AlertDescription>
            Vui lòng nhập lại email để nhận link đặt lại mật khẩu
          </AlertDescription>
        </Alert>
        <SendEmailResetPasswordForm className="shadow-xl w-[400px]" />
      </div>
    );
  } else {
    redirect('/admin/login');
  }

  return <div className="place-content-center *:mx-auto min-h-dvh">{form}</div>;
}
