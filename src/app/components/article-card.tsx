import type { Prisma } from '@prisma/client';

type ArticleWithTopic = Prisma.ArticleGetPayload<{
  include: {
    Topic: true;
  };
}>;

type ArticleCard = Pick<ArticleWithTopic, 'title' | 'banner' | 'Topic'>;

export default function ArticleCard({ banner, Topic, title }: ArticleCard) {
  return (
    <div>
      <img
        className="bg-dark-1 mb-4 w-full aspect-square object-center object-cover"
        src={banner}
        alt=""
      />
      <p className="font-light text-gray-1 text-h6 uppercase">{Topic?.title}</p>
      <p className="line-clamp-2 font-bold text-h4">{title}</p>
    </div>
  );
}
