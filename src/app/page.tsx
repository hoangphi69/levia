import Link from 'next/link';

export default function Home() {
  const content = {
    header1: 'Giải pháp cho căn bếp',
    header2: 'Hiện đại',
    subtitle:
      'Thiết kế tinh tế. Hiệu suất vượt trội. Trải nghiệm nấu nướng đẳng cấp.',
    hero: 'https://picsum.photos/1200/300',

    featured_product: {
      id: '3000',
      title: 'Bếp từ đôi Levia LV-3000',
      description:
        'Thiết kế bởi đội ngũ sáng tạo tài năng, để đem lại sự tiện nghi và sang trọng cho người dùng. Một đoạn text thể hiện các tính năng nổi bật của sản phẩm khiến cho họ ngay lập tức mua về cho vợ sử dụng.',
      image: 'https://picsum.photos/450',
      feature1: {
        title: 'Hộ gia đình tin dùng',
        details: '300+',
      },
      feature2: {
        title: 'Con số gì đó nổi bật',
        details: '69',
      },
      feature3: {
        title: 'Công suất tối đa',
        details: '2400W',
      },
    },

    features: {
      subtitle:
        'Thiết kế bởi đội ngũ sáng tạo tài năng, kết hợp công nghệ đỉnh cao để đem lại sự tiện nghi và sang trọng cho người dùng',
    },

    categories: {
      subtitle:
        'Những sản phẩm được thiết kế tỉ mỉ, mang đến sự tiện nghi và sang trọng cho căn bếp của mỗi gia đình.',
      category1_image: 'https://picsum.photos./500',
      category2_image: 'https://picsum.photos./500',
      category3_image: 'https://picsum.photos./500',
    },

    testimonials: {
      subtitle:
        'Chúng tôi không chỉ cung cấp sản phẩm, mà còn mang đến trải nghiệm hài lòng, cùng với sự uy tín tới những người đồng hành.',
      quote: {
        comment:
          'Chưa bao giờ trong đời tôi đc sử dụng sản phẩm đỉnh cao ntn. Tôi chắc chắn sẽ mua cái nữa cho bà già nhà tôi.',
        author: 'Trần Tuấn Minh',
        job: 'Tổ trưởng tổ dân phố',
      },
      partners: [
        'https://picsum.photos/200/50',
        'https://picsum.photos/200/50',
        'https://picsum.photos/200/50',
        'https://picsum.photos/200/50',
        'https://picsum.photos/200/50',
      ],
    },

    articles: {
      subtitle:
        'Giữ vững đam mê nấu nướng với những cập nhật mới nhất, bài viết chia sẻ và các sự kiện không thể bỏ lỡ.',
      articles: [
        {
          id: '69',
          topic: 'Xu hướng',
          title:
            'Levia Ra Mắt Sản Phẩm Bếp Điện Thế Hệ Mới - Hiệu Suất Vượt Trội',
          description:
            'Phần 1: Câu Chuyện Thương Hiệu. Tiêu đề phụ: "Khởi Nguồn Từ Đam Mê". Nội dung: Giới thiệu về quá trình hình thành và phát triển của công ty, bắt đầu từ niềm đam mê với công nghệ nhà bếp hiện đại. Đề cập đến những cột mốc quan trọng, như năm thành lập,',
          banner: 'https://picsum.photos/750/250',
        },
        {
          id: '69',
          topic: 'Xu hướng',
          title: 'Xu hướng thiết kế nhà bếp 2024 - Sự Lên Ngôi Của Sự Tinh Tế',
          description:
            'Phần 1: Câu Chuyện Thương Hiệu. Tiêu đề phụ: "Khởi Nguồn Từ Đam Mê". Nội dung: Giới thiệu về quá trình hình thành và phát triển của công ty, bắt đầu từ niềm đam mê với công nghệ nhà bếp hiện đại. Đề cập đến những cột mốc quan trọng, như năm thành lập,',
        },
        {
          id: '69',
          topic: 'Hướng dẫn',
          title:
            'Levia Ra Mắt Sản Phẩm Bếp Điện Thế Hệ Mới - Hiệu Suất Vượt Trội',
          description:
            'Phần 1: Câu Chuyện Thương Hiệu. Tiêu đề phụ: "Khởi Nguồn Từ Đam Mê". Nội dung: Giới thiệu về quá trình hình thành và phát triển của công ty, bắt đầu từ niềm đam mê với công nghệ nhà bếp hiện đại. Đề cập đến những cột mốc quan trọng, như năm thành lập,',
        },
        {
          id: '69',
          topic: 'Món ngon',
          title: 'Điện Thế Hệ Mới, Hiệu Suất Vượt Trội',
          description:
            'Phần 1: Câu Chuyện Thương Hiệu. Tiêu đề phụ: "Khởi Nguồn Từ Đam Mê". Nội dung: Giới thiệu về quá trình hình thành và phát triển của công ty, bắt đầu từ niềm đam mê với công nghệ nhà bếp hiện đại. Đề cập đến những cột mốc quan trọng, như năm thành lập,',
        },
      ],
    },
  };

  const { featured_product, features, categories, testimonials, articles } =
    content;

  return (
    <div className="flex flex-col gap-20 p-6 text-slate-400">
      <section>
        <h1 className="font-bold text-4xl uppercase">
          {content.header1}
          <span className="font-medium font-script text-7xl normal-case">
            {content.header2}
          </span>
        </h1>

        <p>{content.subtitle}</p>

        <img src={content.hero} alt="" />

        <Link className="underline" href={'/about'}>
          Tìm hiểu về chúng tôi
        </Link>
      </section>

      {featured_product && (
        <section className="gap-4 grid grid-cols-2">
          <img src={featured_product.image} alt="Featured product" />
          <div className="flex flex-col gap-4">
            <h2 className="uppercase">Sản phẩm nổi bật</h2>
            <h3 className="font-bold text-3xl text-foreground">
              {featured_product.title}
            </h3>
            <p>{featured_product.description}</p>
            <Link
              className="border-slate-400 hover:bg-slate-900 p-4 border"
              href={`/products/${featured_product.id}`}
            >
              Khám phá sản phẩm
            </Link>
            <div className="flex gap-4">
              <div className="flex flex-col gap-4">
                <h3>{featured_product.feature1.title}</h3>
                <span className="font-bold text-3xl text-white">
                  {featured_product.feature1.details}
                </span>
              </div>
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
            </div>
          </div>
        </section>
      )}

      {features && (
        <section>
          <div className="flex justify-between">
            <h2 className="font-script text-6xl leading-3">
              Thiết kế độc đáo. <br />
              <span className="font-bold font-modern text-3xl lowercase">
                Công nghệ đỉnh cao
              </span>
            </h2>
            <p className="text-right max-w-96">{features.subtitle}</p>
          </div>

          <div className="gap-4 grid grid-cols-3 grid-rows-3 *:border">
            <div className="row-span-2 p-4">
              <h3 className="font-bold text-2xl text-white">Sò công suất</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
                accusamus?
              </p>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-2xl text-white">Sò công suất</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
                accusamus?
              </p>
            </div>
            <div className="row-span-2 p-4">
              <h3 className="font-bold text-2xl text-white">Sò công suất</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
                accusamus?
              </p>
            </div>
            <div className="p-4"></div>
            <div className="col-span-2 p-4">
              <h3 className="font-bold text-2xl text-white">Sò công suất</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
                accusamus?
              </p>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-2xl text-white">Sò công suất</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
                accusamus?
              </p>
            </div>
          </div>
        </section>
      )}

      {categories && (
        <section>
          <div className="flex justify-between">
            <h2 className="font-script text-6xl leading-3">
              Bộ sưu tập cho <br />
              <span className="font-bold font-modern text-3xl lowercase">
                Gian bếp hoàn hảo
              </span>
            </h2>
            <p className="text-right max-w-96">{categories.subtitle}</p>
          </div>

          <div className="gap-4 grid grid-cols-3">
            <div className="p-4 border">
              <img className="mb-4" src={categories.category1_image} alt="" />
              <span className="uppercase">Induction Hobs</span>
              <h3 className="font-bold text-2xl">Bếp điện từ</h3>
            </div>
            <div className="p-4 border">
              <img className="mb-4" src={categories.category1_image} alt="" />
              <span className="uppercase">Kitchen Hoods</span>
              <h3 className="font-bold text-2xl">Máy hút mùi</h3>
            </div>
            <div className="p-4 border">
              <img className="mb-4" src={categories.category1_image} alt="" />
              <span className="uppercase">Cookwares</span>
              <h3 className="font-bold text-2xl">Đồ gia dụng</h3>
            </div>
          </div>
        </section>
      )}

      {testimonials && (
        <section>
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-4">
              <h2 className="font-script text-6xl leading-3">
                Cùng nhau tạo nên <br />
                <span className="font-bold font-modern text-3xl lowercase">
                  Trải nghiệm khác biệt
                </span>
              </h2>
              <p className="max-w-96">{testimonials.subtitle}</p>
            </div>

            {testimonials.quote && (
              <div>
                <p className="text-white text-xl">
                  {testimonials.quote.comment}
                </p>
                <p className="text-right">
                  <span className="font-semibold">
                    {testimonials.quote.author},
                  </span>
                  <br />
                  <span>{testimonials.quote.job}</span>
                </p>
              </div>
            )}
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

      {articles && (
        <section>
          <div className="flex justify-between">
            <h2 className="font-script text-6xl leading-3">
              Vòng quanh <br />
              <span className="font-bold font-modern text-3xl lowercase">
                thế giới ẩm thực
              </span>
            </h2>
            <p className="text-right max-w-96">{articles.subtitle}</p>
          </div>

          <div className="gap-4 grid grid-cols-3">
            <article className="gap-4 grid grid-cols-2 col-span-2">
              <img
                className="col-span-2 w-full"
                src={articles.articles[0].banner}
                alt=""
              />
              <h3 className="font-bold text-white text-xl">
                {articles.articles[0].title}
              </h3>
              <div>
                <p className="mb-6 line-clamp-3">
                  {articles.articles[0].description}
                </p>
                <Link
                  className="border-slate-400 hover:bg-slate-900 p-4 border"
                  href={`/articles/${articles.articles[0].id}`}
                >
                  Đọc tiếp
                </Link>
              </div>
            </article>

            <div className="flex flex-col gap-4 p-4 border">
              {articles.articles.slice(1).map((article, index) => (
                <Link href={`/articles/${article.id}`} key={index}>
                  <article>
                    <span className="uppercase">{article.topic}</span>
                    <h3 className="font-bold text-white">{article.title}</h3>
                  </article>
                </Link>
              ))}

              <Link href={'/articles'}>Khám phá thêm </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
