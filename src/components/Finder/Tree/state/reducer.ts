// import { createFile, createFolder, searchDFS } from "../../utils";

// const getUUID = (action: Finder.Store.Action) => {
//   switch (action.type) {
//     case 'FILE_CREATE':
//     case 'FOLDER_CREATE':
//       return action.payload.parentUUID
//     case 'FOLDER_UPDATE':
//     case 'FILE_UPDATE':
//       return action.payload.id
//     default:
//       return null
//   }
// }

// const reducer = (state: Finder.Store.State, action: Finder.Store.Action) => {
//   let newState = structuredClone(state)
//   let node = null;
//   let parent = null;
//   const id = getUUID(action)
//   if (id) {
//     let foundNode = searchDFS({
//       data: newState,
//       cond: (item) => {
//         return item.id === id;
//       },
//     });
//     node = foundNode.item;
//     parent = node.parentNode;
//   }


//   switch (action.type) {
//     case 'SET_DATA':
//       newState.nodes = action.payload.data
//       break
//     case 'FILE_CREATE': {
//       const file = createFile(node)
//       newState.editingNodeId = file.id
//       node.contents.push(file)
//       break
//     }
//     case 'FOLDER_CREATE': {
//       const folder = createFolder(node)
//       node.contents.push(folder)
//       newState.editingNodeId = folder.id
//       break
//     }
//     case 'FILE_UPDATE':
//     case 'FOLDER_UPDATE':
//       node.name = action.payload.name;
//       break
//     case 'FILE_DELETE':
//     case 'FOLDER_DELETE':
//       if (!parent || Array.isArray(parent)) {
//         const nodes = newState.nodes.filter((file) => file.id !== action.payload.id);
//         newState.nodes = nodes
//         break
//       }

//       parent.files = parent.files.filter(
//         (file) => file.id !== action.payload.id
//       );
//       break
//     default:
//       return state;
//   }
//   return newState
// };

// export { reducer };
