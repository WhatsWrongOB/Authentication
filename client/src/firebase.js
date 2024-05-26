import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDmlhJ5SUf4Vs6s8gClzquYaygwNfgEY7U",
    authDomain: "mern-auth-46fa1.firebaseapp.com",
    projectId: "mern-auth-46fa1",
    storageBucket: "mern-auth-46fa1.appspot.com",
    messagingSenderId: "703221171344",
    appId: "1:703221171344:web:12735c4104e5bd83904415",
    measurementId: "G-D94G200QCG"
};

export const app = initializeApp(firebaseConfig);