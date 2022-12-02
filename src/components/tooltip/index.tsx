import React, { FC, ReactNode } from 'react'
import { Container } from './styled'

type TooltipProps = {
  children: ReactNode
  text: string
}

const Tooltip: FC<TooltipProps> = (props) => {
  const { children, text } = props

  return (
    <Container data-text={text}>
      {children}
    </Container>
  )
}

export default Tooltip
