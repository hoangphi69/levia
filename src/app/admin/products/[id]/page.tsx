import ProductMedia from '@/app/components/product-media';
import ReviewCard from '@/app/components/card-review';
import ReviewStats from '@/app/components/review-stats';
import prisma from '@/app/lib/prisma';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { formattedPrice, SplitedTitle } from '@/app/lib/utils';
import CarouselProduct from '@/app/components/carousel';
import Header from '../../components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SmoothImage from '@/app/components/smooth-image';
import Zoom from '@/app/components/zoom';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Trash2 } from 'lucide-react';

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

  const header = {
    title: product?.title,
    breadcrumb: [
      {
        display: 'Trang chủ',
        href: '/admin',
      },
      {
        display: 'Sản phẩm',
        href: '/admin/products',
      },
      {
        display: product?.title,
      },
    ],
  };

  return (
    <>
      <Header title={header.title} list={header.breadcrumb} />

      <section className="gap-4 grid grid-cols-2 mx-auto p-4 container">
        <Card>
          <CardHeader>
            <CardTitle>
              <h2 className="font-bold text-xl">Hình ảnh</h2>
            </CardTitle>
            <CardDescription>Sản phẩm cần tối thiểu 4 hình ảnh</CardDescription>
          </CardHeader>
          <CardContent className="gap-4 grid grid-cols-2">
            {product?.images.map((image, index) => (
              <div key={index} className="group relative">
                <Zoom>
                  <SmoothImage
                    src={image}
                    width={640}
                    height={400}
                    alt=""
                    className="rounded-xl w-full h-full"
                  />
                </Zoom>

                <div className="top-0 right-0 absolute flex flex-col gap-2 opacity-0 group-hover:opacity-100 p-2 transition-opacity">
                  <Button variant={'outline'} size={'icon'}>
                    <span className="sr-only">Đổi ảnh</span>
                    <RefreshCcw />
                  </Button>
                  <Button variant={'outline'} size={'icon'}>
                    <span className="sr-only">Xoá ảnh</span>
                    <Trash2 />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin sản phẩm</CardTitle>
          </CardHeader>
        </Card>
      </section>

      <section className="gap-6 md:gap-12 grid grid-cols-1 md:grid-cols-2 p-6 md:px-16 md:py-12">
        <CarouselProduct images={product?.images} />

        <div className="flex flex-col items-start gap-4 md:gap-6">
          <h1 className="font-bold text-xl md:text-2xl">{product?.title}</h1>
          <div className="flex justify-between self-stretch">
            <span className="font-light text-muted-foreground text-base md:text-lg uppercase">
              {product?.model}
            </span>
            <p className="font-light text-muted-foreground text-base md:text-lg">
              từ {formattedPrice(product?.price)}
            </p>
          </div>
          <p className="text-muted-foreground">{product?.description}</p>
          <Link className="self-stretch uppercase btn-fill" href={'/contacts'}>
            Liên hệ ngay
          </Link>
        </div>
      </section>

      {(product?.features || product?.specs) && (
        <section className="p-6 md:px-16 md:py-12">
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
        <section className="space-y-6 md:space-y-12 p-6 md:px-16 md:py-12">
          <header className="flex md:flex-row flex-col justify-between items-center md:items-end gap-2">
            <h2 className="font-bold text-gradient text-2xl lg:text-3xl md:text-left text-center">
              <SplitedTitle text={'Về sản phẩm'} />
            </h2>
            <p className="max-w-[45ch] text-muted-foreground text-sm lg:text-base text-center md:text-right tracking-wide">
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

      {product?.reviews && product.reviews.length > 0 && (
        <section className="space-y-6 md:space-y-12 p-6 md:px-16 md:py-12">
          <header className="items-end gap-4 md:gap-6 grid grid-cols-1 md:grid-cols-2">
            <h2 className="font-bold text-gradient text-2xl lg:text-3xl md:text-left text-center">
              <SplitedTitle text={'Đánh giá &\nTrải nghiệm'} inline={false} />
            </h2>

            <ReviewStats
              ratings={product.reviews.map((review) => review.rating)}
            />
          </header>

          <div className="gap-6 space-y-6 columns-1 md:columns-2 lg:columns-3 first:*:rounded-ss-[3rem] first:*:overflow-hidden *:break-inside-avoid">
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
    </>
  );
}
