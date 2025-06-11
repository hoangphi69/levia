import { getArticleByID, updateArticleContent } from '@/actions/article';
import { Params } from '@/lib/definitions';
import { OutputData } from '@editorjs/editorjs';
import Header from '../../_components/layout/header';
import ArticleContentEdit from './article-content-edit';
import ArticleMetaEdit from './article-meta-edit';

export default async function ArticleDetailsPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const article = await getArticleByID(id);
  const header = {
    title: 'Chỉnh sửa bài viết',
    breadcrumb: [
      {
        display: 'Trang chủ',
        href: '/admin',
      },
      {
        display: 'Bài viết',
        href: '/admin/articles',
      },
      {
        display: 'Chỉnh sửa',
        href: `/admin/articles/${id}`,
      },
    ],
  };

  const content = article?.content;

  return (
    <>
      <Header title={header.title} list={header.breadcrumb} />

      <section className="gap-4 grid grid-cols-3 mx-auto p-4 container">
        <ArticleContentEdit
          className="col-span-2"
          content={content as unknown as OutputData}
          onSave={updateArticleContent.bind(null, id)}
        />
        <ArticleMetaEdit />
      </section>
    </>
  );
}
