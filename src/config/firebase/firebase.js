import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCwaUL9d_JkTlCXCbqTUg_QxJadd5M3DyA',
  authDomain: 'edventure-419614.firebaseapp.com',
  projectId: 'edventure-419614',
  storageBucket: 'edventure-419614.appspot.com',
  messagingSenderId: '503290416665',
  appId: '1:503290416665:web:5aa99b9f6e1e4f6c9fe488'
}
const appFirebase = initializeApp(firebaseConfig)

export default appFirebase
