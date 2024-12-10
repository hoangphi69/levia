import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Banner from '../components/banner';

export default function About() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator></BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Giới thiệu</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Banner
        title={
          <>
            <span className="block -mb-6 md:-mb-8 font-normal font-script text-6xl text-light-1 md:text-8xl">
              Niềm cảm hứng
            </span>
            <span className="text-4xl">Đến từ căn bếp</span>
          </>
        }
        image={'https://picsum.photos/1280/350'}
      />

      <section className="gap-4 grid md:grid-cols-[1fr_2fr] mx-auto px-5 md:px-16 py-6 md:py-12">
        <h2 className="font-bold text-h2">
          <span className="md:block text-light-1">Câu chuyện</span>{' '}
          <span className="text-gray-1">thương hiệu</span>
        </h2>
        <div className="space-y-4 text-base text-gray-1">
          <p className="font-bold text-h4 text-light-1">
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
          <img
            className="w-full max-h-[500px] object-center object-cover"
            src={'https://picsum.photos/500'}
            alt=""
          />
          <figcaption className="mt-2 text-center text-h6 italic">
            Phần 1: Câu Chuyện Thương Hiệu. Tiêu đề phụ: "Khởi Nguồn Từ Đam Mê".
          </figcaption>
        </figure>
      </section>

      <section className="gap-4 grid md:grid-cols-[1fr_2fr] mx-auto px-5 md:px-16 py-6 md:py-12">
        <h2 className="font-bold text-h2">
          <span className="md:block text-light-1">Sứ mệnh &amp;</span>{' '}
          <span className="text-gray-1">tầm nhìn</span>
        </h2>
        <div className="space-y-4 text-base text-gray-1">
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
        <h2 className="font-bold text-h2">
          <span className="md:block text-light-1">Đội ngũ của</span>{' '}
          <span className="text-gray-1">chúng tôi</span>
        </h2>
        <div className="space-y-4 text-base text-gray-1">
          <p>
            Phần 1: Câu Chuyện Thương Hiệu. Tiêu đề phụ: "Khởi Nguồn Từ Đam Mê".
            Nội dung: Giới thiệu về quá trình hình thành và phát triển của công
            ty, bắt đầu từ niềm đam mê với công nghệ nhà bếp hiện đại. Đề cập
            đến những cột mốc quan trọng, như năm thành lập, những thành tựu
            đáng chú ý, và sự phát triển qua các giai đoạn. Hình ảnh: Hình ảnh
            lịch sử, văn phòng đầu tiên, đội ngũ sáng lập, hoặc các sản phẩm đầu
            tiên.
          </p>

          <figure className="flex flex-col gap-2">
            <q className="after:content-[close-quote] font-bold text-h4 text-light-1">
              Giới thiệu về quá trình hình thành và phát triển của công ty, bắt
              đầu từ niềm đam mê với công nghệ nhà bếp hiện đại.
            </q>
            <figcaption className="text-right text-h5 text-light-1 self-end">
              <span className="font-bold">&mdash; Mr. Tuấn Minh</span>,{' '}
              <cite>Co-founder Levia</cite>
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
