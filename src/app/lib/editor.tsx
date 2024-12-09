'use client';

import { useEffect, useRef, useState } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';

export default function Editor({
  data,
  save,
}: {
  data?: OutputData;
  save: (data: OutputData) => void;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<EditorJS>();

  const initializeEditor = async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editorjs',
        data,
      });
      ref.current = editor;
    }
  };

  const editorSave = () => {
    if (ref.current) ref.current.save().then(save);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };

    if (isMounted) {
      init();
      return () => {
        if (ref.current) ref.current.destroy();
      };
    }
  }, [isMounted]);

  return (
    <>
      <div id="editorjs"></div>
      <button onClick={editorSave}>Save</button>
    </>
  );
}
