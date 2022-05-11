// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAy_AtVSmBkZ5cT9WNrDylTq4MWITmy5xU',
  authDomain: 'my-clone-netflix.firebaseapp.com',
  projectId: 'my-clone-netflix',
  storageBucket: 'my-clone-netflix.appspot.com',
  messagingSenderId: '972072915238',
  appId: '1:972072915238:web:ab2e2eddc9114c979f71e7'
}

// Initialize Firebase
/** check app init */
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export { db, auth }

export default app
