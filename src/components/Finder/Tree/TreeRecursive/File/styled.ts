import styled from 'styled-components'

type StyledFileProps = {
  isDragging: boolean
  isImmediateFamily: boolean
  isOpen: boolean
}

export const StyledFile = styled.div<StyledFileProps>`
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  font-weight: normal;
  opacity: ${({ isDragging }) => isDragging ? 0.5 : 1};
  margin-left: 12px;
  color: #A1045A;
  padding-left: 2px;
  background-color: ${({ isImmediateFamily, isOpen }) => {
    if (isOpen) {
      return 'rgba(161, 4, 90, 0.1)'
    }
    return isImmediateFamily ? 'rgba(0, 0, 0, 0.2)' : 'white'
  }};
`

export const Hidden = styled.div`
  opacity: 0;
`
