import Link from 'next/link';
import ProductCard from '../components/product-card';
import prisma from '../lib/prisma';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

export default async function Products() {
  const title = 'Sản phẩm';
  const subtitle = 'Khám phá các dòng sản phẩm mới trong căn bếp';
  const products = await prisma.product.findMany();

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
              <BreadcrumbPage>Sản phẩm</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="font-bold text-4xl">{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="gap-10 grid grid-cols-5 mt-6">
        {products.map(({ id, title, price, images }) => (
          <Link key={id} href={`/products/${id}`}>
            <ProductCard image={images[0]} title={title} price={price} />
          </Link>
        ))}
      </div>
    </div>
  );
}
