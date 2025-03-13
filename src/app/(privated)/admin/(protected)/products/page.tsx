import { getAllProducts } from '@/lib/actions/product';
import Header from '../../_components/layout/header';
import { columns } from './columns';
import DataTable from './data-table';

const header = {
  title: 'Sản phẩm',
  breadcrumb: [
    {
      display: 'Trang chủ',
      href: '/admin',
    },
    {
      display: 'Sản phẩm',
    },
  ],
};

export default async function Products() {
  const data = await getAllProducts();
  const products = data.map(({ Category, ...rest }) => ({
    ...rest,
    category_title: Category?.title,
  }));

  return (
    <>
      <Header title={header.title} list={header.breadcrumb} />
      <section className="mx-auto p-4 min-h-dvh container">
        <DataTable columns={columns} data={products} />
      </section>
    </>
  );
}
