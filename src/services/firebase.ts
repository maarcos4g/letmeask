import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    //your firebase project credentials
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getDatabase();