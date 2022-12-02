import { child, getDatabase, push, ref, set } from 'firebase/database'
import app from '../_service/realtime'

const noteCreate = (note: Note.Model) => {
  const noteContent = { ...note }
  delete noteContent.id
  const db = getDatabase(app)
  const newNoteRef = push(child(ref(db), 'notes'))
  set(newNoteRef, {
    ...noteContent
  })
  return newNoteRef.key
}

export default noteCreate
