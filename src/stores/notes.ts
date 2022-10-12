import app from '../api/db'
import { update, push, ref, set, get, child, getDatabase } from "firebase/database";


import { atom, selector, SetRecoilState } from 'recoil'

type Note = {
  id: string | null
  title: string
  content: string
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const DEFAULT_NOTE_TITLE = (() => {
  const now = new Date()
  const time = `${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`
  return `Noter Note - ${time}`
})()

const defaultNote: Note = {
  id: null,
  title: DEFAULT_NOTE_TITLE,
  content: '',
}

export const noteAtom = atom<Note>({
  key: 'noteAtom',
  default: defaultNote,
})

export const noteLoadingAtom = atom<boolean>({
  key: 'noteLoadingAtom',
  default: true,
})

const createNote = (note: Note) => {
  const { id, ...noteContent } = note
  const db = getDatabase(app)
  const newNoteRef = push(child(ref(db), 'notes'))
  set(newNoteRef, {
    ...noteContent
  })
  return newNoteRef.key
}

const updateNote = (note: Note) => {
  const { id, ...noteContent } = note
  const db = getDatabase(app)
  set(ref(db, `notes/${id}`), {
    ...noteContent
  })
}

export const readNote = async (noteId: string): Promise<Omit<Note, 'id'> | null> => {
  const db = getDatabase(app)
  const dbRef = ref(db)
  const snapshot = await get(child(dbRef, `notes/${noteId}`))

  if (snapshot.exists()) {
    return snapshot.val()
  }

  return null
}

const applyChanges = (note: Note, set: SetRecoilState) => {
  if (note.id !== null) {
    updateNote(note)
    set(noteAtom, note)
    return
  }

  const id = createNote(note)
  note.id = id
  set(noteAtom, note)
}

export const noteTitleSelector = selector({
  key: 'noteTitleSelector',
  get: ({ get }) => {
    const note = get(noteAtom)
    return note.title
  },
  set: ({ get, set }, newValue) => {
    if (typeof newValue === 'string') {
      const note = get(noteAtom)
      const copy = {
        ...note,
      }
      copy.title = newValue
      applyChanges(copy, set)
    }
  },
})

export const noteContentSelector = selector({
  key: 'noteContentSelector',
  get: ({ get }) => {
    const note = get(noteAtom)
    return note.content
  },
  set: ({ get, set }, newValue) => {
    if (typeof newValue === 'string') {
      const note = get(noteAtom)
      const copy = {
        ...note,
      }
      copy.content = newValue
      applyChanges(copy, set)
    }
  },
})
