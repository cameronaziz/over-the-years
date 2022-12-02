declare namespace Finder {
  namespace Store {
    type State = {
      nodes: Finder.Node[]
      editingNodeId: string | null
    }

    type ActionTypeBuilder<T extends string, U> = {
      type: T
      payload: U & {
        id: string
      }
    }

    type SetDataPayload = {
      data: Node[]
    }
    type SetData = {
      type: 'SET_DATA',
      payload: SetDataPayload
    }

    type CloseUpdate = {
      type: 'CLOSE_UPDATE',
    }

    type FileCreatePayload = {
      parentUUID: string
    }
    type FileCreate = {
      type: 'FILE_CREATE'
      payload: FileCreatePayload
    }

    type FolderCreatePayload = {
      parentUUID: string
    }
    type FolderCreate = {
      type: 'FOLDER_CREATE'
      payload: FolderCreatePayload
    }

    type FileUpdatePayload = {
      name: string
    }
    type FileUpdate = ActionTypeBuilder<'FILE_UPDATE', FileUpdatePayload>

    type FolderUpdatePayload = {
      name: string
    }
    type FolderUpdate = ActionTypeBuilder<'FOLDER_UPDATE', FolderUpdatePayload>

    type FileDelete = ActionTypeBuilder<'FILE_DELETE', never>

    type FolderDelete = ActionTypeBuilder<'FOLDER_DELETE', never>

    type Action =
      | SetData
      | FileCreate
      | FolderCreate
      | FileUpdate
      | FolderUpdate
      | FileDelete
      | FolderDelete
      | CloseUpdate

    type ActionType = Action['type']
  }
}
