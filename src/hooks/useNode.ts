import produce from 'immer'
import { useRecoilState } from 'recoil'
import { finderTreeNodeSelector } from '../stores/finder'

type UseNode = (id: string) => [
  node: Finder.Node.StateNode,
  updateNode: (update: Partial<Finder.Node.StateNode>) => void
]

const useNode: UseNode = (id) => {
  const [node, setNode] = useRecoilState(finderTreeNodeSelector(id))

  const updateNode = (update: Partial<Finder.Node.StateNode>) => {
    setNode((prevState) => {
      return produce(prevState, draftState => {
        for (const key in update) {
          const value = update[key]
          draftState[key] = value
        }
      })
    })

  }

  return [node, updateNode]
}

export default useNode
