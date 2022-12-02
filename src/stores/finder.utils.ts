import { finderRead } from '../api/finder'
import { isFileNode, isFolderNode } from '../typeGuards/finder'

export const USER_ID = 'cameronaziz'

export const parseNode = (node: Finder.Node.Node, parentNodeId: string | null, nodes: Finder.Node.Node[]): Finder.Node.StateNode => {
  if (!node) {
    return null
  }

  if (isFileNode(node)) {
    return {
      variant: 'file',
      id: node.id,
      name: node.name,
      parentNodeId,
      getParent: () => {
        return null
      }
    }
  }

  const folder: Finder.Node.StateFolder = {
    variant: 'folder',
    id: node.id,
    name: node.name,
    isOpen: false,
    nodes: [],
    parentNodeId,
    getParent: () => {
      return null
    },
  }

  folder.nodes = node.nodes.map((content) => parseNode(content, node.id, nodes))

  return folder
}

const addGetParent = (tree: Finder.Node.StateNode[], fullTree: Finder.Node.StateNode[]) => {
  tree.map((leaf) => {
    if (isFolderNode(leaf)) {
      addGetParent(leaf.nodes, fullTree)
    }
    leaf.getParent = () => {
      const { parentNodeId } = leaf
      if (parentNodeId === null) {
        return null
      }
      const parent = bfsTree(parentNodeId, fullTree)

      if (isFileNode(parent)) {
        throw new Error(`Parent Node is a file: ${parentNodeId}`)
      }

      return parent
    }
  })

}

export const fetchFileTree = async (): Promise<Finder.Node.StateNode[]> => {
  const { nodes } = await finderRead(USER_ID)
  const tree = nodes.map((node) => parseNode(node, null, nodes))
  addGetParent(tree, tree)
  return tree
}


export const bfsTree = <T extends Finder.Node.Node>(id: string, finderTree: T[]): T | null => {
  const queue = [...finderTree]
  let current: T | null = null
  while (queue.length !== 0) {
    current = queue.shift()
    if (current.id === id) {
      break
    }

    if (isFolderNode(current)) {
      queue.push(...current.nodes as T[])
    }
  }
  return current
}

export const visibleTree = (finderTree: Finder.Node.StateNode[]): Finder.Node.StateNode[] =>
  finderTree.map((node) => {
    if (node.variant === 'file') {
      return node
    }

    const folder = {
      ...node,
      nodes: [],
    }

    if (folder.isOpen) {
      folder.nodes = visibleTree(node.nodes)
      return folder
    }

    return folder
  })
