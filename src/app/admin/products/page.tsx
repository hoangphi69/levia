import prisma from '@/app/lib/prisma';
import Header from '../components/header';
import DataTable from './data-table';
import { columns } from './columns';

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

const getProducts = async () => {
  const data = await prisma.product.findMany({
    select: {
      id: true,
      model: true,
      title: true,
      price: true,
      Category: {
        select: {
          title: true,
        },
      },
    },
  });

  return data.map(({ id, model, title, price, Category }) => ({
    id,
    model,
    title,
    price,
    category_title: Category?.title,
  }));
};

export default async function Products() {
  const products = await getProducts();

  return (
    <>
      <Header title={header.title} list={header.breadcrumb} />
      <section className="mx-auto p-4 min-h-dvh container">
        <DataTable columns={columns} data={products} />
      </section>
    </>
  );
}
