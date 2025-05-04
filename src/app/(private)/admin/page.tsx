import { Button } from '@/components/shadcn/button';
import Header from './_components/layout/header';
import ThemeSwitch from './_components/theme/theme-switch';
import LogoutBtn from './logout-btn';

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
        <LogoutBtn />
      </section>
    </>
  );
}
