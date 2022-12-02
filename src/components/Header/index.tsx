import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import clsx from 'clsx'
import React, { FC } from 'react'
import styles from './index.module.css'

const Header: FC = () => {
  const {siteConfig} = useDocusaurusContext()

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  )
}

export default Header
