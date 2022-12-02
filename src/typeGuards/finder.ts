export const isFileNode = <T extends Finder.Node.Node>(unknown: T): unknown is Finder.Node.FileVariant<T> =>
  typeof unknown !== 'undefined' &&
  unknown.variant === 'file'

export const isFolderNode = <T extends Finder.Node.Node>(unknown: T): unknown is Finder.Node.FolderVariant<T> =>
  typeof unknown !== 'undefined' &&
  unknown.variant === 'folder'
