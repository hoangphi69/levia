'use client';

import Banner from '../components/banner';
import { SplitedTitle } from '../lib/utils';
import Link from 'next/link';
import { toast } from 'sonner';
import { sendEmail } from './actions';
import { useActionState } from 'react';

const FieldErrors = ({ messages }: { messages: string[] | undefined }) => {
  return (
    <>
      {messages?.map((message, index) => (
        <p key={index} className="text-destructive text-icon">
          <span className="text-lg material-symbols-outlined">error</span>
          <span className="text-sm">{message}</span>
        </p>
      ))}
    </>
  );
};

export default function Contacts() {
  const [error, action, pending] = useActionState(sendEmail, null);

  const banner = {
    title: 'Liên hệ',
    subtitle:
      'Cập nhật mới nhất, bài viết chia sẻ và các sự kiện không thể bỏ lỡ.',
    image: '../images/products-banner.png',
    breadcrumb: [
      {
        display: 'Trang chủ',
        href: '/',
      },
      {
        display: 'Liên hệ',
      },
    ],
  };

  return (
    <main>
      <Banner image={banner.image} breadcrumb={banner.breadcrumb}>
        <header className="flex-1 content-center md:content-end space-y-2">
          <h1 className="font-bold text-2xl text-center text-gradient md:text-left lg:text-4xl">
            {banner.title}
          </h1>
          <p className="md:max-w-[25ch] text-base text-center text-muted-foreground md:text-left lg:text-lg tracking-wide">
            {banner.subtitle}
          </p>
        </header>
      </Banner>

      <section className="gap-12 grid grid-cols-1 md:grid-cols-2 px-5 md:px-16 py-6 md:py-12 md:pt-16">
        <div className="space-y-10">
          <h2 className="font-bold text-3xl md:text-4xl">
            <SplitedTitle
              text={'Cùng nhau\nxây dựng nên thương hiệu'}
              line1ClassName="text-muted-foreground"
            />
          </h2>
          <ul className="flex flex-col gap-4 text-lg">
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={'https://www.facebook.com/Duyhoaltd/'}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors fill-current"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  height={18}
                  width={18}
                >
                  <title>Facebook</title>
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                </svg>
                <span>fanpage/levia.com</span>
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={'https://zalo.me/0369229368'}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors fill-current"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  height={20}
                  width={20}
                >
                  <title>Zalo</title>
                  <path d="M12.49 10.2722v-.4496h1.3467v6.3218h-.7704a.576.576 0 01-.5763-.5729l-.0006.0005a3.273 3.273 0 01-1.9372.6321c-1.8138 0-3.2844-1.4697-3.2844-3.2823 0-1.8125 1.4706-3.2822 3.2844-3.2822a3.273 3.273 0 011.9372.6321l.0006.0005zM6.9188 7.7896v.205c0 .3823-.051.6944-.2995 1.0605l-.03.0343c-.0542.0615-.1815.206-.2421.2843L2.024 14.8h4.8948v.7682a.5764.5764 0 01-.5767.5761H0v-.3622c0-.4436.1102-.6414.2495-.8476L4.8582 9.23H.1922V7.7896h6.7266zm8.5513 8.3548a.4805.4805 0 01-.4803-.4798v-7.875h1.4416v8.3548H15.47zM20.6934 9.6C22.52 9.6 24 11.0807 24 12.9044c0 1.8252-1.4801 3.306-3.3066 3.306-1.8264 0-3.3066-1.4808-3.3066-3.306 0-1.8237 1.4802-3.3044 3.3066-3.3044zm-10.1412 5.253c1.0675 0 1.9324-.8645 1.9324-1.9312 0-1.065-.865-1.9295-1.9324-1.9295s-1.9324.8644-1.9324 1.9295c0 1.0667.865 1.9312 1.9324 1.9312zm10.1412-.0033c1.0737 0 1.945-.8707 1.945-1.9453 0-1.073-.8713-1.9436-1.945-1.9436-1.0753 0-1.945.8706-1.945 1.9436 0 1.0746.8697 1.9453 1.945 1.9453z" />
                </svg>
                <span>0336 036 468</span>
              </Link>
            </li>
            <li
              className="inline-flex items-center gap-2 w-min text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText('84336036468');
                toast.success('Đã copy số điện thoại');
              }}
            >
              <span className="text-lg material-symbols-outlined">call</span>
              <span>0336 036 468</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold text-2xl">Gửi câu hỏi đến chúng tôi</h2>
          <form action={action} className="flex flex-col gap-4">
            <fieldset className="space-y-2">
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full input"
              />
              {error && <FieldErrors messages={error.email} />}
            </fieldset>

            <fieldset className="space-y-2">
              <input
                name="fullname"
                type="text"
                placeholder="Họ tên"
                required
                className="w-full input"
              />
              {error && <FieldErrors messages={error.fullname} />}
            </fieldset>

            <fieldset className="space-y-2">
              <textarea
                name="message"
                placeholder="Nội dung"
                rows={5}
                required
                className="w-full input"
              ></textarea>
              {error && <FieldErrors messages={error.message} />}
            </fieldset>

            <button type="submit" disabled={pending} className="btn-fill">
              {pending ? 'Đang gửi' : 'Gửi'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
