import showdown from 'showdown'
import { useRecoilState } from "recoil"
import { noteContentSelector } from "../stores/notes"
import { useRef } from 'react'

type UseNoteMarkdown = () => [html: string, setMarkdown: (markdown: string) => void, markdown: string]

const useNoteMarkdown: UseNoteMarkdown = () => {
  const [content, setContent] = useRecoilState(noteContentSelector)
  const converterRef = useRef(new showdown.Converter())
  const html = converterRef.current.makeHtml(content)

  return [html, setContent, content]
}

export default useNoteMarkdown
