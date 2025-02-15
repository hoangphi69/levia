import Banner from '../../components/banner';
import SmoothImage from '../../components/smooth-image';
import { SplitedTitle } from '../../lib/utils';

export default function About() {
  const banner = {
    title: 'Niềm cảm hứng\nđến từ căn bếp',
    image: '../images/products-banner.png',
    breadcrumb: [
      {
        display: 'Trang chủ',
        href: '/',
      },
      {
        display: 'Giới thiệu',
      },
    ],
  };

  return (
    <main>
      <Banner image={banner.image} breadcrumb={banner.breadcrumb}>
        <header className="flex-1 content-center md:content-end space-y-2">
          <h1 className="text-center md:text-left">
            <SplitedTitle
              text={banner.title}
              line1ClassName="font-script text-5xl lg:text-7xl !leading-3"
              line2ClassName="font-bold font-modern text-2xl lg:text-4xl text-gradient"
              inline={false}
            />
          </h1>
        </header>
      </Banner>

      <section className="gap-4 grid md:grid-cols-[1fr_2fr] mx-auto px-5 md:px-16 py-6 md:py-12">
        <header>
          <h2 className="font-bold text-4xl">
            <SplitedTitle
              text={'Câu chuyện\nthương hiệu'}
              line1ClassName="text-muted-foreground"
              inline={false}
            />
          </h2>
        </header>
        <div className="space-y-4 text-base text-muted-foreground">
          <p className="font-semibold text-foreground text-xl">
            Giới thiệu về quá trình hình thành và phát triển của công ty, bắt
            đầu từ niềm đam mê với công nghệ nhà bếp hiện đại. Đề cập đến những
            cột mốc quan trọng và sự phát triển.
          </p>
          <p>
            Phần 1: Câu Chuyện Thương Hiệu. Tiêu đề phụ: "Khởi Nguồn Từ Đam Mê".
            Nội dung: Giới thiệu về quá trình hình thành và phát triển của công
            ty, bắt đầu từ niềm đam mê với công nghệ nhà bếp hiện đại. Đề cập
            đến những cột mốc quan trọng, như năm thành lập, những thành tựu
            đáng chú ý, và sự phát triển qua các giai đoạn. Hình ảnh: Hình ảnh
            lịch sử, văn phòng đầu tiên, đội ngũ sáng lập, hoặc các sản phẩm đầu
            tiên.
          </p>
          <p>
            Phần 1: Câu Chuyện Thương Hiệu. Tiêu đề phụ: "Khởi Nguồn Từ Đam Mê".
            Nội dung: Giới thiệu về quá trình hình thành và phát triển của công
            ty, bắt đầu từ niềm đam mê với công nghệ nhà bếp hiện đại. Đề cập
            đến những cột mốc quan trọng, như năm thành lập, những thành tựu
            đáng chú ý, và sự phát triển qua các giai đoạn. Hình ảnh: Hình ảnh
            lịch sử, văn phòng đầu tiên, đội ngũ sáng lập, hoặc các sản phẩm đầu
            tiên. Phần 1: Câu Chuyện Thương Hiệu. Tiêu đề phụ: "Khởi Nguồn Từ
            Đam Mê". Nội dung: Giới thiệu về quá trình hình thành và phát triển
            của công ty, bắt đầu từ niềm đam mê với công nghệ nhà bếp hiện đại.
            Đề cập đến những cột mốc quan trọng, như năm thành lập, những thành
            tựu đáng chú ý, và sự phát triển qua các giai đoạn. Hình ảnh: Hình
            ảnh lịch sử, văn phòng đầu tiên, đội ngũ sáng lập, hoặc các sản phẩm
            đầu tiên.
          </p>
        </div>
      </section>

      <section className="py-4">
        <figure>
          <SmoothImage
            className="w-full max-h-[500px]"
            src={'https://picsum.photos/1280/500'}
            width={1280}
            height={500}
            alt=""
          />
          <figcaption className="mt-4 text-center text-muted-foreground text-sm italic">
            Phần 1: Câu Chuyện Thương Hiệu. Tiêu đề phụ: "Khởi Nguồn Từ Đam Mê".
          </figcaption>
        </figure>
      </section>

      <section className="gap-4 grid md:grid-cols-[1fr_2fr] mx-auto px-5 md:px-16 py-6 md:py-12">
        <header>
          <h2 className="font-bold text-4xl">
            <SplitedTitle
              text={'Sứ mệnh &\ntầm nhìn'}
              line1ClassName="text-muted-foreground"
              inline={false}
            />
          </h2>
        </header>
        <div className="space-y-4 text-base text-muted-foreground">
          <p>
            Phần 1: Câu Chuyện Thương Hiệu. Tiêu đề phụ: "Khởi Nguồn Từ Đam Mê".
            Nội dung: Giới thiệu về quá trình hình thành và phát triển của công
            ty, bắt đầu từ niềm đam mê với công nghệ nhà bếp hiện đại. Đề cập
            đến những cột mốc quan trọng, như năm thành lập, những thành tựu
            đáng chú ý, và sự phát triển qua các giai đoạn. Hình ảnh: Hình ảnh
            lịch sử, văn phòng đầu tiên, đội ngũ sáng lập, hoặc các sản phẩm đầu
            tiên.
          </p>
          <p>
            Phần 1: Câu Chuyện Thương Hiệu. Tiêu đề phụ: "Khởi Nguồn Từ Đam Mê".
            Nội dung: Giới thiệu về quá trình hình thành và phát triển của công
            ty, bắt đầu từ niềm đam mê với công nghệ nhà bếp hiện đại. Đề cập
            đến những cột mốc quan trọng, như năm thành lập, những thành tựu
            đáng chú ý, và sự phát triển qua các giai đoạn. Hình ảnh: Hình ảnh
            lịch sử, văn phòng đầu tiên, đội ngũ sáng lập, hoặc các sản phẩm đầu
            tiên. Phần 1: Câu Chuyện Thương Hiệu. Tiêu đề phụ: "Khởi Nguồn Từ
            Đam Mê". Nội dung: Giới thiệu về quá trình hình thành và phát triển
            của công ty, bắt đầu từ niềm đam mê với công nghệ nhà bếp hiện đại.
            Đề cập đến những cột mốc quan trọng, như năm thành lập, những thành
            tựu đáng chú ý, và sự phát triển qua các giai đoạn. Hình ảnh: Hình
            ảnh lịch sử, văn phòng đầu tiên, đội ngũ sáng lập, hoặc các sản phẩm
            đầu tiên.
          </p>
        </div>
      </section>

      <section className="gap-4 grid md:grid-cols-[1fr_2fr] mx-auto px-5 md:px-16 py-6 md:py-12">
        <h2 className="font-bold text-4xl">
          <SplitedTitle
            text={'Đội ngũ của\nchúng tôi'}
            line1ClassName="text-muted-foreground"
            inline={false}
          />
        </h2>
        <div className="space-y-4 text-base text-muted-foreground">
          <p>
            Phần 1: Câu Chuyện Thương Hiệu. Tiêu đề phụ: "Khởi Nguồn Từ Đam Mê".
            Nội dung: Giới thiệu về quá trình hình thành và phát triển của công
            ty, bắt đầu từ niềm đam mê với công nghệ nhà bếp hiện đại. Đề cập
            đến những cột mốc quan trọng, như năm thành lập, những thành tựu
            đáng chú ý, và sự phát triển qua các giai đoạn. Hình ảnh: Hình ảnh
            lịch sử, văn phòng đầu tiên, đội ngũ sáng lập, hoặc các sản phẩm đầu
            tiên.
          </p>

          <figure className="flex flex-col gap-4">
            <q className="after:content-[close-quote] font-semibold text-foreground text-xl">
              Giới thiệu về quá trình hình thành và phát triển của công ty, bắt
              đầu từ niềm đam mê với công nghệ nhà bếp hiện đại.
            </q>
            <figcaption className="text-right text-foreground text-lg self-end">
              <span className="font-bold">&mdash; Mr. Tuấn Minh</span>,{' '}
              <cite>Co-founder Levia</cite>
            </figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}
