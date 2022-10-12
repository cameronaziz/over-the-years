import NoterEditor from '@site/src/components/noter/editor';
import NoterHeading from '@site/src/components/noter/heading';
import Layout from '@theme/Layout';
import React, { FC } from 'react';
import styles from './styles.module.css';

const Noter: FC = () => {
  return (
    <Layout
      title="Typescript Expert Knowledge"
      description="Typescript skills I've learned over the years."
    >
      <div className={styles.container}>
        <NoterHeading />
        <NoterEditor />
      </div>
    </Layout>
  );
}

export default Noter
