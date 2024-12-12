import Link from 'next/link';
import prisma from './lib/prisma';
import { SplitedTitle } from './lib/utils';

interface Quote {
  comment: string;
  author: string;
  job: string;
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
      button: 'Tìm hiểu về chúng tôi',
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
      },
    },

    features: {
      header: 'Thiết kế độc đáo.\nCông nghệ đỉnh cao',
      subtitle:
        'Thiết kế bởi đội ngũ sáng tạo tài năng, kết hợp công nghệ đỉnh cao để đem lại sự tiện nghi và sang trọng cho người dùng',
      items: [
        home?.feature_1,
        home?.feature_2,
        home?.feature_3,
        home?.feature_4,
        home?.feature_5,
      ],
    },

    category: {
      header: 'Bộ sưu tập cho\ngian bếp hoàn hảo',
      subtitle:
        'Những sản phẩm được thiết kế tỉ mỉ, mang đến sự tiện nghi và sang trọng cho căn bếp của mỗi gia đình.',
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
    <div className="flex flex-col gap-20 p-6 text-slate-400">
      <section>
        <h1>
          <SplitedTitle
            text={hero.header}
            line1ClassName="font-bold font-modern text-4xl uppercase"
            line2ClassName="font-medium font-script text-7xl normal-case"
          />
        </h1>
        <p>{hero.subtitle}</p>
        <img src={hero.image} alt="" />
        <Link className="underline" href={'/about'}>
          {hero.button}
        </Link>
      </section>

      {home?.featured_product && (
        <section className="gap-4 grid grid-cols-2">
          <img src={featured.product.image} alt="Featured product" />
          <div className="flex flex-col gap-4">
            <h2 className="uppercase">{featured.header}</h2>
            <h3 className="font-bold text-3xl text-foreground">
              {featured.product.title}
            </h3>
            <p>{featured.product.description}</p>
            <Link
              className="border-slate-400 hover:bg-slate-900 p-4 border"
              href={`/products/${featured.product.id}`}
            >
              {featured.button}
            </Link>
            {/* <div className="flex gap-4">
              {Object.entries(JSON.stringify(home.featured_feature_1)).map(
                ([key, value], index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <h3>{key}</h3>
                    <span className="font-bold text-3xl text-white">
                      {value}
                    </span>
                  </div>
                )
              )}
              <div className="flex flex-col gap-4">
                <h3>{featured_product.feature2.title}</h3>
                <span className="font-bold text-3xl text-white">
                  {featured_product.feature2.details}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <h3>{featured_product.feature3.title}</h3>
                <span className="font-bold text-3xl text-white">
                  {featured_product.feature3.details}
                </span>
              </div>
            </div> */}
          </div>
        </section>
      )}

      {home?.feature_1 &&
        home?.feature_2 &&
        home?.feature_3 &&
        home?.feature_4 &&
        home?.feature_5 && (
          <section>
            <div className="flex justify-between">
              <h2>
                <SplitedTitle
                  text={features.header}
                  line1ClassName="font-script text-6xl leading-3"
                  line2ClassName="font-bold font-modern text-3xl lowercase"
                  inline={false}
                />
              </h2>
              <p className="text-right max-w-96">{features.subtitle}</p>
            </div>

            <div className="gap-4 grid grid-cols-3 grid-rows-3 *:border">
              <div className="row-span-2 p-4">
                <img src={features.items[0] || undefined} alt="" />
              </div>
              <div className="p-4">
                <img src={features.items[2] || undefined} alt="" />
              </div>
              <div className="row-span-2 p-4">
                <img src={features.items[3] || undefined} alt="" />
              </div>
              <div className="p-4"></div>
              <div className="col-span-2 p-4">
                <img src={features.items[4] || undefined} alt="" />
              </div>
              <div className="p-4">
                <img src={features.items[5] || undefined} alt="" />
              </div>
            </div>
          </section>
        )}

      {categories?.length && (
        <section>
          <div className="flex justify-between">
            <h2>
              <SplitedTitle
                text={category.header}
                line1ClassName="font-script text-6xl leading-3"
                line2ClassName="font-bold font-modern text-3xl lowercase"
                inline={false}
              />
            </h2>
            <p className="text-right max-w-96">{category.subtitle}</p>
          </div>

          <div className="gap-4 grid grid-cols-3">
            {category.items.map((category) => (
              <div key={category.id} className="p-4 border">
                <img
                  className="mb-4"
                  src={category.banner || undefined}
                  alt=""
                />
                <span className="uppercase">{category.title_en}</span>
                <h3 className="font-bold text-2xl">{category.title}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      {home?.quote && home?.partners.length && (
        <section>
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-4">
              <h2 className="font-script text-6xl leading-3">
                <SplitedTitle
                  text={testimonials.header}
                  line1ClassName="font-script text-6xl leading-3"
                  line2ClassName="font-bold font-modern text-3xl lowercase"
                  inline={false}
                />
              </h2>
              <p className="max-w-96">{testimonials.subtitle}</p>
            </div>

            <div>
              <p className="text-white text-xl">
                {(testimonials.quote as unknown as Quote).comment}
              </p>
              <p className="text-right">
                <span className="font-semibold">
                  {(testimonials.quote as unknown as Quote).author}
                </span>
                <br />
                <span>{(testimonials.quote as unknown as Quote).job}</span>
              </p>
            </div>
          </div>

          {testimonials.partners && (
            <ul className="flex gap-4 mt-4">
              {testimonials.partners.map((partner, index) => (
                <li key={index}>
                  <img src={partner} alt="" />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {articles?.length && (
        <section>
          <div className="flex justify-between">
            <h2>
              <SplitedTitle
                text={article.header}
                line1ClassName="font-script text-6xl leading-3"
                line2ClassName="font-bold font-modern text-3xl lowercase"
                inline={false}
              />
            </h2>
            <p className="text-right max-w-96">{article.subtitle}</p>
          </div>

          <div className="gap-4 grid grid-cols-3">
            <article className="gap-4 grid grid-cols-2 col-span-2">
              <img
                className="col-span-2 w-full"
                src={article.items[0].banner}
                alt=""
              />
              <h3 className="font-bold text-white text-xl">
                {article.items[0].title}
              </h3>
              <div>
                <p className="mb-6 line-clamp-3">
                  {article.items[0].description}
                </p>
                <Link
                  className="border-slate-400 hover:bg-slate-900 p-4 border"
                  href={`/articles/${article.items[0].id}`}
                >
                  Đọc tiếp
                </Link>
              </div>
            </article>

            <div className="flex flex-col gap-4 p-4 border">
              {article.items.slice(1).map((article, index) => (
                <Link href={`/articles/${article.id}`} key={index}>
                  <article>
                    <span className="uppercase">{article?.Topic?.title}</span>
                    <h3 className="font-bold text-white">{article.title}</h3>
                  </article>
                </Link>
              ))}

              <Link href={'/articles'}>{article.button}</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
