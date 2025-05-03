import Header from './_components/layout/header';
import ThemeSwitch from './_components/theme/theme-switch';

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
