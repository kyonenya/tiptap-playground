import { Editor } from '@tiptap/react';
import { AiOutlineLink } from 'react-icons/ai';
import {
  MdFormatBold,
  MdFormatStrikethrough,
  MdRedo,
  MdUndo,
} from 'react-icons/md';

const ToolMenu = ({ editor }: { editor: Editor }) => {
  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    // cancelled
    if (url === null) return;
    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap gap-2 border-b border-gray-600 p-4 text-2xl">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={!editor.isActive('bold') ? 'opacity-20' : ''}
      >
        <MdFormatBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={!editor.isActive('strike') ? 'opacity-20' : ''}
      >
        <MdFormatStrikethrough />
      </button>
      <button onClick={() => editor.chain().focus().undo().run()} type="button">
        <MdUndo />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} type="button">
        <MdRedo />
      </button>
      <button
        type="button"
        onClick={setLink}
        className={!editor.isActive('link') ? 'opacity-20' : ''}
      >
        <AiOutlineLink />
      </button>
    </div>
  );
};

export default ToolMenu;
