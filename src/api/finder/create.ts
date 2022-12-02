import { collection, doc, setDoc } from 'firebase/firestore'
import firestore from '../_service/firestore'
import { removeFunctions } from './utils'



const finderNodeCreate = async <T extends Finder.Node.StateNode>(userId: string, tree: T | T[]) => {
  const finderRef = collection(firestore, 'finder')

  const state = Array.isArray(tree) ? tree : [tree]
  const nodes = removeFunctions(state)

  await setDoc(doc(finderRef, userId), {
    nodes
  })
}

export default finderNodeCreate
