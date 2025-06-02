'use server';

import { ContactFormSchema } from '@/lib/definitions';
import { sendContactEmail } from '@/lib/resend';

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
  await sendContactEmail(
    validated.data.email,
    validated.data.fullname,
    validated.data.message
  );
}
