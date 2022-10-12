import clsx from 'clsx';
import React, { ChangeEvent, FC, Fragment, MouseEvent, useRef, useState } from 'react';
import styles from './styles.module.css';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const DEFAULT_NOTE_NAME = (() => {
  const now = new Date()
  const time = `${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`
  return `Noter Note - ${time}`
})()

const NoteName: FC = () => {
  const [noteName, setNoteName] = useState(DEFAULT_NOTE_NAME)
  const [isEditing, setIsEditing] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNoteName(event.target.value)
  }

  const onFocus = () => {
    setIsEditing(true)
  }

  const onBlur = () => {
    setIsEditing(false)
    setIsHovering(false)
  }

  const onMouseEnter = (event: MouseEvent) => {
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
          {noteName}
        </h1>
      </div>
      <input
        ref={inputRef}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        value={noteName}
        onChange={onChange}
        className={isHovering ? visibleInput : hidden}
      />
    </Fragment>
  );
};

export default NoteName;
