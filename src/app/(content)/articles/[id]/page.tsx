import ArticleShare from '@/app/components/article-share';
import Banner from '@/app/components/banner';
import EditorOutput from '@/app/lib/editor-output';
import prisma from '@/app/lib/prisma';
import { formattedDate } from '@/app/lib/utils';

export default async function ArticleDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      Topic: true,
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
            <p className="font-light text-muted-foreground uppercase">
              {article?.Topic?.title}
            </p>
            <p className="font-light text-muted-foreground uppercase">
              Ngày{' '}
              <span className="font-semibold text-foreground">
                {formattedDate(article?.created_at)}
              </span>
            </p>
          </div>

          {article?.content && (
            <div className="space-y-6 text-base text-muted-foreground">
              <EditorOutput content={article.content} />
            </div>
          )}

          <div className="flex items-center gap-4 font-light text-muted-foreground uppercase fill-muted-foreground group">
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
