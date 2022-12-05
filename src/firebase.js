

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCOwMbPdTFPAK9cQsN87CFgyCKpPPhY130",
    authDomain: "socialquotes-d2c6e.firebaseapp.com",
    projectId: "socialquotes-d2c6e",
    storageBucket: "socialquotes-d2c6e.appspot.com",
    messagingSenderId: "806122783893",
    appId: "1:806122783893:web:a8faa2cc0c9f7dcc0d879c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)


export {auth, db}