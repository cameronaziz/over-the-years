import Layout from '@theme/Layout'
import React, { FC } from 'react'
import useLoadNote from '../../hooks/useLoadNote'
import withRecoilRoot from '../../hoc/withRecoilRoot'
import Markdown from '@site/src/components/noter/markdown'
import NoteLayout from '@site/src/components/noter/layout'

const Notes: FC = () => {
  useLoadNote('notes')

  return (
    <Layout
      title="Typescript Expert Knowledge"
      description="Typescript skills I've learned over the years."
    >
      <NoteLayout>
        <Markdown />
      </NoteLayout>
    </Layout>
  );
}

export default withRecoilRoot(Notes)
