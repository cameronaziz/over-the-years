// import produce from 'immer';
// import { useRecoilState } from "recoil";
// import { finderDisplayNodeSelector } from "../stores/finder";

// type Handlers = {
//   click(): void
// }

// type UseDisplayNode = (id: string) => [
//   node: Finder.Node.DisplayNode,
//   updateNode: (update: Partial<Finder.Node.DisplayNode>) => void,
//   handlers: Handlers
// ]

// const useDisplayNode: UseDisplayNode = (id) => {
//   const [node, setNode] = useRecoilState(finderDisplayNodeSelector(id))

//   const updateNode = (update: Partial<Finder.Node.DisplayNode>) => {
//     setNode((prevState) => {
//       return produce(prevState, draftState => {
//         for (let key in update) {
//           const value = update[key]
//           draftState[key] = value
//         }
//       })
//     })
//   }

//   const handlers = {
//     click: () => {
//       const { variant } = node
//       switch (variant) {
//         case 'folder': {
//           updateNode({
//             isOpen: true
//           })
//           break
//         }
//         case 'file': {
//           // Open File
//           break
//         }

//         default: {
//           throw new Error(`Invalid variant type: ${variant}`)
//         }
//       }
//     }
//   }

//   return [node, updateNode, handlers]
// }

// export default useDisplayNode
