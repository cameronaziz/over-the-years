// import { finderTreeDisplaySelector } from "@site/src/stores/finder";
import { finderTreeAtom } from '@site/src/stores/finder'
import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { StyledTree } from './styled'
import TreeRecursive from './TreeRecursive/TreeRecursive'


const Tree: FC = () => {
  const finderDisplay = useRecoilValue(finderTreeAtom)

  return (
    <StyledTree>
      <TreeRecursive nodes={finderDisplay} />
    </StyledTree>
  )
}


export default Tree
