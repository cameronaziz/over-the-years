import React, { FC } from 'react'
import styles from './styles.module.css'

const FontSize: FC = () => {
  return (
    <div className={styles.fontSize}>
      Font
      <button>-</button>
      <button>+</button>
    </div>
  )
}

export default FontSize
