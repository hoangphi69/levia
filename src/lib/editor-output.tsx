'use client';

import dynamic from 'next/dynamic';

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
);

export default function EditorOutput({ content }: { content: any }) {
  return <Output data={content}></Output>;
}
