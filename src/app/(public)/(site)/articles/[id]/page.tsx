import ArticleShare from '@/app/(public)/(site)/articles/[id]/article-share';
import Banner from '@/app/(public)/_components/layout/banner';
import EditorOutput from '@/lib/editor-output';
import prisma from '@/lib/prisma';
import { formattedDate } from '@/lib/utils/format';

export default async function ArticleDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      tags: true,
    },
  });

  return (
    <main>
      <Banner image={article?.banner || ''} />

      <section className="px-5 md:px-16 py-6 md:py-12">
        <header className="space-y-8 md:space-y-11 mx-auto max-w-[700px]">
          <h1 className="font-bold text-2xl">{article?.title}</h1>

          <div className="flex justify-between">
            <p className="font-light text-muted-foreground uppercase">
              Tác giả{' '}
              <span className="font-semibold text-foreground">
                {article?.author}
              </span>
            </p>
            {/* <p className="font-light text-muted-foreground uppercase">
              {article?.tags?.title}
            </p> */}
            <p className="font-light text-muted-foreground uppercase">
              Ngày{' '}
              <span className="font-semibold text-foreground">
                {formattedDate(article?.created_at)}
              </span>
            </p>
          </div>

          {article?.content && (
            <div className="space-y-6 text-muted-foreground text-base">
              <EditorOutput content={article.content} />
            </div>
          )}

          <div className="group flex items-center gap-4 fill-muted-foreground font-light text-muted-foreground uppercase">
            <span className="group-hover:text-foreground transition-colors">
              Chia sẻ
            </span>
            <ArticleShare title={article?.title} />
          </div>
        </header>
      </section>
    </main>
  );
}
