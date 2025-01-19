import Link from 'next/link';
import prisma from '../lib/prisma';
import ArticleCard from '../components/card-article';
import Banner from '../components/banner';

export default async function Articles() {
  const articles = await prisma.article.findMany({ include: { Topic: true } });

  const banner = {
    breadcrumb: [
      {
        display: 'Trang chủ',
        href: '/',
      },
      {
        display: 'Bài viết',
      },
    ],
    image: '../images/products-banner.png',
    title: 'Bài viết',
    subtitle:
      'Cập nhật mới nhất, bài viết chia sẻ và các sự kiện không thể bỏ lỡ. ',
  };

  return (
    <main>
      <Banner image={banner.image} breadcrumb={banner.breadcrumb}>
        <header className="flex-1 content-center md:content-end space-y-2">
          <h1 className="font-bold text-2xl text-center text-gradient md:text-left lg:text-4xl">
            {banner.title}
          </h1>
          <p className="md:max-w-[25ch] text-base text-center text-muted-foreground md:text-left lg:text-lg tracking-wide">
            {banner.subtitle}
          </p>
        </header>
      </Banner>

      {articles.length > 0 ? (
        <section className="gap-6 md:gap-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:px-16 md:py-12 p-6">
          {articles.map(({ id, title, banner, Topic }) => (
            <Link key={id} href={`/articles/${id}`}>
              <ArticleCard title={title} banner={banner} Topic={Topic} />
            </Link>
          ))}
        </section>
      ) : (
        <section className="place-content-center grid min-h-[250px]">
          <p>Không thấy kết quả</p>
        </section>
      )}
    </main>
  );
}
