import { child, get, getDatabase, ref } from 'firebase/database'
import app from '../_service/realtime'

const noteRead = async (noteId: string): Promise<Omit<Note.Model, 'id'> | null> => {
  const db = getDatabase(app)
  const dbRef = ref(db)
  const snapshot = await get(child(dbRef, `notes/${noteId}`))

  if (snapshot.exists()) {
    return snapshot.val()
  }

  return null
}

export default noteRead
