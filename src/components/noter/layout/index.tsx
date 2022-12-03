import React, { FC, ReactNode } from 'react'
import NoterHeading from '../heading'
import styles from './styles.module.css'

type NoteLayoutProps = {
  children: ReactNode
}

const NoteLayout: FC<NoteLayoutProps> = (props) => {
  const { children } = props

  return (
    <div className={styles.noteContainer}>
      <NoterHeading />
      <div className={styles.noteLayout}>
        {children}
      </div>
    </div>
  )
}

export default NoteLayout
