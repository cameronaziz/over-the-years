import Name, { NameRef } from '@site/src/components/Finder/Tree/Name'
import { ActionsWrapper, Collapse, VerticalLine } from '@site/src/components/Finder/Tree/styled'
import useFolderNode from '@site/src/hooks/useFolderNode'
import useIsDraggingFamily from '@site/src/hooks/useIsDraggingFamily'
import { finderDraggingNodeAtom, finderEditingNodeIdAtom } from '@site/src/stores/finder'
import React, { FC, MouseEvent, ReactNode, useCallback, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import Actions from './Actions'
import { StyledFolder } from './styled'

type FolderProps = {
  children: ReactNode
  nodeId: string
}

const Folder: FC<FolderProps> = (props) => {
  const { children, nodeId } = props
  const [node, setNode] = useFolderNode(nodeId)
  const finderDraggingNode = useRecoilValue(finderDraggingNodeAtom)
  const finderEditingNodeId = useRecoilValue(finderEditingNodeIdAtom)
  const actionsRef = useRef<HTMLDivElement | null>(null)
  const nameRef = useRef<NameRef | null>(null)
  const childrenRef = useRef<HTMLDivElement | null>(null)
  const isDraggingFamily = useIsDraggingFamily(node)

  const handleNodeClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const isActions = actionsRef.current?.contains(event.target as Node)
      const isChildren = childrenRef.current?.contains(event.target as Node)
      if (isChildren || isActions) {
        return
      }

      setNode({
        isOpen: !node.isOpen
      })

      if (nameRef.current) {
        nameRef.current.setOpenState(!node.isOpen)
      }
    },
    [node]
  )

  

  if (finderEditingNodeId === nodeId) {
    return (
      <StyledFolder
        isImmediateFamily={isDraggingFamily}
        isDragging={finderDraggingNode && finderDraggingNode.id === nodeId}
        depth={1}
        onClick={handleNodeClick}
      >
        <VerticalLine>
          <ActionsWrapper>
            <Name
              ref={nameRef}
              nodeId={nodeId}
            />
          </ActionsWrapper>
        </VerticalLine>
      </StyledFolder>
    )
  }

  return (
    <StyledFolder
      isImmediateFamily={isDraggingFamily}
      isDragging={finderDraggingNode && finderDraggingNode.id === nodeId}
      depth={1}
      onClick={handleNodeClick}
    >
      <ActionsWrapper>
        <Name
          nodeId={nodeId}
        />
        <Actions ref={actionsRef} nodeId={nodeId} />
      </ActionsWrapper>
      <VerticalLine>
        <Collapse isOpen={node.isOpen} ref={childrenRef}>
          {children}
        </Collapse>
      </VerticalLine>
    </StyledFolder>

  )
}

export default Folder
