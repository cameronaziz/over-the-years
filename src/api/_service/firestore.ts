import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import app from './app'

const firestore = getFirestore(app)
export const analytics = getAnalytics(app)

export default firestore
