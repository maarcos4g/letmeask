import firebase, { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    //your firebase config
};

const app = initializeApp(firebaseConfig);
//firebase.initializeApp(firebaseConfig);

const auth = getAuth();
const database = getDatabase(app);

export { auth, database };