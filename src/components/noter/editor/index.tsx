import React, { FC } from 'react'
import Markdown from '../markdown'
import TextArea from './TextArea'

const NoterEditor: FC = () => {
  return (
    <>
      <TextArea />
      <Markdown />
    </>
  )
}

export default NoterEditor
