'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import SmoothImage from './smooth-image';
import logo from '../../../public/logo/logo-text.svg';

export default function FooterContact() {
  return (
    <div className="flex flex-col items-start gap-6 md:gap-10">
      <SmoothImage src={logo} alt="Levia logo" className="max-w-20" />
      <h2 className="font-bold text-3xl text-foreground lg:text-4xl">
        Kết nối <br />
        với chúng tôi.
      </h2>
      <div className="flex items-center gap-6 md:gap-10">
        <Link
          className="text-sm lg:text-base uppercase btn-fill"
          href={'/contacts'}
        >
          Liên hệ ngay
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
        <span className="text-muted-foreground text-sm lg:text-base hover:text-foreground hover:underline transition-colors cursor-pointer">
          hoặc gọi{' '}
          <span
            onClick={() => {
              navigator.clipboard.writeText('84336036468');
              toast.success('Đã copy số điện thoại');
            }}
            className="font-semibold underline cursor-pointer"
          >
            +84 336 036 468
          </span>
        </span>
      </div>
    </div>
  );
}
