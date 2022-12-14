import clsx from 'clsx'
import React, { ChangeEvent, FC, Fragment, useRef, useState } from 'react'
import styles from './styles.module.css'

import { noteTitleSelector } from '@site/src/stores/notes'
import { useRecoilState } from 'recoil'
import useListNotes from '@site/src/hooks/useListNotes'
const NoteTitle: FC = () => {
  const [title, setTitle] = useRecoilState(noteTitleSelector)
  const [isEditing, setIsEditing] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const loadNotes = useListNotes()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const onFocus = () => {
    setIsEditing(true)
  }

  const onBlur = () => {
    setIsEditing(false)
    setIsHovering(false)
    loadNotes()
  }

  const onMouseEnter = () => {
    setIsHovering(true)
  }

  const onMouseLeave = () => {
    if (!isEditing) {
      setIsHovering(false)
    }
  }

  const hidden = clsx(`${styles.noteName} ${styles.hidden}`)
  const visibleName = clsx(`${styles.noteName} ${styles.noteNameText}`)
  const visibleInput = clsx(`${styles.noteName} ${isEditing ? '' : styles.noteNamePointer}`)

  return (
    <Fragment>
      <div className={isHovering ? hidden : visibleName}>
        <h1 onMouseEnter={onMouseEnter}>
          {title}
        </h1>
      </div>
      <input
        ref={inputRef}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        value={title}
        onChange={onChange}
        className={isHovering ? visibleInput : hidden}
      />
    </Fragment>
  )
}

export default NoteTitle
