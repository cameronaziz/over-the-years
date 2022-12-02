import { isFolderNode } from '@site/src/typeGuards/finder'

export const removeFunctions = (state: Finder.Node.StateNode[]): Finder.Node.StorageNode[] =>
  state.map((node) => {
    if (isFolderNode(node)) {
      const folder: Finder.Node.StorageFolder = {
        id: node.id,
        isOpen: node.isOpen,
        variant: node.variant,
        nodes: removeFunctions(node.nodes || []),
        parentNodeId: node.parentNodeId,
        name: node.name
      }
      return folder
    }
    const file: Finder.Node.StorageFile = {
      id: node.id,
      variant: node.variant,
      parentNodeId: node.parentNodeId,
      name: node.name
    }
    return file
  })
