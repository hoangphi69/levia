import { Button } from '@/components/shadcn/button';
import { getAllProducts } from '@/actions/product';
import { Plus } from 'lucide-react';
import Header from '../_components/layout/header';
import { columns } from './columns';
import DataTable from './data-table';
import ProductAddModal from './product-add-modal';

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
      <div className="flex justify-between items-end gap-4">
        <Header title={header.title} list={header.breadcrumb} />
        <ProductAddModal>
          <Button className="mr-4 mb-4">
            <Plus />
            Thêm sản phẩm
          </Button>
        </ProductAddModal>
      </div>
      <section className="mx-auto p-4 min-h-dvh container">
        <DataTable columns={columns} data={products} />
      </section>
    </>
  );
}
