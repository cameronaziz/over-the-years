import styled from 'styled-components'

export const Container = styled.span`
  position: relative;

  &:before {
    content: attr(data-text);
    z-index: 1;
    position: absolute;
    bottom: 100%;
    transform: translateX(-50%);
    left: 50%;
    white-space: nowrap;
    padding: 4px;
    border-radius: 10px;
    background: #000;
    color: #fff;
    text-align: center;
    display: block;
    opacity: 0;
  }

  &:hover:before {
    opacity: 1;
    transition: all 200ms ease-in 600ms;
  }
`
