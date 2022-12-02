import styled from 'styled-components'

export const StyledTree = styled.div`
  line-height: 1.75;
  z-index: 1;

  .tree__input {
    width: auto;
  }
`

export const ActionsWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-between;

  .actions {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    opacity: 0;
    pointer-events: none;
    transition: 0.2s;

    > * {
      cursor: pointer;
      margin-left: 10px;
      transform: scale(1);
      transition: 0.2s;

      :hover {
        transform: scale(1.1);
      }
    }
  }

  &:hover .actions {
    opacity: 1;
    pointer-events: all;
    transition: 0.2s;
  }
`


type CollapseProps = {
  isOpen: boolean
}

export const Collapse = styled.div<CollapseProps>`
  height: max-content;
  max-height: ${p => p.isOpen ? '800px' : '0px'};
  overflow: hidden;
  transition: 0.3s ease;
`

export const VerticalLine = styled.section`
  position: relative;
  
  :before {
    content: "";
    display: block;
    position: absolute;
    top: -2px;
    left: 6px;
    width: 2px;
    background-color: #dbdbdd;
    bottom: 12px;
  }
`
