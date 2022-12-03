import { noteContentSelector } from '@site/src/stores/notes'
import Cursor from '@site/src/utils/Cursor'
import React, { FC, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { StyledWrapper } from '../noter.styles'
import { StyledEditorContainer } from './Editor.styled'
import NoteSelection from './NoteSelection'


const TextArea: FC = () => {
  const textAreaRef = useRef<HTMLDivElement | null>(null)
  const cursorRef = useRef(new Cursor(textAreaRef))
  const [content, setContent] = useRecoilState(noteContentSelector)
  const [isNoteSelectionVisible] = useState(false)

  const getHasClosed = () => {
    const value = getContent()
    const { start: caretPosition } = cursorRef.current
    const nextChar = value.slice(caretPosition, caretPosition + 2)
    return nextChar === ']]'
  }

  const getContent = () => {
    const value = textAreaRef.current?.childNodes[0]?.textContent
    return `${typeof value === 'undefined' ? '' : value}`
  }

  const getHasOpened = () => {
    const value = getContent()
    const { start: caretPosition } = cursorRef.current
    const lastChar = value.slice(caretPosition - 2, caretPosition)
    return lastChar === '[['
  }

  const getValue = () => {
    const value = getContent()
    const hasOpened = getHasOpened()
    if (!hasOpened) {
      return value
    }
    
    const hasClosed = getHasClosed()
    if (hasClosed) {
      return value
    }
    
    const { start: caretPosition } = cursorRef.current
    const parsedValue = `${value.substring(0, caretPosition + 1)}]]${value.substring(caretPosition + 1)}`
    // showNoteList()
    return parsedValue
  }


  const onKeyDownCapture = () => {
    cursorRef.current.updateCachedPosition()


    const value = getValue()
    const changeLength = value.length !== content.length
    
    if (changeLength) {
      cursorRef.current.setCursorToCached(1)
    }
    
    if (value !== content) {
      setContent(value)
    }
  }

  return (
    <StyledWrapper>
      <StyledEditorContainer
        contentEditable
        suppressContentEditableWarning
        onKeyDownCapture={onKeyDownCapture}
        ref={textAreaRef}
      >
        {content}
      </StyledEditorContainer>
      <NoteSelection isVisible={isNoteSelectionVisible} />
    </StyledWrapper>
  )
}

export default TextArea
