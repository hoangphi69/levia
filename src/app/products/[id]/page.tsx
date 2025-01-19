import ProductCard from '@/app/components/card-product';
import ProductMedia from '@/app/components/product-media';
import ReviewCard from '@/app/components/card-review';
import ReviewStats from '@/app/components/review-stats';
import prisma from '@/app/lib/prisma';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { formattedPrice, SplitedTitle } from '@/app/lib/utils';
import Breadcrumb from '@/app/components/breadcrumb';
import CarouselProduct from '@/app/components/carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type Params = Promise<{ id: string }>;

export default async function ProductDetails(props: { params: Params }) {
  const { id } = await props.params;
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

  const breadcrumb = [
    {
      display: 'Trang chủ',
      href: '/',
    },
    {
      display: 'Sản phẩm',
      href: '/products',
    },
    {
      display: product?.title,
    },
  ];

  return (
    <main>
      <section className="md:px-16 md:py-12 p-6 !pb-0">
        <Breadcrumb list={breadcrumb} />
      </section>

      <section className="gap-6 md:gap-12 grid grid-cols-1 md:grid-cols-2 md:px-16 md:py-12 p-6">
        <CarouselProduct images={product?.images} />

        <div className="flex flex-col items-start gap-4 md:gap-6">
          <h1 className="font-bold text-xl md:text-2xl">{product?.title}</h1>
          <div className="flex justify-between self-stretch">
            <span className="font-light text-base text-muted-foreground md:text-lg uppercase">
              {product?.model}
            </span>
            <p className="font-light text-base text-muted-foreground md:text-lg">
              từ {formattedPrice(product?.price)}
            </p>
          </div>
          <p className="text-muted-foreground">{product?.description}</p>
          <Link className="uppercase btn-fill self-stretch" href={'/contacts'}>
            Liên hệ ngay
          </Link>
        </div>
      </section>

      {(product?.features || product?.specs) && (
        <section className="md:px-16 md:py-12 p-6">
          <Tabs defaultValue="features" className="space-y-4">
            <div className="overflow-auto no-scrollbar">
              <TabsList className="bg-transparent p-0 rounded-none h-min">
                {product?.features && (
                  <TabsTrigger
                    className="data-[state=active]:bg-secondary px-6 py-3 rounded-none text-base"
                    value="features"
                  >
                    Tính năng nổi bật
                  </TabsTrigger>
                )}
                {product?.specs && (
                  <TabsTrigger
                    className="data-[state=active]:bg-secondary px-6 py-3 rounded-none text-base"
                    value="specs"
                  >
                    Thông số kỹ thuật
                  </TabsTrigger>
                )}
                <TabsTrigger
                  className="data-[state=active]:bg-secondary px-6 py-3 rounded-none text-base"
                  value="installation"
                >
                  Hướng dẫn lắp đặt
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-secondary px-6 py-3 rounded-none text-base"
                  value="user"
                >
                  Hướng dẫn sử dụng
                </TabsTrigger>
              </TabsList>
            </div>
            {product?.features && (
              <TabsContent value="features">
                <div className="gap-6 lg:gap-12 grid grid-cols-2 md:grid-cols-4 bg-secondary p-6 lg:p-12 border rounded-se-[3rem] md:rounded-se-[5rem]">
                  {Object.entries(product.features).map(
                    ([label, value], index) => (
                      <div key={index} className="flex flex-col items-start">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-bold text-xl">{value}</span>
                      </div>
                    )
                  )}
                  <div className="flex flex-col items-start">
                    <span className="text-muted-foreground">
                      Kích thước mặt kính
                    </span>
                    <span className="font-bold text-xl">370x290x20mm</span>
                  </div>
                </div>
              </TabsContent>
            )}
            {product?.specs && (
              <TabsContent
                className="content-center border min-h-20 text-center"
                value="specs"
              >
                <div className="grid grid-cols-4">
                  {Object.entries(product.specs).map(
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
      )}

      {product?.media && product?.media.length > 0 && (
        <section className="space-y-6 md:space-y-12 md:px-16 md:py-12 p-6">
          <header className="flex md:flex-row flex-col justify-between items-center md:items-end gap-2">
            <h2 className="font-bold text-2xl text-center text-gradient md:text-left lg:text-3xl">
              <SplitedTitle text={'Về sản phẩm'} />
            </h2>
            <p className="md:text-right max-w-[45ch] text-center text-muted-foreground text-sm lg:text-base tracking-wide">
              Thiết kế bởi đội ngũ sáng tạo tài năng, kết hợp công nghệ đỉnh cao
              để đem lại sự tiện nghi và sang trọng cho người dùng
            </p>
          </header>

          {product.media.map((media, index) => (
            <ProductMedia
              key={index}
              style={'image_only'}
              title={media.title}
              subtitle={media.subtitle}
              media_url={media.media_url}
            />
          ))}
        </section>
      )}

      {recommendations.length > 0 && (
        <section className="space-y-6 md:space-y-12 md:px-16 md:py-12 p-6">
          <header className="flex md:flex-row flex-col justify-between items-center md:items-end gap-2">
            <h2 className="font-bold text-2xl text-center text-gradient md:text-left lg:text-3xl">
              <SplitedTitle text={'Khám phá\nthêm bộ sưu tập'} inline={false} />
            </h2>
            <p className="md:text-right max-w-[45ch] text-center text-muted-foreground text-sm lg:text-base tracking-wide">
              Mô tả ngắn một đoạn văn ngắn gọn, nổi bật những điểm mạnh chính
              của sản phẩm
            </p>
          </header>

          <Carousel opts={{ align: 'start' }}>
            <CarouselContent className="-ml-6">
              {recommendations.map((product) => (
                <CarouselItem
                  className="pl-6 basis-1/2 md:basis-1/3 lg:basis-1/4"
                  key={product.id}
                >
                  <Link href={`/products/${product.id}`}>
                    <ProductCard
                      title={product.title}
                      image={product.images[0]}
                      price={product.price}
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="md:inline-flex left-0 hidden disabled:opacity-0 border-border w-12 h-12 -translate-x-1/2" />
            <CarouselNext className="md:inline-flex right-0 hidden disabled:opacity-0 border-border w-12 h-12 translate-x-1/2" />
          </Carousel>
        </section>
      )}

      {product?.reviews && product.reviews.length > 0 && (
        <section className="space-y-6 md:space-y-12 md:px-16 md:py-12 p-6">
          <header className="items-end gap-4 md:gap-6 grid grid-cols-1 md:grid-cols-2">
            <h2 className="font-bold text-2xl text-center text-gradient md:text-left lg:text-3xl">
              <SplitedTitle text={'Đánh giá &\nTrải nghiệm'} inline={false} />
            </h2>

            <ReviewStats
              ratings={product.reviews.map((review) => review.rating)}
            />
          </header>

          <div className="gap-6 space-y-6 first:*:rounded-ss-[3rem] *:break-inside-avoid first:*:overflow-hidden columns-1 md:columns-2 lg:columns-3">
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
    </main>
  );
}
