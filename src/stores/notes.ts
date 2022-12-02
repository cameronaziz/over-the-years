import { atom, selector, SetRecoilState } from 'recoil'
import notesAPI from '../api/notes'

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

const defaultNote: Note.Model = {
  id: null,
  title: DEFAULT_NOTE_TITLE,
  content: '',
}

export const noteAtom = atom<Note.Model>({
  key: 'noteAtom',
  default: defaultNote,
})

export const noteLoadingAtom = atom<boolean>({
  key: 'noteLoadingAtom',
  default: true,
})


const applyChanges = (note: Note.Model, set: SetRecoilState) => {
  if (note.id !== null) {
    notesAPI.update(note)
    set(noteAtom, note)
    return
  }

  const id = notesAPI.create(note)
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
