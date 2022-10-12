import NoterEditor from '@site/src/components/noter/editor'
import NoterHeading from '@site/src/components/noter/heading'
import Layout from '@theme/Layout'
import React, { FC } from 'react'
import styles from './styles.module.css'
import useLoadNote from '../../hooks/useLoadNote'
import withRecoilRoot from '../../hoc/withRecoilRoot'
import NoteLayout from '@site/src/components/noter/layout'

const Noter: FC = () => {
  useLoadNote('noter')

  return (
    <Layout
      title="Typescript Expert Knowledge"
      description="Typescript skills I've learned over the years."
    >
      <NoteLayout>
        <NoterEditor />
      </NoteLayout>
    </Layout>
  );
}

export default withRecoilRoot(Noter)
