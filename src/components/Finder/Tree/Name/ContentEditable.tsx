import ssr from '@site/src/utils/ssr'
import deepEqual from 'fast-deep-equal'
import { Component, createElement, createRef, HTMLAttributes, SyntheticEvent } from 'react'

function normalizeHtml(str: string): string {
  return str && str.replace(/&nbsp;|\u202F|\u00A0/g, ' ')
}

function replaceCaret(element: HTMLElement) {
  const doc = ssr.getDocument()
  const win = ssr.getWindow()
  // Place the caret at the end of the element
  const target = doc.createTextNode('')
  element.appendChild(target)
  // do not move caret if element was not focused
  const isTargetFocused = doc.activeElement === element
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    const selection = win.getSelection()
    if (selection !== null) {
      const range = doc.createRange()
      range.setStart(target, target.nodeValue.length)
      range.collapse(true)
      selection.removeAllRanges()
      selection.addRange(range)
    }
    if (element instanceof HTMLElement) {
      element.focus()
    }
  }
}

interface RefObject<T> {
  current: T | null
}

/**
 * A simple component for an html element with editable contents.
 */
class ContentEditable extends Component<Props> {
  lastHtml: string = this.props.html
  el: RefObject<HTMLElement> = typeof this.props.innerRef === 'function' ? { current: null } : createRef<HTMLElement>()

  getEl = () => (this.props.innerRef && typeof this.props.innerRef !== 'function' ? this.props.innerRef : this.el).current

  render() {
    const { tagName, html, innerRef, ...props } = this.props

  
    // eslint-disable-next-line react/no-danger-with-children
    return createElement(
      tagName || 'div',
      {
        ...props,
        ref: typeof innerRef === 'function' ? (current: HTMLElement) => {
          innerRef(current)
          this.el.current = current
        } : innerRef || this.el,
        onInput: this.emitChange,
        onBlur: this.props.onBlur || this.emitChange,
        onKeyUp: this.props.onKeyUp || this.emitChange,
        onKeyDown: this.props.onKeyDown || this.emitChange,
        contentEditable: !this.props.disabled,
        dangerouslySetInnerHTML: { __html: html }
      },
      this.props.children)
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    const { props } = this
    const el = this.getEl()

    // We need not rerender if the change of props simply reflects the user's edits.
    // Rerendering in this case would make the cursor/caret jump

    // Rerender if there is no element yet... (somehow?)
    if (!el) return true

    // ...or if html really changed... (programmatically, not by user edit)
    if (
      normalizeHtml(nextProps.html) !== normalizeHtml(el.innerHTML)
    ) {
      return true
    }

    // Handle additional properties
    return props.disabled !== nextProps.disabled ||
      props.tagName !== nextProps.tagName ||
      props.className !== nextProps.className ||
      props.innerRef !== nextProps.innerRef ||
      props.placeholder !== nextProps.placeholder ||
      !deepEqual(props.style, nextProps.style)
  }

  componentDidUpdate() {
    const el = this.getEl()
    if (!el) return

    // Perhaps React (whose VDOM gets outdated because we often prevent
    // rerendering) did not update the DOM. So we update it manually now.
    if (this.props.html !== el.innerHTML) {
      el.innerHTML = this.props.html
    }
    this.lastHtml = this.props.html
    replaceCaret(el)
  }

  emitChange = (originalEvt: SyntheticEvent<unknown>) => {
    const el = this.getEl()
    if (!el) return

    const html = el.innerHTML
    if (this.props.onChange && html !== this.lastHtml) {
      // Clone event with Object.assign to avoid
      // "Cannot assign to read only property 'target' of object"
      const evt = Object.assign({}, originalEvt, {
        target: {
          value: html
        }
      })
      this.props.onChange(evt)
    }
    this.lastHtml = html
  }
}

export type ContentEditableEvent = SyntheticEvent<unknown, Event> & { target: { value: string } };
type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R;
type DivProps = Modify<JSX.IntrinsicElements['div'], { onChange: ((event: ContentEditableEvent) => void) }>;

export interface Props extends DivProps {
  html: string,
  disabled?: boolean,
  tagName?: string,
  className?: string,
  style?: HTMLAttributes<HTMLDivElement>['style']
  innerRef?: RefObject<HTMLElement> | ((element: HTMLElement) => void),
}

export default ContentEditable
