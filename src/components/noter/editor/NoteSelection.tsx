import React, { FC } from 'react'

type NoteSelectionProps = {
  isVisible: boolean
}

const NoteSelection: FC<NoteSelectionProps> = (props) => {
  const { isVisible } = props


  if (!isVisible) {
    return null
  }

  return (
    <div style={{ height: '200px', width: '200px', backgroundColor: 'red', position: 'absolute', top: 0, left: 0, }}>

    </div>
  )
}

export default NoteSelection
