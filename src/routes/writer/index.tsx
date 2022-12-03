import Finder from '@site/src/components/Finder'
import NoterEditor from '@site/src/components/noter/editor'
import NoteLayout from '@site/src/components/noter/layout'
import useRenderNote from '@site/src/hooks/useRenderNote'
import Layout from '@theme/Layout'
import React, { FC } from 'react'
import withRecoilRoot from '../../hoc/withRecoilRoot'

const Writer: FC = () => {
  useRenderNote('writer')

  return (
    <Layout
      title="Typescript Expert Knowledge"
      description="Typescript skills I've learned over the years."
    >
      <NoteLayout>
        <Finder />
        <NoterEditor />
      </NoteLayout>
    </Layout>
  )
}

export default withRecoilRoot(Writer)
