import { useRecoilValue } from 'recoil'
import React, { FC, Fragment, ReactNode } from 'react'
import styles from './styles.module.css'
import { noteLoadingAtom } from '@site/src/stores/notes'
import NoterHeading from '../heading'

type NoteLayoutProps = {
  children: ReactNode
}

const NoteLayout: FC<NoteLayoutProps> = (props) => {
  const { children } = props
  const noteLoading = useRecoilValue(noteLoadingAtom)

  if (noteLoading) {
    return (
      <div className={styles.noteLayout}>
        <div className={styles.loading} />
      </div>
    )
  }

  return (
    <div className={styles.noteContainer}>
      <NoterHeading />
      <div className={styles.noteLayout}>
        {children}
      </div>
    </div>
  )
}

export default NoteLayout;
