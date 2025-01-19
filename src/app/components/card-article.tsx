import type { Prisma } from '@prisma/client';
import SmoothImage from './smooth-image';

type ArticleWithTopic = Prisma.ArticleGetPayload<{
  include: {
    Topic: true;
  };
}>;

type ArticleCard = Pick<ArticleWithTopic, 'title' | 'banner' | 'Topic'>;

export default function ArticleCard({ banner, Topic, title }: ArticleCard) {
  return (
    <article className="flex flex-col w-full h-full">
      <SmoothImage
        className="bg-secondary mb-4 rounded-ss-[3rem] w-full aspect-square"
        width={500}
        height={500}
        src={banner}
        alt=""
      />
      <p className="font-light text-muted-foreground text-sm uppercase">
        {Topic?.title || 'Bài viết'}
      </p>
      <p className="line-clamp-2 font-bold text-lg">{title}</p>
    </article>
  );
}
