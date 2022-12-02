declare namespace Finder {
  namespace Node {
    type Variant = 'file' | 'folder'

    type FileVariant<T> = T & {
      variant: 'file'
    }

    type FolderVariant<T> = T & {
      variant: 'folder'
    }

    // Input
    type Base = {
      id: string
      name: string | null
      variant: Variant
    }

    type Folder = Base & {
      variant: 'folder'
      nodes: Node[]
    }

    type File = Base & {
      variant: 'file'
    }

    type Node = File | Folder

    // State
    type StateBase = Base & {
      parentNodeId: string | null
      getParent(): null | StateFolder
    }

    type StateFolder = StateBase & Omit<Folder, 'nodes'> & {
      nodes: StateNode[]
      isOpen: boolean
    }

    type StateFile = StateBase & File

    type StateNode = StateFile | StateFolder

    // Storage
    type StorageBase = Base & {
      parentNodeId: string | null
    }

    type StorageFolder = StorageBase & Omit<Folder, 'nodes'> & {
      nodes: StorageNode[]
      isOpen: boolean
    }

    type StorageFile = StorageBase & File

    type StorageNode = StorageFile | StorageFolder

    type Storage = {
      nodes: StorageNode[]
    }
  }
}
