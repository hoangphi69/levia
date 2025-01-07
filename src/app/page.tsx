import Link from 'next/link';
import prisma from './lib/prisma';
import { SplitedTitle } from './lib/utils';
import CircularTextButton from './components/circular-text';
import SmoothImage from './components/smooth-image';
import logo from '../../public/logo/logo-text.svg';
import feature1 from '../../public/images/feature_1.png';
import feature2 from '../../public/images/feature_2.png';
import feature3 from '../../public/images/feature_3.png';
import feature5 from '../../public/images/feature_5.png';
import feature6 from '../../public/images/feature_6.png';

interface Quote {
  comment: string;
  author: string;
  job: string;
}

interface ProductFeatures {
  title: string;
  content: string;
}

export default async function Home() {
  const home = await prisma.home.findUnique({
    where: { profile: 'default' },
    include: {
      featured_product: {
        select: {
          title: true,
          price: true,
          images: true,
          description: true,
        },
      },
    },
  });

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      title: true,
      title_en: true,
      banner: true,
    },
  });

  const articles = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      banner: true,
      Topic: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      created_at: 'asc',
    },
    take: 4,
  });

  const section = {
    hero: {
      header: 'Giải pháp cho căn bếp\nHiện đại',
      subtitle:
        'Thiết kế tinh tế. Hiệu suất vượt trội. Trải nghiệm nấu nướng đẳng cấp.',
      button: 'Tìm hiểu về chúng tôi - Tìm hiểu về chúng tôi - ',
      image: home?.hero_image,
    },

    featured: {
      header: 'Sản phẩm nổi bật',
      button: 'Khám phá sản phẩm',
      product: {
        id: home?.featured_product_id,
        title: home?.featured_product?.title,
        image: home?.featured_image || home?.featured_product?.images[0],
        description: home?.featured_product?.description,
        price: home?.featured_product?.price,
        features: home?.featured_features,
      },
    },

    features: {
      header: 'Thiết kế độc đáo.\nCông nghệ đỉnh cao',
      subtitle:
        'Thiết kế bởi đội ngũ sáng tạo tài năng, kết hợp công nghệ đỉnh cao để đem lại sự tiện nghi và sang trọng cho người dùng',
      items: [
        {
          title: 'Sò công suất\nIGBT của Đức',
          subtitle:
            'Xử lý dòng điện cao hàng trăm Ampe với điện áp chặn 6500V, kiểm soát tải hàng trăm Kilowatt.',
          image: feature1,
        },
        {
          title: 'Công nghệ\nDigital Inverter',
          image: feature2,
        },
        {
          title: 'Thiết kế\nbởi A.I.',
          subtitle:
            'Sử dụng trí tuệ thông minh nhân tạo để phân tích hàng triệu mẫu.',
          image: feature3,
        },
        {
          image: logo,
        },
        {
          title: 'Mặt kính phủ\nlớp gương Ceramic',
          subtitle:
            'Chống chịu tác động, va đập tốt, tối ưu hóa truyền nhiệt định hướng qua bề mặt kính.',
          image: feature5,
        },
        {
          title: 'Mâm từ\nbằng đồng nguyên chất',
          image: feature6,
        },
      ],
    },

    category: {
      header: 'Bộ sưu tập cho\ngian bếp hoàn hảo',
      subtitle:
        'Những sản phẩm được thiết kế tỉ mỉ, mang đến sự tiện nghi và sang trọng cho căn bếp của mỗi gia đình.',
      button: 'Khám phá sản phẩm',
      items: categories,
    },

    testimonials: {
      header: 'Cùng nhau tạo nên\ntrải nghiệm khác biệt',
      subtitle:
        'Chúng tôi không chỉ cung cấp sản phẩm, mà còn mang đến trải nghiệm hài lòng, cùng với sự uy tín tới những người đồng hành.',
      quote: home?.quote,
      partners: home?.partners,
    },

    article: {
      header: 'Vòng quanh\nthế giới ẩm thực',
      subtitle:
        'Giữ vững đam mê nấu nướng với những cập nhật mới nhất, bài viết chia sẻ và các sự kiện không thể bỏ lỡ.',
      items: articles,
      button: 'Khám phá thêm',
    },
  };

  const { hero, featured, features, category, testimonials, article } = section;

  return (
    <main>
      {/* Hero section */}
      <section className="space-y-6 md:space-y-0 pt-6 md:pt-16 pb-14 md:pb-24 pl-6 md:pl-16">
        <div className="flex md:flex-row flex-col justify-between items-center md:items-baseline pr-6 md:pr-16 text-xl">
          <h1 className="z-10 md:h-24 lg:h-32">
            <span className="font-modern font-semibold text-5xl lg:text-7xl uppercase leading-tight">
              Giải pháp cho <br />
              căn bếp
            </span>{' '}
            <span className="inline-block -ml-10 pl-10 font-medium font-script text-7xl text-gradient lg:text-9xl capitalize leading-[1.05]">
              hiện đại
            </span>
          </h1>
          <p className="text-right max-w-[25ch] text-base text-muted-foreground lg:text-lg tracking-wide">
            {hero.subtitle}
          </p>
        </div>
        <div className="relative after:top-0 after:right-0 after:absolute bg-secondary after:bg-gradient-to-l after:from-background after:to-background/0 rounded-ss-[5rem] after:w-16 after:h-full min-h-[250px] lg:min-h-[400px]">
          <SmoothImage
            src={hero.image as string}
            fill={true}
            alt="Kitchen"
            className="rounded-ss-[5rem]"
          />
          <Link
            href={'/about'}
            className="block right-16 lg:right-32 bottom-0 absolute w-fit translate-y-1/2 group"
          >
            <CircularTextButton
              text={hero.button}
              size={125}
              fontSize={12}
              offset={2.75}
              className="bg-gradient-to-tr from-accent-gold to-accent-almond"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="#1c1c1c"
              >
                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
              </svg>
            </CircularTextButton>
          </Link>
        </div>
      </section>

      {/* Product section */}
      {featured.product && (
        <section className="gap-6 lg:gap-12 grid grid-cols-1 md:grid-cols-[1.6fr_2fr] py-12 p-6 md:p-16">
          <Link
            href={`/products/${featured.product.id}`}
            className="relative bg-secondary rounded-ee-[5rem] w-full overflow-hidden aspect-square"
          >
            <SmoothImage
              src={featured.product.image as string}
              alt="Featured product"
              fill={true}
            />
          </Link>
          <div className="flex flex-col gap-6 md:gap-12">
            <div className="space-y-2">
              <h2 className="font-light text-muted-foreground text-sm lg:text-lg uppercase tracking-wide">
                {featured.header}
              </h2>
              <h3 className="font-bold text-foreground text-xl lg:text-2xl">
                {featured.product.title}
              </h3>
            </div>

            <p className="text-muted-foreground text-sm lg:text-base">
              {featured.product.description}
            </p>

            <Link
              className="text-sm lg:text-base btn-outline md:self-start self-stretch"
              href={`/products/${featured.product.id}`}
            >
              {featured.button}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>

            {featured.product.features &&
              featured.product.features.length > 0 && (
                <div className="flex justify-between gap-6 lg:gap-12">
                  {featured.product.features.map((feature, index) => (
                    <article
                      className="flex flex-col justify-between items-start gap-2"
                      key={index}
                    >
                      <h4 className="text-muted-foreground text-sm lg:text-base tracking-wide">
                        {(feature as unknown as ProductFeatures).title}
                      </h4>
                      <p className="font-bold text-3xl lg:text-5xl">
                        {(feature as unknown as ProductFeatures).content}
                      </p>
                    </article>
                  ))}
                </div>
              )}
          </div>
        </section>
      )}

      {/* Features section */}
      <section className="space-y-6 md:space-y-12 py-12 p-6 md:p-16">
        <div className="flex md:flex-row flex-col justify-between items-center md:items-end gap-2">
          <h2 className="text-center md:text-left">
            <SplitedTitle
              text={features.header}
              line1ClassName="font-script text-5xl lg:text-6xl !leading-3"
              line2ClassName="font-bold font-modern text-2xl lg:text-3xl lowercase text-gradient"
              inline={false}
            />
          </h2>
          <p className="md:text-right max-w-[45ch] text-center text-muted-foreground text-sm lg:text-base tracking-wide">
            {features.subtitle}
          </p>
        </div>

        <div className="gap-4 grid bento">
          <article className="grid bg-secondary rounded-ss-[5rem]">
            <div className="space-y-2 p-6 lg:p-10 pb-2 lg:pb-4">
              <h3 className="text-right font-semibold text-xl lg:text-2xl">
                <SplitedTitle
                  text={features.items[0].title as string}
                  line2ClassName="text-gradient"
                  inline={false}
                />
              </h3>
              <p className="text-right text-muted-foreground text-sm lg:text-base">
                {features.items[0].subtitle}
              </p>
            </div>
            <SmoothImage
              src={features.items[0].image}
              width={400}
              height={300}
              alt=""
              className="object-top w-full h-full"
            />
          </article>
          <article className="grid bg-secondary">
            <div className="relative z-10 space-y-2 p-6 lg:p-10 pb-2 lg:pb-4">
              <h3 className="font-semibold text-center text-xl lg:text-2xl">
                <SplitedTitle
                  text={features.items[1].title as string}
                  line2ClassName="text-gradient"
                  inline={false}
                />
              </h3>
            </div>
            <SmoothImage
              src={features.items[1].image}
              width={400}
              height={300}
              alt=""
              className="w-full h-full"
            />
          </article>
          <article className="grid bg-secondary">
            <div className="space-y-2 p-6 lg:p-10 pb-2 lg:pb-4">
              <h3 className="font-semibold text-xl lg:text-2xl">
                <SplitedTitle
                  text={features.items[2].title as string}
                  line2ClassName="text-gradient"
                />
              </h3>
              <p className="text-muted-foreground text-sm lg:text-base">
                {features.items[2].subtitle}
              </p>
            </div>
            <SmoothImage
              src={features.items[2].image}
              width={400}
              height={300}
              alt=""
              className="object-top w-full h-full"
            />
          </article>
          <article className="content-center grid bg-secondary p-6 lg:p-10">
            <SmoothImage src={features.items[3].image} alt="" />
          </article>
          <article className="grid grid-cols-2 bg-secondary">
            <div className="relative z-10 space-y-2 -mr-24 p-6 lg:p-10 self-end">
              <h3 className="font-semibold text-xl lg:text-2xl">
                <SplitedTitle
                  text={features.items[4].title as string}
                  line2ClassName="text-gradient"
                  inline={false}
                />
              </h3>
              <p className="text-muted-foreground text-sm lg:text-base">
                {features.items[4].subtitle}
              </p>
            </div>
            <SmoothImage
              src={features.items[4].image}
              width={400}
              height={300}
              alt=""
              className="object-left w-full h-full"
            />
          </article>
          <article className="grid bg-secondary">
            <div className="p-6 lg:p-10 pb-2 lg:pb-4">
              <h3 className="font-semibold text-xl lg:text-2xl">
                <SplitedTitle
                  text={features.items[5].title as string}
                  line2ClassName="text-gradient"
                  inline={false}
                />
              </h3>
            </div>
            <SmoothImage
              src={features.items[5].image}
              width={400}
              height={100}
              alt=""
              className="object-top w-full h-full"
            />
          </article>
        </div>
      </section>

      {/* Categories section */}
      {categories?.length && (
        <section className="flex flex-col gap-6 md:gap-12 py-12 p-6 md:p-16">
          <div className="flex md:flex-row flex-col justify-between items-center md:items-end gap-2">
            <h2 className="text-center md:text-left">
              <SplitedTitle
                text={category.header}
                line1ClassName="font-script text-5xl lg:text-6xl !leading-3"
                line2ClassName="font-bold font-modern text-2xl lg:text-3xl lowercase text-gradient"
                inline={false}
              />
            </h2>
            <p className="md:text-right max-w-[45ch] text-center text-muted-foreground text-sm lg:text-base tracking-wide">
              {category.subtitle}
            </p>
          </div>

          <div className="gap-6 grid grid-cols-1 md:grid-cols-[2fr_1.5fr_1.5fr] auto-rows-[minmax(12rem,_1fr)] min-h-[450px]">
            {category.items.map((category) => (
              <Link
                href={`/products`}
                key={category.id}
                className="relative bg-secondary first:rounded-ss-[5rem] overflow-hidden group isolate"
              >
                <SmoothImage
                  src={category.banner as string}
                  alt=""
                  fill={true}
                  className="group-hover:scale-[1.02]"
                />
                <div className="bottom-0 left-0 z-10 absolute p-6">
                  <span className="font-light text-muted-foreground text-sm lg:text-lg uppercase tracking-wide">
                    {category.title_en}
                  </span>
                  <h3 className="font-bold text-lg lg:text-2xl">
                    {category.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <Link
            className="text-sm lg:text-base btn-outline md:self-center self-stretch"
            href={`/products/`}
          >
            {category.button}
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </section>
      )}

      {/* Testimonials section */}
      {home?.quote && home?.partners.length && (
        <section className="space-y-6 md:space-y-12 py-12 p-6 md:p-16">
          <div className="gap-6 md:gap-12 grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col items-center md:items-start gap-2 md:gap-4">
              <h2 className="text-center md:text-left">
                <SplitedTitle
                  text={testimonials.header}
                  line1ClassName="font-script text-5xl lg:text-6xl !leading-3"
                  line2ClassName="font-bold font-modern text-2xl lg:text-3xl lowercase text-gradient"
                  inline={false}
                />
              </h2>
              <p className="max-w-[45ch] text-center text-muted-foreground text-sm md:text-left lg:text-base tracking-wide">
                {testimonials.subtitle}
              </p>
            </div>

            <div className="relative before:top-0 before:left-0 before:-z-10 before:absolute before:content-['“'] space-y-3 before:opacity-50 p-6 md:pr-0 before:font-extrabold md:before:text-[15rem] before:text-muted-foreground before:text-[10rem] before:leading-[0.6]">
              <p className="font-medium text-white text-xl lg:text-3xl">
                {(testimonials.quote as unknown as Quote).comment}
              </p>
              <p className="text-right text-sm lg:text-base">
                <span className="font-semibold">
                  {(testimonials.quote as unknown as Quote).author},
                </span>
                <br />
                <span className="text-muted-foreground">
                  {(testimonials.quote as unknown as Quote).job}
                </span>
              </p>
            </div>
          </div>

          {testimonials.partners && testimonials.partners.length > 0 && (
            <div
              className="relative h-12 overflow-hidden faded-sides group"
              style={
                {
                  '--left': `${20}`,
                  '--right': `${80}`,
                } as React.CSSProperties
              }
            >
              {testimonials.partners.map((src, index, array) => (
                <SmoothImage
                  key={index}
                  src={src}
                  width={500}
                  height={125}
                  alt=""
                  className="group-hover:paused -left-1/2 absolute w-auto h-full animate-slide cursor-pointer grayscale hover:grayscale-0"
                  style={
                    {
                      '--speed': `${15}`,
                      '--quantity': `${array.length}`,
                      '--index': `${index}`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Articles section */}
      {articles?.length && (
        <section className="space-y-6 md:space-y-12 py-12 p-6 md:p-16">
          <div className="flex md:flex-row flex-col justify-between items-center md:items-end gap-2">
            <h2 className="text-center md:text-left">
              <SplitedTitle
                text={article.header}
                line1ClassName="font-script text-5xl lg:text-6xl !leading-3"
                line2ClassName="font-bold font-modern text-2xl lg:text-3xl lowercase text-gradient"
                inline={false}
              />
            </h2>
            <p className="md:text-right max-w-[45ch] text-center text-muted-foreground text-sm lg:text-base tracking-wide">
              {article.subtitle}
            </p>
          </div>

          <div className="gap-6 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
            <article className="gap-4 md:gap-6 grid grid-cols-2">
              <Link
                className="relative col-span-2 bg-secondary rounded-ss-[5rem] overflow-hidden group"
                href={`/articles/${article.items[0].id}`}
              >
                <SmoothImage
                  className="group-hover:scale-[1.01] w-full h-full min-h-[200px] transition-transform"
                  src={article.items[0].banner}
                  width={900}
                  height={250}
                  alt=""
                />
              </Link>
              <h3 className="col-span-2 md:col-span-1 font-bold text-foreground text-xl lg:text-2xl">
                {article.items[0].title}
              </h3>
              <div className="flex flex-row md:flex-col gap-6 col-span-2 md:col-span-1">
                <p className="line-clamp-3 text-muted-foreground text-sm lg:text-base">
                  {article.items[0].description}
                </p>
                <Link
                  className="text-sm lg:text-base btn-outline self-start"
                  href={`/articles/${article.items[0].id}`}
                >
                  Đọc tiếp
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </article>

            <div className="flex flex-col gap-6 bg-secondary p-6">
              {article.items.slice(1).map((article, index) => (
                <Link
                  className="group"
                  href={`/articles/${article.id}`}
                  key={index}
                >
                  <article>
                    <span className="font-light text-muted-foreground text-xs lg:text-sm uppercase">
                      {article?.Topic?.title || 'bài viết'}
                    </span>
                    <h3 className="font-bold text-foreground text-sm lg:text-base group-hover:underline">
                      {article.title}
                    </h3>
                  </article>
                </Link>
              ))}

              <Link
                className="inline-flex items-center mt-auto text-muted-foreground text-sm lg:text-base hover:text-foreground transition-colors"
                href={'/articles'}
              >
                {article.button}
                <span className="material-symbols-outlined">chevron_right</span>
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
