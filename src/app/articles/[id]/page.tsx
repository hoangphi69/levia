import EditorOutput from '@/app/lib/editor-output';
import prisma from '@/app/lib/prisma';

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
    <>
      <section className="block relative w-full h-[40dvh] md:h-[60dvh] isolate">
        <img
          className="w-full h-full object-center object-cover"
          src={article?.banner}
          alt=""
        />
      </section>

      <section className="px-5 md:px-16 py-6 md:py-12">
        <div className="space-y-8 md:space-y-11 mx-auto max-w-[700px]">
          <h1 className="font-bold text-2xl">{article?.title}</h1>

          <div className="flex justify-between">
            <p className="font-light text-gray-1 text-h6 uppercase">
              Tác giả <span className="font-bold">{article?.author}</span>
            </p>
            <p className="font-light text-gray-1 text-h6 uppercase">
              {article?.Topic?.title}
            </p>
            <p className="font-light text-gray-1 text-h6 uppercase">
              Ngày{' '}
              <span className="font-bold">
                {article?.created_at.toISOString()}
              </span>
            </p>
          </div>

          {article?.content && (
            <div className="space-y-6 text-base text-gray-1">
              <EditorOutput content={article.content} />
            </div>
          )}

          <div className="flex items-center gap-4 font-light text-gray-1 text-h6 uppercase fill-gray-1">
            <span>Chia sẻ</span>
            <ul className="flex items-center gap-4">
              <li>
                {/* <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `https://www.levia.com.vn/articles/${article?.id}`
                    )
                  }
                  className="place-items-center grid"
                > */}
                <svg
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                >
                  <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
                </svg>
                {/* </button> */}
              </li>
              <li>
                <a
                  href={`https://www.facebook.com/sharer.php?u=https://www.levia.com/articles/${article?.id}`}
                  target="_blank"
                  title="Chia sẻ trên Facebook"
                >
                  <svg
                    height="16"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Facebook</title>
                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href={`https://twitter.com/intent/tweet?text=${article?.title}&url=https://www.levia.com/articles/${article?.id}`}
                  target="_blank"
                  title="Chia sẻ trên X"
                >
                  <svg
                    height="16"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>X</title>
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
