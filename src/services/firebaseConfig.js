// firebaseConfig.js (ou um nome similar)

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: "proxima-parada-001.firebaseapp.com",
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
    projectId: "proxima-parada-001",
    storageBucket: "proxima-parada-001.appspot.com",
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID
  };

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Obter uma instância do Firestore
const db = getFirestore(app);

export { db, app };
