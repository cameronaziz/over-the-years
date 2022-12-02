import { useRecoilValue } from 'recoil'
import { finderDragOverNodeAtom } from '../stores/finder'

const useIsDraggingFamily = (node: Finder.Node.StateNode) => {
  const finderDragOverNode = useRecoilValue(finderDragOverNodeAtom)
  
  if (!finderDragOverNode || !finderDragOverNode.parentNodeId) {
    return false
  }
  
  const parentNode = finderDragOverNode.getParent()
  if (node.id === parentNode?.id) {
    return true
  }
  return parentNode.nodes.some((children) => children.id === node.id)
}

export default useIsDraggingFamily
