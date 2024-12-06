import Link from 'next/link';
import ProductCard from '../components/product-card';
import prisma from '../lib/prisma';

export default async function Products() {
  const title = 'Sản phẩm';
  const subtitle = 'Khám phá các dòng sản phẩm mới trong căn bếp';
  // const products = [
  //   {
  //     id: '821j898qwef',
  //     title: 'Bếp từ đôi LV-3000',
  //     price: 16000000,
  //     image: 'https://picsum.photos/250',
  //   },
  //   {
  //     id: '821j89qwef',
  //     title: 'Bếp từ đôi LV-3000',
  //     price: 1600000,
  //     image: 'https://picsum.photos/250',
  //   },
  //   {
  //     id: '821j88qwef',
  //     title: 'Bếp từ đôi LV-3000',
  //     price: 6900000,
  //     image: 'https://picsum.photos/250',
  //   },
  //   {
  //     id: '821j898qwf',
  //     title: 'Bếp từ đôi LV-3000',
  //     price: 16000000,
  //     image: 'https://picsum.photos/250',
  //   },
  //   {
  //     id: '821j898qef',
  //     title: 'Bếp từ đôi LV-3000',
  //     price: 69000000,
  //     image: 'https://picsum.photos/250',
  //   },
  //   {
  //     id: '81j898qwef',
  //     title: 'Bếp từ đôi LV-3000',
  //     price: 16000000,
  //     image: 'https://picsum.photos/250',
  //   },
  //   {
  //     id: '82j898qwef',
  //     title: 'Bếp từ đôi LV-3000',
  //     price: 5600000,
  //     image: 'https://picsum.photos/250',
  //   },
  //   {
  //     id: '821j898qwe',
  //     title: 'Bếp từ đôi LV-3000',
  //     price: 12000000,
  //     image: 'https://picsum.photos/250',
  //   },
  // ];

  const products = await prisma.product.findMany();

  return (
    <div className="p-4">
      <div className="space-y-4">
        <span>Trang chủ - Sản phẩm</span>
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
