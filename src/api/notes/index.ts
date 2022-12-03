import create from './create'
import read from './read'
import list from './list'
import update from './update'

export { default as noteCreate } from './create'
export { default as noteRead } from './read'
export { default as noteList } from './read'
export { default as noteUpdate } from './update'

export default {
  create,
  read,
  list,
  update,
}
