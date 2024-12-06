import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const categories: Prisma.CategoryCreateInput[] = [
  {
    title: 'Bếp điện từ',
    title_en: 'induction hobs',
    description:
      'Bếp điện từ kết hợp công nghệ hiện đại, thiết kế sang trọng và hiệu suất tối ưu. Đem lại trải nghiệm nấu nướng an toàn, tiết kiệm năng lượng và phù hợp với mọi gian bếp.',
  },
  {
    title: 'Máy hút mùi',
    title_en: 'kitchen hoods',
    description:
      'Máy hút mùi cao cấp với thiết kế tinh tế, khả năng khử mùi hiệu quả, giữ không gian bếp luôn sạch sẽ và trong lành. Công nghệ hiện đại, vận hành êm ái, phù hợp với mọi phong cách bếp.',
  },
  {
    title: 'Đồ gia dụng',
    title_en: 'cookwares',
    description:
      'Đồ gia dụng thông minh, tiện ích và bền bỉ, đáp ứng mọi nhu cầu sinh hoạt hằng ngày. Thiết kế tối ưu, tích hợp công nghệ tiên tiến, nâng cao chất lượng cuộc sống gia đình.',
  },
];

const products: Prisma.ProductCreateInput[] = [
  {
    model: 'LV298',
    title: 'Bếp từ đơn âm Levia LV298',
    price: 3990000,
    Category: {
      connect: {
        title_en: categories[0].title_en,
      },
    },
    ProductMedia: {
      create: {
        title: 'Thiết kế hiện đại, tinh tế',
        subtitle:
          'Mô tả ngắn một đoạn văn ngắn gọn, nổi bật những điểm mạnh chính của sản phẩm. Mô tả ngắn một đoạn văn ngắn gọn, nổi bật những điểm mạnh chính của sản phẩm.',
        media_url: 'https://picsum.photos/400',
      },
    },
    ProductReview: {
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
    title: 'Bếp từ đơn âm Levia LV397',
    price: 2990000,
    Category: {
      connect: {
        title_en: categories[0].title_en,
      },
    },
  },
  {
    model: 'LV379',
    title: 'Bếp từ đôi Levia LV379',
    price: 2990000,
    Category: {
      connect: {
        title_en: categories[0].title_en,
      },
    },
  },
  {
    model: 'LV99',
    title: 'Bếp từ đôi Levia LV99',
    price: 2990000,
    Category: {
      connect: {
        title_en: categories[0].title_en,
      },
    },
  },
  {
    model: 'LV68PRO',
    title: 'Bếp từ đôi Levia LV68PRO',
    price: 2990000,
    Category: {
      connect: {
        title_en: categories[0].title_en,
      },
    },
  },
  {
    model: 'LV368PRO',
    title: 'Bếp từ đôi Levia LV368PRO',
    price: 2990000,
    Category: {
      connect: {
        title_en: categories[0].title_en,
      },
    },
  },
  {
    model: 'LV29',
    title: 'Bếp từ đôi Levia LV29',
    price: 2990000,
    Category: {
      connect: {
        title_en: categories[0].title_en,
      },
    },
  },
  {
    model: 'LV269PRO',
    title: 'Bếp từ đôi Levia LV269PRO',
    price: 2990000,
    Category: {
      connect: {
        title_en: categories[0].title_en,
      },
    },
  },
  {
    model: 'LV79DI',
    title: 'Bếp từ đôi Levia LV79DI A.I',
    price: 2990000,
    Category: {
      connect: {
        title_en: categories[0].title_en,
      },
    },
  },
  {
    model: 'LV66',
    title: 'Máy hút mùi Levia LV66',
    price: 2990000,
    Category: {
      connect: {
        title_en: categories[1].title_en,
      },
    },
  },
  {
    model: 'LV88',
    title: 'Máy hút mùi Levia LV88',
    price: 2990000,
    Category: {
      connect: {
        title_en: categories[1].title_en,
      },
    },
  },
  {
    model: 'LV99',
    title: 'Máy hút mùi Levia LV88',
    price: 2990000,
    Category: {
      connect: {
        title_en: categories[1].title_en,
      },
    },
  },
  {
    model: 'CW',
    title: 'Nồi từ Levia',
    price: 2990000,
    Category: {
      connect: {
        title_en: categories[2].title_en,
      },
    },
  },
];

async function main() {
  console.log('Start seeding...');

  for (const category of categories) {
    const newCategory = await prisma.category.upsert({
      where: { title_en: category.title_en },
      update: {},
      create: category,
    });
    console.log(`Created category with id: ${newCategory.id}`);
  }

  for (const product of products) {
    const newProduct = await prisma.product.upsert({
      where: { model: product.model },
      update: {},
      create: product,
    });
    console.log(`Created product with id: ${newProduct.id}`);
  }

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
