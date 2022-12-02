import React, { FC } from 'react'
import NoteTitle from './noteTitle'
import styles from './styles.module.css'

const NoterHeading: FC = () => {
  
  return (
    <div className={styles.heading}>
      <NoteTitle />
    </div>
  )
}

export default NoterHeading
