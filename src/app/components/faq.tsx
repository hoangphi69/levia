'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { toast } from 'sonner';

export default function FAQ() {
  const QnAs = [
    {
      q: 'Tôi có thể mua sản phẩm ở đâu?',
      a: "Bạn có thể mua sản phẩm của chúng tôi thông qua trang web chính thức hoặc tại các đại lý phân phối uy tín trên toàn quốc. Danh sách các đại lý có thể được tìm thấy trong phần 'Liên Hệ' hoặc 'Đại Lý' trên trang web",
    },
    {
      q: 'Sản phẩm bếp điện có tiết kiệm năng lượng không?',
      a: "Bạn có thể mua sản phẩm của chúng tôi thông qua trang web chính thức hoặc tại các đại lý phân phối uy tín trên toàn quốc. Danh sách các đại lý có thể được tìm thấy trong phần 'Liên Hệ' hoặc 'Đại Lý' trên trang web",
    },
    {
      q: 'Chính sách bảo hành sản phẩm như thế nào?',
      a: "Bạn có thể mua sản phẩm của chúng tôi thông qua trang web chính thức hoặc tại các đại lý phân phối uy tín trên toàn quốc. Danh sách các đại lý có thể được tìm thấy trong phần 'Liên Hệ' hoặc 'Đại Lý' trên trang web",
    },
    {
      q: 'Hỗ trợ kỹ thuật với sản phẩm?',
      a: "Bạn có thể mua sản phẩm của chúng tôi thông qua trang web chính thức hoặc tại các đại lý phân phối uy tín trên toàn quốc. Danh sách các đại lý có thể được tìm thấy trong phần 'Liên Hệ' hoặc 'Đại Lý' trên trang web",
    },
    {
      q: 'Làm thế nào để vệ sinh và bảo dưỡng bếp điện?',
      a: "Bạn có thể mua sản phẩm của chúng tôi thông qua trang web chính thức hoặc tại các đại lý phân phối uy tín trên toàn quốc. Danh sách các đại lý có thể được tìm thấy trong phần 'Liên Hệ' hoặc 'Đại Lý' trên trang web",
    },
  ];

  return (
    <section className="grid grid-cols-2 p-4">
      <div className="flex flex-col items-start gap-4">
        <img src={'https://picsum.photos/100/40'} alt="" />
        <h2 className="font-bold text-3xl text-white">
          Kết nối với chúng tôi.
        </h2>
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

      <Accordion type="single" collapsible className="px-4 border">
        {QnAs.map((item, index) => (
          <AccordionItem key={index} value={`item${index}`}>
            <AccordionTrigger className="font-bold">{item.q}</AccordionTrigger>
            <AccordionContent className="text-gray-400">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
