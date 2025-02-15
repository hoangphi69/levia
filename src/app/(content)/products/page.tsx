import Link from 'next/link';
import ProductCard from '../../components/card-product';
import prisma from '../../lib/prisma';
import SearchProduct from '../../components/search-product';
import Banner from '../../components/banner';

type searchParams = Promise<{ [key: string]: string | undefined }>;

export default async function Products(props: { searchParams: searchParams }) {
  const { search, limit = '12', category_id } = await props.searchParams;

  const products = await prisma.product.findMany({
    take: parseInt(limit),
    where: {
      title: {
        contains: search || '',
        mode: 'insensitive',
      },
      category_id,
    },
    select: {
      id: true,
      title: true,
      price: true,
      images: true,
      category_id: true,
    },
  });

  const banner = {
    title: 'Sản phẩm',
    subtitle: 'Khám phá các dòng sản phẩm mới trong căn bếp',
    image: '../images/products-banner.png',
    breadcrumb: [
      {
        display: 'Trang chủ',
        href: '/',
      },
      {
        display: 'Sản phẩm',
      },
    ],
  };

  return (
    <main>
      <Banner image={banner.image} breadcrumb={banner.breadcrumb}>
        <div className="flex md:flex-row flex-col justify-between items-center md:items-end gap-4">
          <header className="flex-1 content-center md:content-end space-y-2">
            <h1 className="font-bold text-2xl text-center text-gradient md:text-left lg:text-4xl">
              {banner.title}
            </h1>
            <p className="md:max-w-[25ch] text-base text-center text-muted-foreground md:text-left lg:text-lg tracking-wide">
              {banner.subtitle}
            </p>
          </header>

          <SearchProduct className="max-w-[300px]" />
        </div>
      </Banner>

      {products.length > 0 ? (
        <section className="gap-6 md:gap-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:px-16 md:py-12 p-6">
          {products.map(({ id, title, price, images }) => (
            <Link key={id} href={`/products/${id}`}>
              <ProductCard image={images[0]} title={title} price={price} />
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
