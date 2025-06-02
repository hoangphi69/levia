import prisma from '@/lib/prisma';

export async function getAllArticles() {
  return await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      author: true,
      description: true,
      tags: {
        select: {
          title: true,
        },
      },
    },
    orderBy: { created_at: 'desc' }, // Newest first
  });
}
