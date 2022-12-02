import useNode from '@site/src/hooks/useNode'
import getExtension from '@site/src/utils/getExtension'
import { IconType } from 'react-icons'
import { AiOutlineFile, AiOutlineFolder, AiOutlineFolderOpen } from 'react-icons/ai'
import { DiCss3Full, DiHtml5, DiJavascript1, DiMarkdown, DiReact } from 'react-icons/di'

type UseFileIcon = (nodeId: string) => [IconType]

const useFileIcon: UseFileIcon = (nodeId: string) => {
  const [node] = useNode(nodeId)
  if (node.variant === 'file') {
    const extension = getExtension(node.name)
    switch (extension) {
    case 'md':
      return [DiMarkdown]
    case 'css':
      return [DiCss3Full]
    case 'htm':
    case 'html':
      return [DiHtml5]
    case 'js':
    case 'mjs':
    case 'cjs':
      return [DiJavascript1]
    case 'jsx':
      return [DiReact]
    default:
      return [AiOutlineFile]
    }
  }

  return [node.isOpen ? AiOutlineFolderOpen : AiOutlineFolder]
}

export default useFileIcon
