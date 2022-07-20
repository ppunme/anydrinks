import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyBjRCHufra82kL3yTEB0MHGiR8wMk6oC8c',
  authDomain: 'anystuff-9ec0e.firebaseapp.com',
  projectId: 'anystuff-9ec0e',
  storageBucket: 'anystuff-9ec0e.appspot.com',
  messagingSenderId: '1047079251109',
  appId: '1:1047079251109:web:6461c1e1f355f5f18d714c',
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(firebaseApp);

export { auth };
export default db;
