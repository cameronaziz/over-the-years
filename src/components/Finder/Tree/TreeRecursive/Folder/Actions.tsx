import Tooltip from '@site/src/components/tooltip'
import useFolderNode from '@site/src/hooks/useFolderNode'
import { finderEditingNodeIdAtom } from '@site/src/stores/finder'
import createUUID from '@site/src/utils/createUUID'
import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineFileAdd, AiOutlineFolderAdd } from 'react-icons/ai'
import { useSetRecoilState } from 'recoil'


type ActionsProps = {
  nodeId: string
}

const Actions: ForwardRefRenderFunction<HTMLDivElement, ActionsProps> = (props, ref) => {
  const { nodeId  } = props
  const setFinderEditingNodeId = useSetRecoilState(finderEditingNodeIdAtom)
  const [node, setNode] = useFolderNode(nodeId)

  const createFolder = () => {
    const nodes = [...node.nodes]
    const id = createUUID()
    nodes.push({
      variant: 'folder',
      id,
      parentNodeId: node.id,
      getParent: () => node,
      name: 'Untitled',
      isOpen: false,
      nodes: [],
    })
    setNode({
      isOpen: true,
      nodes,
    })
    setFinderEditingNodeId(id)
  }

  const createFile = () => {
    const nodes = [...node.nodes]
    const id = createUUID()
    nodes.push({
      variant: 'file',
      id,
      name: 'Untitled',
      parentNodeId: node.id,
      getParent: () => node,
    })
    setNode({
      isOpen: true,
      nodes,
    })
    setFinderEditingNodeId(id)
  }

  const deleteFolder = () => {
    // Do Nothing
  }

  const renameFolder = () => {
    setFinderEditingNodeId(nodeId)
  }

  return (
    <div className="actions" ref={ref}>
      <Tooltip text="Rename Folder">
        <AiOutlineEdit onClick={renameFolder} />
      </Tooltip>
      <Tooltip text="Add File">
        <AiOutlineFileAdd onClick={createFile} />
      </Tooltip>
      <Tooltip text="Create Folder">
        <AiOutlineFolderAdd onClick={createFolder} />
      </Tooltip>
      <Tooltip text="Delete Folder">
        <AiOutlineDelete onClick={deleteFolder} />
      </Tooltip>
    </div>
  )
}

export default forwardRef(Actions)
