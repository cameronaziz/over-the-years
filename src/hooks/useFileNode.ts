import { isFolderNode } from '../typeGuards/finder'
import useNode from './useNode'

type UseFileNode = (id: string) => [
  node: Finder.Node.StateFile,
  updateNode: (update: Partial<Finder.Node.StateFile>) => void
]

const useFileNode: UseFileNode = (id) => {
  const [node, updateNode] = useNode(id)

  if (isFolderNode(node)) {
    throw new Error(`ID provided is for a folder node: ${id}`)
  }

  return [node, updateNode]
}

export default useFileNode
