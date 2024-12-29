import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ToolMenu from './ToolMenu';

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
  });

  return (
    <div className="w-2/3 mt-10 mx-auto border-gray-500 border-2">
      <ToolMenu editor={editor} />
      <div className="p-3 overflow-y-scroll h-[70vh] overflow-hidden mt-3">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
