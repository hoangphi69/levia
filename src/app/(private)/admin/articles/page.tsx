import { getAllArticles } from '@/actions/article';
import { Button } from '@/components/shadcn/button';
import { Plus } from 'lucide-react';
import DataTable from '../_components/data-table/data-table';
import Header from '../_components/layout/header';
import { columns } from './columns';

const header = {
  title: 'Sản phẩm',
  breadcrumb: [
    {
      display: 'Trang chủ',
      href: '/admin',
    },
    {
      display: 'Bài viết',
    },
  ],
};

export default async function Articles() {
  const articles = await getAllArticles();

  return (
    <>
      <div className="flex justify-between items-end gap-4">
        <Header title={header.title} list={header.breadcrumb} />
        <Button className="mr-4 mb-4">
          <Plus />
          Thêm bài viết
        </Button>
      </div>
      <section className="mx-auto p-4 min-h-dvh container">
        <DataTable columns={columns} data={articles} />
      </section>
    </>
  );
}
