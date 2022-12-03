import { MutableRefObject } from 'react'


class Cursor<T extends HTMLDivElement> {
  positionCache: Range | null = null
  elementRef: MutableRefObject<T>

  constructor(ref: MutableRefObject<T>) {
    this.elementRef = ref
  }


  private get element() {
    const { current } = this.elementRef
    if (current) {
      return current
    }
    return document
  }

  get position() {
    const selection = document.getSelection()
    const selectionPosition = selection.getRangeAt(0)
    this.positionCache = selectionPosition
    return selectionPosition
  }

  get start() {
    return this.position.startOffset
  }

  get end() {
    return this.position.endOffset
  }

  setCursorToCached(moveCount?: number) {
    if (this.positionCache) {
      /* ~ LOG */ console.log('~ this.positionCache', this.positionCache)
      const selection = window.getSelection()
      selection.removeAllRanges()
      if (typeof moveCount !== 'undefined' && this.element.childNodes.length > 0) {
        this.positionCache.setStart(this.element, moveCount)
      }
      selection.addRange(this.positionCache)
    }
  }

  updateCachedPosition = () => {
    this.positionCache = this.position
    return this.position
  }
}

export default Cursor
