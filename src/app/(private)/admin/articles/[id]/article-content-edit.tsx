'use client';

import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import initEditorJS from '@/lib/editor';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { useEffect, useRef, useState } from 'react';

export default function ArticleContentEdit({
  className,
  content,
  onSave: save,
}: {
  className?: string;
  content?: OutputData;
  onSave: (data: OutputData) => void;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<EditorJS>();
  const editorSave = () => ref.current && ref.current.save().then(save);

  useEffect(() => {
    typeof window !== 'undefined' && setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (!ref.current) ref.current = initEditorJS(content);
      return () => ref.current && ref.current.destroy();
    }
  }, [isMounted]);

  return (
    <Card className={className}>
      <CardHeader className="flex">
        <CardTitle className="sr-only">Chỉnh sửa nội dung</CardTitle>
        <Button onClick={editorSave} className="self-end !m-0">
          Lưu
        </Button>
      </CardHeader>
      <CardContent id="editorjs" className="px-20 py-4"></CardContent>
    </Card>
  );
}
