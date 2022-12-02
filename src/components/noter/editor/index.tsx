import React, { ChangeEvent, FC, Fragment } from 'react'
import styles from './styles.module.css'
import { useRecoilState } from 'recoil'
import Markdown from '../markdown'
import { noteContentSelector } from '@site/src/stores/notes'

const NoterEditor: FC = () => {
  const [content, setContent] = useRecoilState(noteContentSelector)

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  return (
    <Fragment>
      <textarea
        value={content}
        onChange={onChange}
        className={styles.noterInput}
      />
      <Markdown />
    </Fragment>
  )
}

export default NoterEditor
