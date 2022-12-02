import useNode from '@site/src/hooks/useNode'
import { finderDraggingNodeAtom, finderDragOverNodeAtom } from '@site/src/stores/finder'
import { isFolderNode } from '@site/src/typeGuards/finder'
import React, { forwardRef, ForwardRefRenderFunction, ReactNode, useImperativeHandle, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { TreeNode } from './styled'

type TreeDragProps = {
  children: ReactNode
  nodeId: string
}

export type TreeDragRef = {
  setOpenState(isOpen: boolean): void
}

export const isAncestor = (nodeDraggingOver: Finder.Node.StateNode, ancestor: Finder.Node.StateFolder): boolean => {
  if (nodeDraggingOver.id === ancestor.id) {
    return true
  }
  let isAncestor = false
  const queue = [...ancestor.nodes]
  while (queue.length > 0) {
    const current = queue.shift()
    if (current.id === nodeDraggingOver.id) {
      isAncestor = true
      break
    }

    if (isFolderNode(current)) {
      queue.push(...current.nodes)
    }
  }

  return isAncestor
}

const TreeDrag: ForwardRefRenderFunction<TreeDragRef, TreeDragProps> = (props, ref) => {
  const { children, nodeId } = props
  const [node, setNode] = useNode(nodeId)
  const isOpenRef = useRef(isFolderNode(node) ? node.isOpen : false)
  const [finderDraggingNode, setFinderDraggingNode] = useRecoilState(finderDraggingNodeAtom)
  const [finderDragOverNode, setFinderDragOverNode] = useRecoilState(finderDragOverNodeAtom)

  const isTempNode = node.id.endsWith('-temp')

  useImperativeHandle(ref, () => ({
    setOpenState(isOpen) {
      isOpenRef.current = isOpen
    }
  }))

  const onDrag = () => {
    if (isTempNode) {
      return
    }
    setFinderDraggingNode(node)
  }

  const onDragEnd = () => {
    if (isTempNode) {
      return
    }
    setFinderDraggingNode(null)
    setFinderDragOverNode(null)
  }

  const onDragEnter = () => {
    if (isTempNode) {
      return
    }
    if (finderDraggingNode && node.id !== finderDraggingNode.id) {
      setFinderDragOverNode(node)
      const { variant } = node
      switch (variant) {
      case 'file': {
        break
      }
      case 'folder': {
        if (!node.isOpen) {
          setNode({
            isOpen: true
          })
        }
        break
      }
      default: {
        throw new Error(`Invalid variant type: ${variant}`)
      }
      }
    }
  }

  const onDragLeave = () => {
    if (isTempNode) {
      return
    }
    if (finderDraggingNode && node.id !== finderDraggingNode.id) {
      const { variant } = node
      switch (variant) {
      case 'file': {
        break
      }
      case 'folder': {
        if (!isOpenRef.current && !isAncestor(finderDragOverNode, node)) {
          setNode({
            isOpen: false
          })
        }
        break
      }
      default: {
        throw new Error(`Invalid variant type: ${variant}`)
      }
      }
    }
  }

  return (
    <TreeNode
      draggable
      onDragEnd={onDragEnd}
      onDrag={onDrag}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      {children}
    </TreeNode>
  )
}

export default forwardRef(TreeDrag)
