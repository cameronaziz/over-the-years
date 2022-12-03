import { getDocument as ssrDocument, getWindow as ssrWindow } from 'ssr-window'

export const getWindow = (): Window => {
  if (typeof window === 'undefined') {
    return ssrWindow()
  }
  return window
}


export const getDocument = (): Document => {
  if (typeof document === 'undefined') {
    return ssrDocument()
  }
  return document
}

const ssr = {
  getWindow,
  getDocument,
}

export default ssr
