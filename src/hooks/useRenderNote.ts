import { matchPath, useHistory, useLocation } from '@docusaurus/router'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { noteAtom, noteLoadingAtom } from '../stores/notes'
import useLoadNote from './useLoadNote'

type Params = {
  noteId?: string
}

const useRenderNote = (basePath: string) => {
  const load = useLoadNote(basePath)
  const location = useLocation()
  const setNoteLoading = useSetRecoilState(noteLoadingAtom)
  const history = useHistory()
  const note = useRecoilValue(noteAtom)
  const { id } = note
  const { pathname } = location

  const loadNote = useCallback(async () => {
    const matchId = matchPath<Params>(pathname, {
      path: `/${basePath}/:noteId`
    })


    if (matchId && matchId.params.noteId) {
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
  }, [loadNote, location.pathname])

}

export default useRenderNote
