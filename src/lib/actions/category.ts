'use server';

import prisma from '../prisma';

async function getCategoryTitles() {
  const categories = await prisma.category.findMany({
    select: { title: true },
  });
  return categories;
}

async function getCategoryByTitle(title: string) {
  const category = await prisma.category.findUnique({
    where: { title },
  });
  return category;
}

export { getCategoryByTitle, getCategoryTitles };
