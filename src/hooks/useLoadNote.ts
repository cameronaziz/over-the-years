import { useHistory, useLocation } from '@docusaurus/router'
import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'
import notesAPI, { noteUpdate } from '../api/notes'
import { noteAtom } from '../stores/notes'

const useLoadNote = (basePath: string) => {
  const location = useLocation()
  const history = useHistory()
  const setNote = useSetRecoilState(noteAtom)
  
  const load = useCallback(async (noteId: string, nonExist?: Partial<Note.Model>) => {
    const note = await notesAPI.read(noteId)
    if (!note) {
      if (typeof nonExist !== 'undefined') {
        noteUpdate(nonExist, noteId)
        setNote({
          id: noteId,
          ...note,
          ...nonExist,
        })
        return
      }
      history.replace(`/${basePath}`)
      return
    }
  
    setNote({
      id: noteId,
      ...note,
    })
      
  }, [location, setNote])

  return load
}

export default useLoadNote
