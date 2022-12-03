import showdown from 'showdown'
import { useRecoilState, useRecoilValue } from 'recoil'
import { noteContentSelector, noteLoadingAtom } from '../stores/notes'
import { useRef } from 'react'

type UseNoteMarkdown = () => [html: string, setMarkdown: (markdown: string) => void, markdown: string]

const useNoteMarkdown: UseNoteMarkdown = () => {
  const isNoteLoading = useRecoilValue(noteLoadingAtom)
  const [content, setContent] = useRecoilState(noteContentSelector)
  const converterRef = useRef(new showdown.Converter())
  const html = isNoteLoading ? '' : converterRef.current.makeHtml(content)

  return [html, setContent, content]
}

export default useNoteMarkdown
