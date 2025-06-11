'use client';

import initEditorJS from '@/lib/editor';
import EditorJS from '@editorjs/editorjs';
import { useEffect, useRef, useState } from 'react';

// TODO: Add custom render

export default function ArticleContentRender({ content }: { content: any }) {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<EditorJS>();

  useEffect(() => {
    typeof window !== 'undefined' && setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (!ref.current) ref.current = initEditorJS(content, true);
      return () => ref.current && ref.current.destroy();
    }
  }, [isMounted]);

  return <div id="editorjs"></div>;
}
