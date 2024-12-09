import Link from 'next/link';
import prisma from '../lib/prisma';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import ArticleCard from '../components/article-card';

export default async function Articles() {
  const title = 'Bài viết';
  const subtitle =
    'Cập nhật mới nhất, bài viết chia sẻ và các sự kiện không thể bỏ lỡ. ';
  const articles = await prisma.article.findMany({ include: { Topic: true } });

  return (
    <div className="p-4">
      <div className="space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Bài viết</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="font-bold text-4xl">{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="gap-10 grid grid-cols-5 mt-6">
        {articles.map(({ id, title, banner, Topic }) => (
          <Link key={id} href={`/articles/${id}`}>
            <ArticleCard title={title} banner={banner} Topic={Topic} />
          </Link>
        ))}
      </div>
    </div>
  );
}
