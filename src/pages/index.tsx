import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Features from '@site/src/components/Features';
import Layout from '@theme/Layout';
import React, { FC } from 'react';
import Header from '../components/Header';

const Home: FC = () => {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Typescript Expert Knowledge"
      description="Typescript skills I've learned over the years."
    >
      <Header />
      <main>
        <Features />
      </main>
    </Layout>
  );
}

export default Home
