import { doc, updateDoc } from 'firebase/firestore'
import firestore from '../_service/firestore'
import { removeFunctions } from './utils'

const finderUpdate = async <T extends Utils.RecursivePartial<Finder.Node.StateNode>>(userId: string, partialTree: T | T[]): Promise<void> => {
  const docRef = doc(firestore, 'finder', userId)


  const state = Array.isArray(partialTree) ? partialTree : [partialTree]
  const nodes = removeFunctions(state as Finder.Node.StateNode[])

  await updateDoc(docRef, {
    nodes
  })
}

export default finderUpdate
