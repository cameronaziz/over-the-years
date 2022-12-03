import useListNotes from '@site/src/hooks/useListNotes'
import { allNotesAtom } from '@site/src/stores/notes'
import React, { FC, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import ListItem from './ListItem'


const List: FC = () => {

  const listNotes = useListNotes()
  const notes = useRecoilValue(allNotesAtom)
  

  useEffect(
    () => {
      listNotes()
    },
    [listNotes],
  )

  return (
    <div>
      {notes.map((note) =>
        <ListItem key={note.id} note={note} />
      )}
    </div>
  )
}

export default List
