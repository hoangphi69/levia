import Editor from '@/app/lib/editor';
import prisma from '@/app/lib/prisma';
import { OutputData } from '@editorjs/editorjs';
import { Prisma } from '@prisma/client';

export default function ArticleEditor() {
  const id = 'i09wef';
  const data = {
    time: 1733739502056,
    blocks: [
      {
        id: 'PPVcKDIS6j',
        type: 'paragraph',
        data: { text: 'Hello world<br>' },
      },
      {
        id: 'oMixn7oWvk',
        type: 'paragraph',
        data: { text: '<b>hello world</b><br>' },
      },
      {
        id: '7ELr0wuxyX',
        type: 'paragraph',
        data: { text: '<i>Hello world</i><br>' },
      },
    ],
    version: '2.30.7',
  };

  const save = async (data: OutputData) => {
    'use server';
    await prisma.article.create({
      data: {
        title: 'testing editorjs',
        content: JSON.parse(JSON.stringify(data)) as Prisma.JsonObject,
      },
    });
  };

  return (
    <div className="content-center grid">
      <Editor save={save}></Editor>
    </div>
  );
}
