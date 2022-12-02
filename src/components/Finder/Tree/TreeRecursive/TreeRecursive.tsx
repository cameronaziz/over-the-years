import { isFileNode } from '@site/src/typeGuards/finder'
import React, { FC, Fragment } from 'react'
import File from './File/TreeFile'
import Folder from './Folder/TreeFolder'

type TreeRecursiveChildProps = {
  node: Finder.Node.StateNode
}

const TreeRecursiveChild: FC<TreeRecursiveChildProps> = (props) => {
  const { node } = props

  if (isFileNode(node)) {
    return <File nodeId={node.id} />
  }


  return (
    <Folder nodeId={node.id}>
      <TreeRecursive nodes={node.nodes} />
    </Folder>
  )
}

type TreeRecursiveProps = {
  nodes: Finder.Node.StateNode[]
}

const TreeRecursive: FC<TreeRecursiveProps> = (props) => {
  const { nodes } = props

  return (
    <Fragment>
      {nodes.map((node) =>
        <TreeRecursiveChild key={node.id} node={node} />
      )}
    </Fragment>
  )

}

export default TreeRecursive
