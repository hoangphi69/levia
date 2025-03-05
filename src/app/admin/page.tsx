import React from 'react';
import ThemeSwitch from './components/theme/theme-switch';
import Header from './components/layout/header';

const header = {
  title: 'Dashboard',
  breadcrumb: [
    {
      display: 'Trang chủ',
    },
  ],
};

export default function Admin() {
  return (
    <>
      <Header title={header.title} list={header.breadcrumb} />
      <section className="place-content-center w-full min-h-dvh text-center">
        <ThemeSwitch />
      </section>
    </>
  );
}
