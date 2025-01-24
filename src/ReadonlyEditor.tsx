import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export const ReadOnlyEditor = ({ content }: { content: string }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false, // 編集を無効化
  });

  return <EditorContent editor={editor} />;
};
