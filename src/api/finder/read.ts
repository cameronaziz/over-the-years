import { doc, getDoc } from 'firebase/firestore'
import firestore from '../_service/firestore'

const finderRead = async (userId: string): Promise<Finder.Node.Storage> => {
  const docRef = doc(firestore, 'finder', userId)
  const docSnap = await getDoc(docRef)
  
  if (!docSnap.exists()) {
    throw new Error(`No document found for userId ${userId}`)
  }

  return docSnap.data() as Finder.Node.Storage
}

export default finderRead
