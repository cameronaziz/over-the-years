import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import showdown from 'showdown';
import styles from './styles.module.css';

const NoterEditor: FC = () => {
  const [markdownHTML, setMarkdownHTML] = useState('')
  const [text, setText] = useState('# hello, markdown!')

  useEffect(
    () => {
      const converter = new showdown.Converter()
      const html = converter.makeHtml(text)
      setMarkdownHTML(html)
    },
    [text],
  );

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }
  return (
    <div className={styles.noterEditor}>
      <textarea
        value={text}
        onChange={onChange}
        className={styles.noterInput}
      />
      <div
        className={styles.noterPreview}
        dangerouslySetInnerHTML={{ __html: markdownHTML }}
      />
    </div>
  );
};

export default NoterEditor;
