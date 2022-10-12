import { useRecoilState, useSetRecoilState } from 'recoil'
import { useLocation, matchPath, useHistory } from '@docusaurus/router'
import { noteAtom, noteLoadingAtom, readNote } from '../stores/notes'
import { useCallback, useEffect } from 'react'

type Params = {
  noteId?: string
}

const useLoadNote = (basePath: string) => {
  const location = useLocation()
  const setNoteLoading = useSetRecoilState(noteLoadingAtom)
  const history = useHistory()
  const [note, setNote] = useRecoilState(noteAtom)
  const { id } = note
  const { pathname } = location
  
  const load = useCallback(async (noteId: string) => {
      const note = await readNote(noteId)
      if (!note) {
        history.replace(`/${basePath}`)
        return
      }
  
      setNote({
        id: noteId,
        ...note,
      })
      
  }, [location, setNote])

  const loadNote = useCallback(async () => {
    const matchId = matchPath<Params>(pathname, {
      path: `/${basePath}/:noteId`
    })


    if (id === null && matchId && matchId.params.noteId) {
      const { noteId } = matchId.params
      setNoteLoading(true)
      await load(noteId)
      setNoteLoading(false)
      return
    }

    const match = matchPath<Params>(pathname, {
      path: `/${basePath}`,
      exact: true
    })

    if (id !== null && match) {
      history.replace(`/${basePath}/${id}`)

    }
  }, [id, pathname, setNoteLoading])

  useEffect(() => {
    loadNote()
  }, [loadNote])
}

export default useLoadNote
