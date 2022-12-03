import { get, getDatabase, query, ref } from 'firebase/database'
import app from '../_service/realtime'
import { entries } from 'typed-enumerate'

type Snapshot = {
  [id: string]: Omit<Note.Model, 'id'>
}
const noteList = async (): Promise<Note.Model[]> => {
  const db = getDatabase(app)
  const notesRef = query(ref(db, 'notes'))
  const snapshot = await get(notesRef)
  

  if (snapshot.exists()) {
    const baseNotes = snapshot.val() as Snapshot

    return entries(baseNotes).map(([id, note]) => ({
      id,
      ...note,
    }))
  }

  return null
}

export default noteList
