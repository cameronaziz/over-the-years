import styled from 'styled-components'

type StyledFileProps = {
  depth: number
  isDragging: boolean
  isImmediateFamily: boolean
}

export const StyledFolder = styled.section<StyledFileProps>`
  font-weight: bold;
  opacity: ${({ isDragging }) => isDragging ? 0.5 : 1};
  margin-left: 12px;
  padding-left: 2px;
  background-color: ${({ isImmediateFamily }) => isImmediateFamily ? 'rgba(0, 0, 0, 0.2)' : 'white'};
`
