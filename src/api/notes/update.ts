import { getDatabase, ref, set } from 'firebase/database'
import app from '../_service/realtime'

const noteUpdate = (note: Partial<Note.Model>, noteId?: string) => {
  const { id, ...noteContent } = note
  const key = typeof noteId !== 'undefined' ? noteId : id
  const db = getDatabase(app)
  const newNoteRef = ref(db, `notes/${key}`)
  set(newNoteRef, {
    ...noteContent
  })
  return newNoteRef.key
}

export default noteUpdate
