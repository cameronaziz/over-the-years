import clsx from 'clsx';
import React, { FC } from 'react';
import styles from './Feature.module.css';

export type FeatureProps = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
}

const Feature: FC<FeatureProps> = (props) => {
  const { title, Svg, description } = props
  
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );

}

export default Feature
