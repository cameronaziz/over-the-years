import nodeCreate from './create'
import read from './read'
import update from './update'

export { default as finderNodeCreate } from './create'
export { default as finderRead } from './read'
export { default as finderUpdate } from './update'

export const node = {
  create: nodeCreate,
}

export default {
  node,
  nodeCreate,
  read,
  update,
}
