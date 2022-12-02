import { initializeApp } from 'firebase/app'
import firebaseConfig from './config'
// const firebaseConfig = {
//   databaseURL: 'https://over-the-years-86401-default-rtdb.firebaseio.com',
// }



const app = initializeApp(firebaseConfig)

export default app
