import COLORS from '@site/src/utils/colors'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  place-items: center;
  justify-items: center;
  background-color: ${COLORS.DIRT};
  color: ${COLORS.STONE};
  font-family: "Open Sans", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  min-height: 100vh;
`

export const Grid = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 20rem;
  margin-bottom: 20vh;
`

export const Icon = styled.svg`
  height: 1em;
  display: inline-block;
  fill: ${COLORS.STONE};
  width: 1em;
  vertical-align: middle;
`

export const Hidden = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`

export const Form = styled.form`
  display: grid;
  grid-gap: 0.875rem;
  gap: 0.875rem;
  color: ${COLORS.CHARCOAL};
`

export const Field = styled.div`
  display: flex;
`

export const Label = styled.label`
  border-radius: 0.25rem;
  padding: 1rem;
  background-color: ${COLORS.VIVID};
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
`

export const Input = styled.input`
  border-radius: 0.25rem;
  padding: 1rem;
  background-color: ${COLORS.WOOD};
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  flex: 1;
  border: none;

  :focus {
    outline-color: ${COLORS.DIRT};
    outline-offset: -3px;
  }

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    box-shadow: 0 0 0 30px ${COLORS.STONE} inset !important;
    -webkit-box-shadow: 0 0 0 30px ${COLORS.STONE} inset !important;
  }
`

export const Submit = styled.input`
  border-radius: 0.25rem;
  padding: 1rem;
  background-color: ${COLORS.ACTION};
  color: ${COLORS.STONE};
  font-weight: 700;
  text-transform: uppercase;
  flex: 1;
  border: none;

  :hover {
    cursor: pointer;
  }
`
