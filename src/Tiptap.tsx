import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import ToolMenu from './ToolMenu';
import { useLocalStorage } from './useLocalStorage';

const Tiptap = () => {
  const [value, setValue] = useLocalStorage(
    'tiptap-content',
    '<p>Hello World! 🌎️</p>'
  );
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: true,
      }),

      Placeholder.configure({
        placeholder: 'Write something...',
      }),
    ],
    content: value,
  });
  if (!editor) return null;

  const onSave = () => {
    const content = editor.getHTML();
    setValue(content || '');
  };

  return (
    <div className="w-2/3 mt-10 mx-auto border-gray-500 border-2">
      <ToolMenu editor={editor} />
      <div className="p-3 overflow-y-scroll h-[70vh] overflow-hidden mt-3">
        <EditorContent editor={editor} />
      </div>
      <button onClick={onSave}>保存</button>
      <h4>保存されたHTML</h4>
      <pre>{value}</pre>
    </div>
  );
};

export default Tiptap;
