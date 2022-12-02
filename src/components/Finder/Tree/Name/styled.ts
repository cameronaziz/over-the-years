import styled from 'styled-components'
import ContentEditable from './ContentEditable'

type StyledNameProps = {
  parentOpen: boolean
}

export const StyledName = styled.div<StyledNameProps>`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  
  ${({ parentOpen }) => !parentOpen ? '' : `
    :before {
      content: "";
      display: inline-block;
      position: relative;
      top: 0;
      left: 8px;
      width: 14px;
      height: 3px;
      background-color: #dbdbdd;
      transform: translateX(-12px);
    }
    `}
`

type StyledInputProps = {
  $isEditing: boolean
}


export const StyledInput = styled(ContentEditable)<StyledInputProps>`
  padding: 0 6px;
  height: 28px;
  cursor: ${({ $isEditing }) => $isEditing ? 'text' : 'pointer' };
  flex: 1;
  position: relative;
  z-index:1;
  background: transparent;
  line-height: 1.3;

  ::selection {
    background-color: rgba(231, 147, 37, 0.2); 
  }

  :before {
    position: absolute;
    border-radius: 4px;
    z-index: -1;
    top: -10%;
    left: 0;
    width: 100%;
    height: 87%;
    content: "";
    border: 1px ${({ $isEditing }) => $isEditing ? 'rgba(0,0,150, 0.8)' : 'transparent'} solid;
    background-color: ${({ $isEditing }) => $isEditing ? 'rgba(0,0,150, 0.1)' : 'transparent' };
  }
`
