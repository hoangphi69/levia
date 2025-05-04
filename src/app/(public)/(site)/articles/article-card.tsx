import SmoothImage from '@/components/wrapper/smooth-image';
import type { Prisma } from '@prisma/client';

type ArticleWithTags = Prisma.ArticleGetPayload<{
  include: {
    tags: true;
  };
}>;

type ArticleCard = Pick<ArticleWithTags, 'title' | 'banner' | 'tags'>;

export default function ArticleCard({ banner, tags, title }: ArticleCard) {
  return (
    <article className="flex flex-col w-full h-full">
      <SmoothImage
        className="bg-secondary mb-4 rounded-ss-[3rem] w-full aspect-square"
        width={500}
        height={500}
        src={banner!}
        alt=""
      />
      {/* <p className="font-light text-muted-foreground text-sm uppercase">
        {Topic?.title || 'Bài viết'}
      </p> */}
      <p className="font-bold text-lg line-clamp-2">{title}</p>
    </article>
  );
}
