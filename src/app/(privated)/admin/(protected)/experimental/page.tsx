'use client';

import Header from '@/app/(privated)/admin/_components/layout/header';

const header = {
  title: 'Experimental',
  breadcrumb: [
    {
      display: 'Trang chủ',
      href: '/admin',
    },
    {
      display: 'Experimental',
    },
  ],
};

export default function DragnDrop() {
  return (
    <>
      <Header title={header.title} list={header.breadcrumb} />
      <section className="p-4 min-h-dvh container">
        <div className="flex gap-4 mx-auto">
          {/* <DateTimePicker value={new Date()} />
          <RatingSelect value={4} /> */}
        </div>
      </section>
    </>
  );
}
