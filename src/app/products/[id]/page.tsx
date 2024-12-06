import ProductCard from '@/app/components/product-card';
import ProductMedia from '@/app/components/product-media';
import ReviewCard from '@/app/components/review-card';
import ReviewStats from '@/app/components/review-stats';
import SectionTitle from '@/app/components/section-title';
import prisma from '@/app/lib/prisma';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { buttonVariants } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: { id },
    include: {
      media: true,
      reviews: true,
    },
  });

  const recommendations: {
    id: string;
    title: string;
    images: string[];
    price: number;
  }[] = await prisma.$queryRaw`
    SELECT id, title, images, price
    FROM "Product"
    WHERE id != ${product?.id} AND category_id = ${product?.category_id}
    ORDER BY RANDOM()
    LIMIT 5;
  `;

  return (
    <div className="p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Sản phẩm</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product?.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="gap-4 grid grid-cols-2">
        <div className="gap-4 grid grid-cols-3 border">
          <p className="col-span-3 text-center">Image Carousel</p>
          {product?.images.map((image, index) => (
            <img key={index} className="w-full" src={image} alt="" />
          ))}
        </div>

        <div className="flex flex-col items-start gap-4">
          <span className="text-slate-400 uppercase">{product?.model}</span>
          <h1 className="font-bold text-xl">{product?.title}</h1>
          <p className="text-gray-400">{product?.description}</p>
          <p className="text-gray-400">từ {product?.price}</p>
          <Link
            className={buttonVariants({
              variant: 'outline',
            })}
            href={'/contacts'}
          >
            Liên hệ ngay
          </Link>
        </div>

        <Tabs defaultValue="features" className="col-span-2">
          <TabsList>
            {product?.features && (
              <TabsTrigger value="features">Tính năng nổi bật</TabsTrigger>
            )}
            {product?.specs && (
              <TabsTrigger value="specs">Thông số kỹ thuật</TabsTrigger>
            )}
            <TabsTrigger value="installation">Hướng dẫn lắp đặt</TabsTrigger>
            <TabsTrigger value="user">Hướng dẫn sử dụng</TabsTrigger>
          </TabsList>
          {product?.features && (
            <TabsContent
              className="content-center border min-h-20 text-center"
              value="features"
            >
              <div className="grid grid-cols-4">
                {Object.entries(product.features).map(
                  ([label, value], index) => (
                    <div key={index} className="flex flex-col items-start">
                      <span>{label}</span>
                      <span className="font-bold text-lg">{value}</span>
                    </div>
                  )
                )}
              </div>
            </TabsContent>
          )}
          <TabsContent
            className="content-center border min-h-20 text-center"
            value="specs"
          >
            Thông số kỹ thuật ở vl
          </TabsContent>
          <TabsContent
            className="content-center border min-h-20 text-center"
            value="installation"
          >
            Lắp đặt vkl
          </TabsContent>
          <TabsContent
            className="content-center border min-h-20 text-center"
            value="user"
          >
            Sử dụng vl
          </TabsContent>
        </Tabs>
      </section>

      {product?.media?.length && (
        <section className="space-y-4">
          <SectionTitle
            title1=""
            title2="Về sản phẩm"
            subtitle="Thiết kế bởi đội ngũ sáng tạo tài năng, kết hợp công nghệ đỉnh cao để đem lại sự tiện nghi và sang trọng cho người dùng"
          />
          {product.media.map((media, index) => (
            <ProductMedia
              key={index}
              style={media.style}
              title={media.title}
              subtitle={media.subtitle}
              media_url={media.media_url}
            />
          ))}
        </section>
      )}

      <section className="space-y-4">
        <SectionTitle
          title1=""
          title2="Khám phá thêm bộ sưu tập"
          subtitle="Mô tả ngắn một đoạn văn ngắn gọn, nổi bật những điểm mạnh chính của sản phẩm mà không liên quan gì đến sản phẩm cũng được"
        />

        <div className="flex gap-4 *:w-[250px]">
          {recommendations.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <ProductCard
                title={product.title}
                image={product.images[0]}
                price={product.price}
              />
            </Link>
          ))}
        </div>
      </section>

      {product?.reviews?.length && (
        <section className="space-y-4">
          <div className="flex md:flex-row flex-col *:flex-1 justify-between gap-6">
            <SectionTitle title1="" title2="Review & đánh giá" subtitle="" />
            <ReviewStats
              ratings={product.reviews.map((review) => review.rating)}
            />
          </div>
          <div className="gap-4 grid grid-cols-3">
            {product.reviews.map((review, index) => (
              <ReviewCard
                key={index}
                rating={review.rating}
                author={review.author}
                comment={review.comment}
                image={review.image}
                created_at={review.created_at}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
