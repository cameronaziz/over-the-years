import { matchPath, useLocation } from '@docusaurus/router'
import { useMemo } from 'react'


type AppVariant = 'reader' | 'writer'
type UseAppVariant = () => AppVariant
const defaultAppVariant: AppVariant = 

const useAppVariant: UseAppVariant = () => {
  const location = useLocation()
  const { pathname } = location

  return useMemo(
    () => !!matchPath(pathname, {
        path: '/writer*',
      }) ?'writer' : 'reader'
    ,
    [pathname],
  )

}

export default useAppVariant
