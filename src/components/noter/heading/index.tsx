import { noteLoadingAtom } from '@site/src/stores/notes'
import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'
import NoteTitle from './noteTitle'
import styles from './styles.module.css'

const NoterHeading: FC = () => {
  const isNoteLoading = useRecoilValue(noteLoadingAtom)
  
  return (
    <div className={styles.heading}>
      {!isNoteLoading && <NoteTitle />}
    </div>
  )
}

export default NoterHeading
