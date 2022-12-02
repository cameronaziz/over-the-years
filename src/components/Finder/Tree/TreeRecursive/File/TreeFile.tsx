import Tooltip from '@site/src/components/tooltip'
import useFileNode from '@site/src/hooks/useFileNode'
import useIsDraggingFamily from '@site/src/hooks/useIsDraggingFamily'
import { finderDraggingNodeAtom, finderEditingNodeIdAtom } from '@site/src/stores/finder'
import { noteAtom } from '@site/src/stores/notes'
import React, { FC } from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { useRecoilState, useRecoilValue } from 'recoil'
import Name from '../../Name'
import { ActionsWrapper } from '../../styled'
import { Hidden, StyledFile } from './styled'

type TreeFileProps = {
  nodeId: string
}
const TreeFile: FC<TreeFileProps> = (props) => {
  const { nodeId } = props
  const [node] = useFileNode(nodeId)
  const finderDraggingNode = useRecoilValue(finderDraggingNodeAtom)
  const [finderEditingNodeId, setFinderEditingNodeId] = useRecoilState(finderEditingNodeIdAtom)
  const isDraggingFamily = useIsDraggingFamily(node)
  const note = useRecoilValue(noteAtom)

  const commitDelete = () => {
    // dispatch({ type: 'FILE_DELETE', payload: { id: node.id } });
  }


  const renameFile = () => {
    setFinderEditingNodeId(nodeId)    
  }

  const isOpen = note.id === node.id

  if (finderEditingNodeId === nodeId) {
    return (
      <StyledFile
        isOpen={isOpen}
        isImmediateFamily={isDraggingFamily}
        isDragging={finderDraggingNode && finderDraggingNode.id === nodeId}
      >
        <Name nodeId={nodeId} />
      </StyledFile>
    )
  }

  return (
    <StyledFile
      isOpen={isOpen}
      isImmediateFamily={isDraggingFamily}
      isDragging={finderDraggingNode && finderDraggingNode.id === nodeId}
    >
      <ActionsWrapper>
        <Name nodeId={nodeId} />
        <div className="actions">
          <Hidden>
            <AiOutlineEdit />
          </Hidden>
          <Hidden>
            <AiOutlineEdit />
          </Hidden>
          <Tooltip text="Rename File">
            <AiOutlineEdit onClick={renameFile} />
          </Tooltip>
          <Tooltip text="Delete File">
            <AiOutlineDelete onClick={commitDelete} />
          </Tooltip>
        </div>
      </ActionsWrapper>
    </StyledFile>
  )
}

export default TreeFile
