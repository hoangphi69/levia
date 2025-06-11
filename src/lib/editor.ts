import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import EditorjsList from '@editorjs/list';
import ImageTool from '@editorjs/image';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import { uploadFiles } from '@/actions/uploadthing';

interface EditorJSImageResponse {
  success: 0 | 1;
  file?: {
    url: string;
    name?: string;
    size?: number;
    key?: string;
  };
  error?: string;
}

const imageToolConfig = {
  uploader: {
    uploadByFile: async (file: File): Promise<EditorJSImageResponse> => {
      try {
        const result = await uploadFiles([file]);

        if (result[0]?.data?.url) {
          return {
            success: 1,
            file: {
              url: result[0].data.url,
              name: result[0].data.name,
              size: result[0].data.size,
              key: result[0].data.key,
            },
          };
        } else {
          throw new Error(result[0]?.error?.message || 'Upload failed');
        }
      } catch (error) {
        console.error('Upload error:', error);
        return {
          success: 0,
          error: error instanceof Error ? error.message : 'Upload failed',
        };
      }
    },
    uploadByUrl: async (url: string): Promise<EditorJSImageResponse> => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch image');

        const blob = await response.blob();
        const filename = url.split('/').pop()?.split('?')[0] || 'image';
        const file = new File([blob], filename, { type: blob.type });

        const result = await uploadFiles([file]);

        if (result[0]?.data?.url) {
          return {
            success: 1,
            file: {
              url: result[0].data.url,
              key: result[0].data.key,
            },
          };
        } else {
          throw new Error(result[0]?.error?.message || 'Upload failed');
        }
      } catch (error) {
        return {
          success: 0,
          error: 'Failed to upload image from URL',
        };
      }
    },
  },
};

const plugins = {
  header: {
    class: Header,
    toolbox: {
      title: 'Tiêu đề',
    },
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    toolbox: {
      title: 'Đoạn văn',
    },
  },
  list: {
    class: EditorjsList,
    inlineToolbar: true,
    toolbox: {
      title: 'Danh sách',
    },
  },
  image: {
    class: ImageTool,
    config: imageToolConfig,
    toolbox: {
      title: 'Hình ảnh',
    },
  },
  quote: {
    class: Quote,
    toolbox: {
      title: 'Trích dẫn',
    },
  },
  table: {
    class: Table,
    toolbox: {
      title: 'Bảng',
    },
  },
};

function initEditorJS(initialData: any, readonly: boolean = false) {
  return new EditorJS({
    holder: 'editorjs',
    data: initialData,
    placeholder: 'Gõ / để chèn nội dung...',
    readOnly: readonly,
    // @ts-ignore
    tools: plugins,
  });
}

export default initEditorJS;
