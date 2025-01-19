'use server';

import { ContactFormSchema } from '../lib/types';
import { Resend } from 'resend';

export async function sendEmail(_state: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    fullname: formData.get('fullname'),
    message: formData.get('message'),
  };

  // Server-side validation
  const validated = ContactFormSchema.safeParse(data);

  if (!validated.success) {
    const error = validated.error.flatten().fieldErrors;
    console.log(error);
    return error;
  }

  // Send email
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'Levia <onboarding@resend.dev>',
    to: '69hoangphi69@gmail.com',
    replyTo: validated.data.email,
    subject: 'Levia liên hệ khách hàng',
    text: `Họ tên: ${validated.data.fullname}\nNội dung: ${validated.data.message}`,
  });
}
