import { Editor } from '@tiptap/react';
import { useCallback } from 'react';
import { AiOutlineLink } from 'react-icons/ai';
import {
  MdFormatBold,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatStrikethrough,
  MdRedo,
  MdTitle,
  MdUndo,
} from 'react-icons/md';
import { BsTypeH2, BsTypeH3 } from 'react-icons/bs';

const RichEditorToolbar = ({ editor }: { editor: Editor }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    // cancelled
    if (url === null) {
      return;
    }
    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }
    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 border-b border-gray-600 p-4 text-2xl">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          !editor.isActive('heading', { level: 2 }) ? 'opacity-20' : ''
        }
      >
        <BsTypeH2 />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          !editor.isActive('heading', { level: 3 }) ? 'opacity-20' : ''
        }
      >
        <BsTypeH3 />
      </button>
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
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={!editor.isActive('bulletList') ? 'opacity-20' : ''}
      >
        <MdFormatListBulleted />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={!editor.isActive('orderedList') ? 'opacity-20' : ''}
      >
        <MdFormatListNumbered />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={!editor.isActive('blockquote') ? 'opacity-20' : ''}
      >
        <MdFormatQuote />
      </button>
      <button
        type="button"
        onClick={setLink}
        className={!editor.isActive('link') ? 'opacity-20' : ''}
      >
        <AiOutlineLink />
      </button>
      <button onClick={() => editor.chain().focus().undo().run()} type="button">
        <MdUndo />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} type="button">
        <MdRedo />
      </button>
    </div>
  );
};

export default RichEditorToolbar;
