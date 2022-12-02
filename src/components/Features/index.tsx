import MountainSVG from '@site/static/img/undraw_docusaurus_mountain.svg'
import ReactSVG from '@site/static/img/undraw_docusaurus_react.svg'
import TreeSVG from '@site/static/img/undraw_docusaurus_tree.svg'
import React, { FC, Fragment } from 'react'
import Feature, { FeatureProps } from './Feature'
import styles from './styles.module.css'

const FeatureList: FeatureProps[] = [
  {
    title: 'Focus on What Matters',
    Svg: TreeSVG,
    description: (
      <Fragment>
        How many &rsquo;Learn Typescript Now!&lsquo; courses targeted at <i>people changing their career</i> are there?
        This isn&lsquo;t that. It&lsquo;s for the engineer that knows what their doing and wants to flex their skills.
      </Fragment>
    ),
  },
  {
    title: 'Learn Common Gotcha\'s',
    Svg: ReactSVG,
    description: (
      <Fragment>
        Designed for the engineer that doesn&lsquo;t want to need to read documentation on a specific product.
        No it won&lsquo;t teach you everything, but it will point you in <i>a</i> direction
      </Fragment>
    ),
  },
  {
    title: 'Am I Funny?',
    Svg: MountainSVG,
    description: (
      <Fragment>
        I love to code, and have fun doing it. When I talk to my team members, I love to have fun with it.
        The writings found here will make learning fun, poking fun and dropping random 🤌. Why not?
      </Fragment>
    ),
  },
]


const Features: FC = () => {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
