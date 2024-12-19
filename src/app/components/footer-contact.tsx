'use client';

import Link from 'next/link';
import { toast } from 'sonner';

export default function FooterContact() {
  return (
    <div className="flex flex-col items-start gap-4">
      <img src={'https://picsum.photos/100/40'} alt="" />
      <h2 className="font-bold text-3xl text-white">Kết nối với chúng tôi.</h2>
      <div className="flex items-center gap-4">
        <Link className="p-4 border" href={'/contacts'}>
          Liên hệ ngay
        </Link>
        <span>
          hoặc gọi{' '}
          <span
            onClick={() => {
              navigator.clipboard.writeText('84336036468');
              toast('Đã copy số điện thoại', {
                action: {
                  label: 'Ok',
                  onClick: () => {},
                },
              });
            }}
            className="underline cursor-pointer"
          >
            +84 336 036 468
          </span>
        </span>
      </div>
    </div>
  );
}
