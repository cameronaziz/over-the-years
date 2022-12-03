import React, { FC } from 'react'
import { useHistory } from '@docusaurus/router'
import ListLink from './ListLink'

type ListLinkProps = {
  note: Note.Model
}

const ListItem: FC<ListLinkProps> = (props) => {
  const { note: { id, title } } = props
  
  const history = useHistory()

  const onClickLoad = () => {
    history.push(`/writer/${id}`)
  }

  const onClickCopy = () => {
    navigator.clipboard.writeText(`https://overtheyears.cameronaziz.dev/notes/${id}`)
  }

  return (
    <div
      style={{
        display: 'flex',
        margin: '1px 0',
        alignItems: 'baseline',
        gap: '8px',
        maxWidth: '200px',
      }}
    >
      <div
        style={{
          overflowX: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          flex: 1,
        }}
      >
        {title}
      </div>
      <ListLink
        onClick={onClickLoad}
        label="Load"
      />
      <ListLink
        onClick={onClickCopy}
        label="Copy"
      />
    </div>
  )
}

export default ListItem
