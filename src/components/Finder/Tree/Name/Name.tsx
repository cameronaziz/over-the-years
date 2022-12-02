import { noteUpdate } from '@site/src/api/notes'
import useLoadNote from '@site/src/hooks/useLoadNote'
import useNode from '@site/src/hooks/useNode'
import { finderEditingNodeIdAtom } from '@site/src/stores/finder'
import { noteAtom } from '@site/src/stores/notes'
import { isFileNode } from '@site/src/typeGuards/finder'
import React, { forwardRef, ForwardRefRenderFunction, KeyboardEvent as ReactKeyboardEvent, useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import useFileIcon from '../../../../hooks/useFileIcon'
import TreeDrag, { TreeDragRef } from '../Drag'
import ContentEditable from './ContentEditable'
import { StyledInput, StyledName } from './styled'

type NameProps = {
  nodeId: string
}

export type NameRef = TreeDragRef

const Name: ForwardRefRenderFunction<NameRef, NameProps> = (props, ref) => {
  const { nodeId } = props
  const [node, setNode] = useNode(nodeId)
  const setFinderEditingNodeId = useSetRecoilState(finderEditingNodeIdAtom)
  const inputRef = useRef<ContentEditable | null>(null)
  const [Icon] = useFileIcon(nodeId)
  const finderEditingNodeId = useRecoilValue(finderEditingNodeIdAtom)
  const [note, setNote] = useRecoilState(noteAtom)
  const loadNote = useLoadNote('writer')
  const isEditing = finderEditingNodeId === nodeId

  useEffect(() => {
    const { current } = inputRef
    if (!current) {
      return
    }

    if (isEditing) {
      current.el.current.focus()
      if (window.getSelection && document.createRange) {
        const range = document.createRange()
        range.selectNodeContents(current.el.current)
        const selection = window.getSelection()
        if (selection) {
          selection.removeAllRanges()
          selection.addRange(range)
        }
      }
    }
  }, [isEditing])


  const onKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (!event.metaKey) {
        setFinderEditingNodeId(null)
        return
      }
    }
  }

  const onClick = () => {
    if (isFileNode(node)) {
      loadNote(node.id, {
        title: node.name,
        content: '',
      })
    }
  }

  const onChange = () => {
    const { current } = inputRef
    if (current) {
      const title = current.el.current.innerText || ''
      setNode({
        name: title
      })
      if (isFileNode(node)) {
        noteUpdate({
          title
        }, node.id)

        if (note.id === node.id) {
          setNote((prev) => ({
            ...prev,
            title,
          }))
        }

      }
    }
  }

  const onBlur = () => {
    setFinderEditingNodeId(null)
  }

  const parentNode = node.getParent()

  return (
    <TreeDrag ref={ref} nodeId={nodeId}>
      <StyledName onClick={onClick} parentOpen={parentNode?.isOpen}>
        <Icon />
        <StyledInput
          onClick={onClick}
          disabled={!isEditing}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          ref={inputRef}
          $isEditing={isEditing}
          contentEditable={isEditing}
          onChange={onChange}
          html={node.name}
        />
      </StyledName>
    </TreeDrag>
  )
}

export default forwardRef(Name)
