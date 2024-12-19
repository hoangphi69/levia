import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const home: Prisma.HomeCreateInput = {
  profile: 'default',
  hero_image: 'https://picsum.photos/1280/300',
  featured_product: {
    connect: {
      model: 'LV298',
    },
  },
  featured_image: 'https://picsum.photos/500',
  featured_feature_1: {
    'Hộ gia đình tin dùng': '3000+',
  },
  featured_feature_2: {
    'Công suất tối đa': '2400W',
  },
  featured_feature_3: {
    'Con số gì đó nổi bật': '69',
  },
  feature_1: 'https://picsum.photos/500',
  feature_2: 'https://picsum.photos/500',
  feature_3: 'https://picsum.photos/500',
  feature_4: 'https://picsum.photos/500',
  feature_5: 'https://picsum.photos/500',
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
};

const faqs: Prisma.FaqCreateInput[] = [
  {
    q: 'Tôi có thể mua sản phẩm ở đâu?',
    a: "Bạn có thể mua sản phẩm của chúng tôi thông qua trang web chính thức hoặc tại các đại lý phân phối uy tín trên toàn quốc. Danh sách các đại lý có thể được tìm thấy trong phần 'Liên Hệ' hoặc 'Đại Lý' trên trang web",
  },
  {
    q: 'Sản phẩm bếp điện có tiết kiệm năng lượng không?',
    a: "Bạn có thể mua sản phẩm của chúng tôi thông qua trang web chính thức hoặc tại các đại lý phân phối uy tín trên toàn quốc. Danh sách các đại lý có thể được tìm thấy trong phần 'Liên Hệ' hoặc 'Đại Lý' trên trang web",
  },
  {
    q: 'Chính sách bảo hành sản phẩm như thế nào?',
    a: "Bạn có thể mua sản phẩm của chúng tôi thông qua trang web chính thức hoặc tại các đại lý phân phối uy tín trên toàn quốc. Danh sách các đại lý có thể được tìm thấy trong phần 'Liên Hệ' hoặc 'Đại Lý' trên trang web",
  },
  {
    q: 'Hỗ trợ kỹ thuật với sản phẩm?',
    a: "Bạn có thể mua sản phẩm của chúng tôi thông qua trang web chính thức hoặc tại các đại lý phân phối uy tín trên toàn quốc. Danh sách các đại lý có thể được tìm thấy trong phần 'Liên Hệ' hoặc 'Đại Lý' trên trang web",
  },
  {
    q: 'Làm thế nào để vệ sinh và bảo dưỡng bếp điện?',
    a: "Bạn có thể mua sản phẩm của chúng tôi thông qua trang web chính thức hoặc tại các đại lý phân phối uy tín trên toàn quốc. Danh sách các đại lý có thể được tìm thấy trong phần 'Liên Hệ' hoặc 'Đại Lý' trên trang web",
  },
];

const categories: Prisma.CategoryCreateInput[] = [
  {
    title: 'Bếp điện từ',
    title_en: 'induction hobs',
    banner: 'https://picsum.photos/1280/350',
    description:
      'Bếp điện từ kết hợp công nghệ hiện đại, thiết kế sang trọng và hiệu suất tối ưu. Đem lại trải nghiệm nấu nướng an toàn, tiết kiệm năng lượng và phù hợp với mọi gian bếp.',
  },
  {
    title: 'Máy hút mùi',
    title_en: 'kitchen hoods',
    banner: 'https://picsum.photos/1280/350',
    description:
      'Máy hút mùi cao cấp với thiết kế tinh tế, khả năng khử mùi hiệu quả, giữ không gian bếp luôn sạch sẽ và trong lành. Công nghệ hiện đại, vận hành êm ái, phù hợp với mọi phong cách bếp.',
  },
  {
    title: 'Đồ gia dụng',
    title_en: 'cookwares',
    banner: 'https://picsum.photos/1280/350',
    description:
      'Đồ gia dụng thông minh, tiện ích và bền bỉ, đáp ứng mọi nhu cầu sinh hoạt hằng ngày. Thiết kế tối ưu, tích hợp công nghệ tiên tiến, nâng cao chất lượng cuộc sống gia đình.',
  },
];

const products: Prisma.ProductCreateInput[] = [
  {
    model: 'LV298',
    images: ['https://picsum.photos/501', 'https://picsum.photos/502'],
    description:
      'Thiết kế bởi đội ngũ sáng tạo tài năng, để đem lại sự tiện nghi và sang trọng cho người dùng. Một đoạn text thể hiện các tính năng nổi bật của sản phẩm khiến cho họ ngay lập tức mua về cho vợ sử dụng.',
    title: 'Bếp từ đơn âm Levia LV298',
    price: 3990000,
    features: {
      'tính năng 1': 'con số hầm hố',
      'tính năng 2': 'chức năng nổi bật',
      'tính năng 3': 'ưu điểm vượt trội',
      'tính năng 4': 'tính năng hấp dẫn',
    },
    specs: {
      'thông số 1': 'con số hầm hố',
      'thông số 2': 'số nguyên nổi bật',
      'thông số 3': 'hằng số hấp dẫn',
      'thông số 4': 'số ảo tung chảo',
    },
    Category: {
      connect: {
        title: categories[0].title,
      },
    },
    media: {
      create: {
        title: 'Thiết kế hiện đại, tinh tế',
        subtitle:
          'Mô tả ngắn một đoạn văn ngắn gọn, nổi bật những điểm mạnh chính của sản phẩm. Mô tả ngắn một đoạn văn ngắn gọn, nổi bật những điểm mạnh chính của sản phẩm.',
        media_url: 'https://picsum.photos/400',
      },
    },
    reviews: {
      createMany: {
        data: [
          {
            rating: 5,
            comment:
              'Chưa bao giờ trong đời tôi đc sử dụng sản phẩm đỉnh cao ntn. Tôi chắc chắn sẽ mua cái nữa cho bà già nhà tôi.',
            author: 'Hoang Phi',
            image: 'https://picsum.photos/250/100',
          },
          {
            rating: 4,
            comment:
              'Chưa bao giờ trong đời tôi đc sử dụng sản phẩm đỉnh cao ntn. Tôi chắc chắn sẽ mua cái nữa cho bà già nhà tôi. Lorem ipsum iojwef  oij ij oiwef wef ioij o ioij oijew ofijwef iojewfo wefiow fi voijf weifj oweijf wfoi wiefjwiefoiw fwj',
            author: 'Kwan',
            image: 'https://picsum.photos/250/100',
          },
        ],
      },
    },
  },
  {
    model: 'LV397',
    images: ['https://picsum.photos/500', 'https://picsum.photos/450'],
    title: 'Bếp từ đơn âm Levia LV397',
    price: 2990000,
    Category: {
      connect: {
        title: categories[0].title,
      },
    },
  },
  {
    model: 'LV379',
    images: ['https://picsum.photos/500', 'https://picsum.photos/450'],
    title: 'Bếp từ đôi Levia LV379',
    price: 2990000,
    Category: {
      connect: {
        title: categories[0].title,
      },
    },
  },
  {
    model: 'LV99',
    images: ['https://picsum.photos/500', 'https://picsum.photos/450'],
    title: 'Bếp từ đôi Levia LV99',
    price: 2990000,
    Category: {
      connect: {
        title: categories[0].title,
      },
    },
  },
  {
    model: 'LV68PRO',
    images: ['https://picsum.photos/500', 'https://picsum.photos/450'],
    title: 'Bếp từ đôi Levia LV68PRO',
    price: 2990000,
    Category: {
      connect: {
        title: categories[0].title,
      },
    },
  },
  {
    model: 'LV368PRO',
    images: ['https://picsum.photos/500', 'https://picsum.photos/450'],
    title: 'Bếp từ đôi Levia LV368PRO',
    price: 2990000,
    Category: {
      connect: {
        title: categories[0].title,
      },
    },
  },
  {
    model: 'LV29',
    images: ['https://picsum.photos/500', 'https://picsum.photos/450'],
    title: 'Bếp từ đôi Levia LV29',
    price: 2990000,
    Category: {
      connect: {
        title: categories[0].title,
      },
    },
  },
  {
    model: 'LV269PRO',
    images: ['https://picsum.photos/500', 'https://picsum.photos/450'],
    title: 'Bếp từ đôi Levia LV269PRO',
    price: 2990000,
    Category: {
      connect: {
        title: categories[0].title,
      },
    },
  },
  {
    model: 'LV79DI',
    images: ['https://picsum.photos/500', 'https://picsum.photos/450'],
    title: 'Bếp từ đôi Levia LV79DI A.I',
    price: 2990000,
    Category: {
      connect: {
        title: categories[0].title,
      },
    },
  },
  {
    model: 'LV66',
    images: ['https://picsum.photos/500', 'https://picsum.photos/450'],
    title: 'Máy hút mùi Levia LV66',
    price: 2990000,
    Category: {
      connect: {
        title: categories[1].title,
      },
    },
  },
  {
    model: 'LV88',
    images: ['https://picsum.photos/500', 'https://picsum.photos/450'],
    title: 'Máy hút mùi Levia LV88',
    price: 2990000,
    Category: {
      connect: {
        title: categories[1].title,
      },
    },
  },
  {
    model: 'LV99',
    images: ['https://picsum.photos/500', 'https://picsum.photos/450'],
    title: 'Máy hút mùi Levia LV88',
    price: 2990000,
    Category: {
      connect: {
        title: categories[1].title,
      },
    },
  },
  {
    model: 'CW',
    images: ['https://picsum.photos/500', 'https://picsum.photos/450'],
    title: 'Nồi từ Levia',
    price: 2990000,
    Category: {
      connect: {
        title: categories[2].title,
      },
    },
  },
];

const topics: Prisma.TopicCreateInput[] = [
  {
    title: 'Xu hướng',
  },
  {
    title: 'Sự kiện',
  },
  {
    title: 'Nấu ăn',
  },
  {
    title: 'Tips & Tricks',
  },
];

const articles: Prisma.ArticleCreateInput[] = [
  {
    title: 'Mẹo sử dụng bếp điện an toàn và hiệu quả',
    author: 'Trần Kwan',
    banner: 'https://picsum.photos/1280/350',
    created_at: new Date('12/12/2024'),
    Topic: {
      connect: {
        title: topics[3].title,
      },
    },
    content: {
      blocks: [],
    },
    description:
      'Câu Chuyện Thương Hiệu Và Khởi Nguồn Từ Đam Mê". Giới thiệu về quá trình hình thành và phát triển của công ty, bắt đầu từ niềm đam mê với công nghệ nhà bếp hiện đại. Đề cập đến những cột mốc quan trọng, như năm thành lập,',
  },
  {
    title: 'Levia Ra Mắt Sản Phẩm Bếp Điện Thế Hệ Mới - Hiệu Suất Vượt Trội',
    Topic: {
      connect: {
        title: topics[1].title,
      },
    },
  },
  {
    title: 'Levia Ra Mắt Sản Phẩm Bếp Điện Thế Hệ Mới - Hiệu Suất Vượt Trội',
  },
  {
    title: 'Levia Ra Mắt Sản Phẩm Bếp Điện Thế Hệ Mới',
  },
  {
    title: 'Sản Phẩm Bếp Điện Thế Hệ Mới - Hiệu Suất Vượt Trội',
  },
  {
    title: 'Levia Ra Mắt Sản Phẩm Hiệu Suất Vượt Trội',
  },
  {
    title:
      'Levia Ra Mắt Sản Phẩm Bếp Điện Thế Hệ Mới - Hiệu Suất Vượt Trội Levia Ra Mắt Sản Phẩm Bếp Điện Thế Hệ Mới - Hiệu Suất Vượt Trội',
  },
];

const agencies: Prisma.AgencyCreateInput[] = [
  {
    title: 'Đại học Văn Lang - Campus 3',
    lat: 10.82765550545538,
    lng: 106.70006871018364,
    location:
      '69/68 Đ. Đặng Thuỳ Trâm, Phường 13, Bình Thạnh, Hồ Chí Minh 70000, Vietnam',
    image: 'https://picsum.photos./200',
    phone: '02871059999',
    email: 'info@vlu.edu.vn',
  },
  {
    title: 'Cửa hàng 1',
    lat: 10.831298553692376,
    lng: 106.69978672072827,
  },
  {
    title: 'Cửa hàng 2',
    lat: 10.827634427824027,
    lng: 106.68918103858239,
  },
  {
    title: 'Cửa hàng 3',
    lat: 10.824053624907288,
    lng: 106.68674621582426,
  },
];

async function main() {
  console.log('Empty database...');

  await prisma.home.deleteMany();
  await prisma.faq.deleteMany();
  await prisma.category.deleteMany();
  await prisma.product.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.article.deleteMany();
  await prisma.agency.deleteMany();

  console.log('Start seeding...');

  for (const faq of faqs) {
    const newFAQ = await prisma.faq.create({ data: faq });
    console.log(`Created faq with id: ${newFAQ.id}`);
  }

  for (const category of categories) {
    const newCategory = await prisma.category.upsert({
      where: { title: category.title },
      update: category,
      create: category,
    });
    console.log(`Created category with id: ${newCategory.id}`);
  }

  for (const product of products) {
    const newProduct = await prisma.product.upsert({
      where: { model: product.model },
      update: product,
      create: product,
    });
    console.log(`Created product with id: ${newProduct.id}`);
  }

  for (const topic of topics) {
    const newTopic = await prisma.topic.upsert({
      where: { title: topic.title },
      update: topic,
      create: topic,
    });
    console.log(`Created topic with id: ${newTopic.id}`);
  }

  for (const article of articles) {
    const newArticle = await prisma.article.create({ data: article });
    console.log(`Created article with id: ${newArticle.id}`);
  }

  for (const agency of agencies) {
    const newAgency = await prisma.agency.create({ data: agency });
    console.log(`Created agency with id: ${newAgency.id}`);
  }

  const newHome = await prisma.home.create({ data: home });
  console.log(`Created home with id: ${newHome.id}`);

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
