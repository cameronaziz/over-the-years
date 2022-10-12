import React, { ComponentType, Component } from 'react'
import { RecoilRoot } from 'recoil'

const withRecoilRoot = <T,>(WrappedComponent: ComponentType<T>) => {
  return class Wrapped extends Component<T> {
    render() {
      return (
        <RecoilRoot>
          <WrappedComponent {...this.props} />
        </RecoilRoot>
      )
    }
  }
}

export default withRecoilRoot
