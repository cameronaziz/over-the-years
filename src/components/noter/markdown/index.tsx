import styles from './styles.module.css'
import useNoteMarkdown from '@site/src/hooks/useNoteMarkdown';
import React, { FC } from 'react';

const Markdown: FC = () => {
  const [html] = useNoteMarkdown()

  return (
    <div
      className={styles.noterPreview}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Markdown;
