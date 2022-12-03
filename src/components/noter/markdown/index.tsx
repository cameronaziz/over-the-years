import useNoteMarkdown from '@site/src/hooks/useNoteMarkdown'
import React, { FC } from 'react'
import { StyledWrapper } from '../noter.styles'
import { StyledMarkdownContainer } from './Markdown.styled'

const Markdown: FC = () => {
  const [html] = useNoteMarkdown()

  return (
    <StyledWrapper>
      <StyledMarkdownContainer
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </StyledWrapper>
  )
}

export default Markdown
