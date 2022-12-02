import React, { FC, Suspense } from 'react'
import Tree from './Tree/Tree'

const Finder: FC = () => {
  return (
    <Suspense fallback={null}>
      <div style={{ flexShrink: 5 }}>
        <Tree />
      </div>
    </Suspense>
  )
}

export default Finder 
