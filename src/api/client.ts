import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAMYSPzSv2vf-IVNjXexo9DulXCWIv7gH4",
  authDomain: "over-the-years-86401.firebaseapp.com",
  databaseURL: "https://over-the-years-86401-default-rtdb.firebaseio.com",
  projectId: "over-the-years-86401",
  storageBucket: "over-the-years-86401.appspot.com",
  messagingSenderId: "150646405851",
  appId: "1:150646405851:web:02dcd02d8e2c888152eafe",
  measurementId: "G-2K7NXLSYTZ",
}

const client = initializeApp(firebaseConfig)
export const analytics = getAnalytics(client)

export default client
