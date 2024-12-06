import ProductCard from '@/app/components/product-card';
import ProductMedia from '@/app/components/product-media';
import ReviewCard from '@/app/components/review-card';
import ReviewStats from '@/app/components/review-stats';
import SectionTitle from '@/app/components/section-title';
import prisma from '@/app/lib/prisma';
import { buttonVariants } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export type ProductMedia = {
  id: string;
  title: string;
  subtitle: string;
  media: string;
  style: 'video' | 'image-only' | 'image-left' | 'image-right' | 'image-bottom';
};

export type ProductReview = {
  id: string;
  author: string;
  comment: string;
  image: string;
  rating: number;
  created_at: Date;
  updated_at: Date;
};

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: { id },
  });

  const product_media: ProductMedia[] = [
    {
      id: 'u8923ur8923',
      title: 'Thiết kế hiện đại, tinh tế',
      subtitle:
        'Mô tả ngắn một đoạn văn ngắn gọn, nổi bật những điểm mạnh chính của sản phẩm. Mô tả ngắn một đoạn văn ngắn gọn,',
      media: 'https://picsum.photos/1100/500',
      style: 'image-left',
    },
    {
      id: 'u8923ur8923',
      title: 'Thiết kế hiện đại, tinh tế',
      subtitle:
        'Mô tả ngắn một đoạn văn ngắn gọn, nổi bật những điểm mạnh chính của sản phẩm. Mô tả ngắn một đoạn văn ngắn gọn,',
      media: 'https://picsum.photos/1100/500',
      style: 'image-right',
    },
    {
      id: 'u8923ur8923',
      title: 'Thiết kế hiện đại, tinh tế',
      subtitle:
        'Mô tả ngắn một đoạn văn ngắn gọn, nổi bật những điểm mạnh chính của sản phẩm. Mô tả ngắn một đoạn văn ngắn gọn,',
      media: 'https://picsum.photos/1100/500',
      style: 'image-bottom',
    },
    {
      id: 'u8923ur8923',
      title: 'Thiết kế hiện đại, tinh tế',
      subtitle:
        'Mô tả ngắn một đoạn văn ngắn gọn, nổi bật những điểm mạnh chính của sản phẩm. Mô tả ngắn một đoạn văn ngắn gọn,',
      media: 'https://picsum.photos/1100/500',
      style: 'image-only',
    },
  ];

  const product_suggests = await prisma.product.findMany();

  const product_reviews: ProductReview[] = [
    {
      id: 'i09234jdsf',
      author: 'HoangPhi',
      comment:
        'Chưa bao giờ trong đời tôi đc sử dụng sản phẩm đỉnh cao ntn. Tôi chắc chắn sẽ mua cái nữa cho bà già nhà tôi.',
      rating: 5,
      image: 'https://picsum.photos/200',
      created_at: new Date('12/11/2024'),
      updated_at: new Date('12/12/2024'),
    },
    {
      id: 'i09234dsf',
      author: 'TrvankWan',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, eaque odio velit modi animi enim ipsum, ipsam sit, vero error iusto repellat blanditiis sint. Quas nesciunt aut recusandae error nulla.',
      rating: 4,
      image: 'https://picsum.photos/200',
      created_at: new Date('12/12/2024'),
      updated_at: new Date('12/12/2024'),
    },
  ];

  return (
    <div className="p-6">
      <section className="mb-4 border">
        <span>Trang chủ - Sản phẩm - Máy hút mùi</span>
      </section>

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
            <TabsTrigger value="features">Tính năng nổi bật</TabsTrigger>
            <TabsTrigger value="specs">Thông số kỹ thuật</TabsTrigger>
            <TabsTrigger value="installation">Hướng dẫn lắp đặt</TabsTrigger>
            <TabsTrigger value="user">Hướng dẫn sử dụng</TabsTrigger>
          </TabsList>
          <TabsContent
            className="content-center border min-h-20 text-center"
            value="features"
          >
            Nổi bật vl
          </TabsContent>
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

      <section className="space-y-4">
        <SectionTitle
          title1=""
          title2="Về sản phẩm"
          subtitle="Thiết kế bởi đội ngũ sáng tạo tài năng, kết hợp công nghệ đỉnh cao để đem lại sự tiện nghi và sang trọng cho người dùng"
        />
        {product_media.map((media, index) => (
          <ProductMedia
            key={index}
            style={media.style}
            title={media.title}
            subtitle={media.subtitle}
            media={media.media}
          />
        ))}
      </section>

      <section className="space-y-4">
        <SectionTitle
          title1=""
          title2="Khám phá thêm bộ sưu tập"
          subtitle="Mô tả ngắn một đoạn văn ngắn gọn, nổi bật những điểm mạnh chính của sản phẩm mà không liên quan gì đến sản phẩm cũng được"
        />

        <div className="flex gap-4 *:w-[250px]">
          {product_suggests.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              image={product.images[0]}
              price={product.price}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex md:flex-row flex-col *:flex-1 justify-between gap-6">
          <SectionTitle title1="" title2="Review & đánh giá" subtitle="" />
          <ReviewStats
            ratings={product_reviews.map((review) => review.rating)}
          />
        </div>
        <div className="gap-4 grid grid-cols-3">
          {product_reviews.map((review, index) => (
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
    </div>
  );
}
