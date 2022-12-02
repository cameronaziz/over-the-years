import produce from 'immer'
import { atom, selector, selectorFamily } from 'recoil'
import { finderUpdate } from '../api/finder'
import { bfsTree, fetchFileTree, USER_ID, visibleTree } from './finder.utils'

export const finderTreeAtom = atom<Finder.Node.StateNode[]>({
  key: 'finderTreeAtom',
  default: fetchFileTree()
})

export const finderDraggingNodeAtom = atom<Finder.Node.StateNode | null>({
  key: 'finderDraggingNodeAtom',
  default: null
})

export const finderDragOverNodeAtom = atom<Finder.Node.StateNode | null>({
  key: 'finderDragOverNodeAtom',
  default: null
})

export const finderEditingNodeIdAtom = atom<string | null>({
  key: 'finderEditingNodeIdAtom',
  default: null
})
export const finderTreeNodeSelector = selectorFamily<Finder.Node.StateNode | null, string>({
  key: 'finderTreeNodeSelector',
  get: id => (actions) => {
    const finderTree = actions.get(finderTreeAtom)
    return bfsTree(id, finderTree)
  },
  set: id => (actions, newValue) => {
    actions.set(finderTreeAtom, prevState => {
      const updated = produce(prevState, draftState => {
        const node = bfsTree(id, draftState)
        for (const key in newValue) {
          const value = newValue[key]
          node[key] = value
        }
        return draftState
      })

      finderUpdate(USER_ID, updated)
      return updated
    })
  },
})

export const finderTreeVisibleSelector = selector<Finder.Node.StateNode[]>({
  key: 'finderTreeVisibleSelector',
  get: (actions) => {
    const finderTree = actions.get(finderTreeAtom)
    return visibleTree(finderTree)
  },
})
