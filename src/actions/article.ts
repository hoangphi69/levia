'use server';

import prisma from '@/lib/prisma';

async function getAllArticles() {
  const articles = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      author: true,
      description: true,
      created_at: true,
      tags: {
        select: {
          title: true,
        },
      },
    },
    orderBy: { created_at: 'desc' }, // Newest first
  });

  return articles.map(({ tags, ...rest }) => {
    const tagsList = tags.map((tag) => tag.title);
    return {
      ...rest,
      tags: tagsList,
    };
  });
}

async function getArticleByID(id: string) {
  return await prisma.article.findUnique({ where: { id } });
}

async function updateArticleContent(id: string, content: {}) {
  return await prisma.article.update({
    where: { id },
    data: { content },
  });
}

export { getAllArticles, getArticleByID, updateArticleContent };
