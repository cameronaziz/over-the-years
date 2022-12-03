import React, { FC, useState } from 'react'

type ListLinkProps = {
  onClick(): void
  label: string
}

const ListLink: FC<ListLinkProps> = (props) => {
  const { onClick, label} = props
  const [fill, setFill] = useState(0.3)

  const onMouseEnter = () => {
    setFill(0.5)
  }

  const onMouseLeave = () => {
    setFill(0.3)
  }


  const onMouseDown = () => {
    setFill(0.8)
  }

  return (
    <div
      style={{
        backgroundColor: `rgba(231, 147, 37, ${fill})`,
        padding: '2px 4px',
        borderRadius: '4px',
        fontSize: '10px',
        lineHeight: '10px',
        height: 'min-content',
        cursor: 'pointer',
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
    >
      {label}
    </div>
  )
}

export default ListLink
