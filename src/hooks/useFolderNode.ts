import { isFileNode } from '../typeGuards/finder'
import useNode from './useNode'

type UseFolderNode = (id: string) => [
  node: Finder.Node.StateFolder,
  updateNode: (update: Partial<Finder.Node.StateFolder>) => void
]

const useFolderNode: UseFolderNode = (id) => {
  const [node, updateNode] = useNode(id)

  if (isFileNode(node)) {
    throw new Error(`ID provided is for a file node: ${id}`)
  }

  return [node, updateNode]
}

export default useFolderNode
