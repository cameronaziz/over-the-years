import useAppVariant from '@site/src/hooks/useAppVariant'
import { noteLoadingAtom } from '@site/src/stores/notes'
import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'
import NoteTitle from './noteTitle'
import styles from './styles.module.css'

const NoterHeading: FC = () => {
  const isNoteLoading = useRecoilValue(noteLoadingAtom)
  const appVariant = useAppVariant()

  const displayTitle = appVariant === 'writer' || !isNoteLoading
  
  return (
    <div className={styles.heading}>
      {displayTitle && <NoteTitle />}
    </div>
  )
}

export default NoterHeading
