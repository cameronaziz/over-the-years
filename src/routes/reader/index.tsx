import NoteLayout from '@site/src/components/noter/layout'
import Markdown from '@site/src/components/noter/markdown'
import useRenderNote from '@site/src/hooks/useRenderNote'
import Layout from '@theme/Layout'
import React, { FC } from 'react'
import withRecoilRoot from '../../hoc/withRecoilRoot'

const Notes: FC = () => {
  useRenderNote('notes')

  return (
    <Layout
      title="Typescript Expert Knowledge"
      description="Typescript skills I've learned over the years."
    >
      <NoteLayout>
        <Markdown />
      </NoteLayout>
    </Layout>
  )
}

export default withRecoilRoot(Notes)
