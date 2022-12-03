import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'
import notesAPI from '../api/notes'
import { allNotesAtom } from '../stores/notes'

const useListNotes = () => {
  const setAllNotes = useSetRecoilState(allNotesAtom)
  
  const list = useCallback(async () => {
    const notes = await notesAPI.list()
    /* ~ LOG */ console.log('~ notes', notes)

  
    setAllNotes(notes)
      
  }, [setAllNotes])

  return list
}

export default useListNotes
