import React, { FC, Fragment } from 'react'
import Markdown from '../markdown'
import TextArea from './TextArea'

const NoterEditor: FC = () => {
  return (
    <Fragment>
      <TextArea />
      <Markdown />
    </Fragment>
  )
}

export default NoterEditor
