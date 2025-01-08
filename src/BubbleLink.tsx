import { Editor } from '@tiptap/react';
import { useState, ChangeEvent } from 'react';
import { IconContext } from 'react-icons';
import { MdOutlineLink } from 'react-icons/md';

/**
 *
 * @see https://zenn.dev/kirik/articles/4584a4e50cb26c#リンク機能
 * @see https://github.com/kirikirisu/re-shizu-editor/blob/main/src/app/BubbleLink.tsx
 */
export function BubbleLink({ editor }: { editor: Editor }) {
  const [visibleUrlInput, setVisibleUrlInput] = useState(false);
  const [url, setUrl] = useState('');

  const applyUrl = () => {
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();

    setVisibleUrlInput(false);
    setUrl('');
  };

  const handleChangeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleUnlink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
  };

  const openLinkInput = () => {
    const previousUrl = editor.getAttributes('link').href;

    setVisibleUrlInput(true);
    setUrl(previousUrl);
  };

  const isSelectedLink = editor.isActive('link');
  if (isSelectedLink && !visibleUrlInput) {
    const previousUrl = editor.getAttributes('link').href;

    return (
      <div className="modify-link-tooltip">
        <a href={previousUrl} target="_blank" rel="noreferrer noopener">
          {previousUrl}
        </a>
        <div>
          <button type="button" onClick={openLinkInput}>
            URLを編集
          </button>
          <button
            type="button"
            style={{ backgroundColor: '#f1f6f9' }}
            onClick={handleUnlink}
          >
            解除
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {visibleUrlInput ? (
        <form onSubmit={applyUrl} className="input-text">
          <div>
            <input
              placeholder="https://"
              value={url}
              onChange={handleChangeUrl}
            />
            <button type="submit">適用</button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => {
            setVisibleUrlInput(true);
          }}
        >
          <IconContext.Provider value={{ size: '1.1rem' }}>
            <MdOutlineLink />
          </IconContext.Provider>
        </button>
      )}
    </>
  );
}
