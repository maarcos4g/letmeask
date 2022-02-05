import {initializeApp} from 'firebase/app';

import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCHxu7nOmFUCgLPrxpnLE50Ku5FOgQ1GwY",
    authDomain: "letmeask-311d2.firebaseapp.com",
    databaseURL: "https://letmeask-311d2-default-rtdb.firebaseio.com",
    projectId: "letmeask-311d2",
    storageBucket: "letmeask-311d2.appspot.com",
    messagingSenderId: "1069135953075",
    appId: "1:1069135953075:web:35dba67b2fcd840877c4c6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getDatabase();