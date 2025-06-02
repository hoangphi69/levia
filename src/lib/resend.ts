import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const from = 'Levia <onboarding@resend.dev>'; //TODO: Config resend domain
const replyTo = 'bananana.test@gmail.com'; // TODO: Replace with customer service email

async function sendContactEmail(to: string, fullname: string, message: string) {
  return await resend.emails.send({
    from,
    to,
    replyTo,
    subject: 'Levia liên hệ khách hàng',
    // TODO: replace with meaningful email content
    text: `Họ tên: ${fullname}\nNội dung: ${message}`,
  });
}

async function sendResetPasswordEmail(to: string, link: string) {
  return await resend.emails.send({
    from,
    to,
    replyTo,
    subject: 'Cập nhật lại mật khẩu',
    // TODO: replace with meaningful email content
    text: `Truy cập vào đường dẫn sau để cập nhật lại mật khẩu: ${link}`,
  });
}

export { sendContactEmail, sendResetPasswordEmail };
