import List from './List'
import React, { FC, Suspense } from 'react'
import Tree from './Tree/Tree'

const NEXT_UI = false

const Finder: FC = () => {
  return (
    <Suspense fallback={null}>
      <div style={{ flexShrink: 5 }}>
        {NEXT_UI ? <Tree /> : <List />}
      </div>
    </Suspense>
  )
}

export default Finder 
