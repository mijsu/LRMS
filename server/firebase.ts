import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

if (!process.env.FIREBASE_PROJECT_ID && process.env.USE_FIREBASE_EMULATOR !== "true") {
  throw new Error("FIREBASE_PROJECT_ID environment variable is not set");
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

if (process.env.USE_FIREBASE_EMULATOR === "true") {
  const host = process.env.FIRESTORE_EMULATOR_HOST || "localhost";
  const port = parseInt(process.env.FIRESTORE_EMULATOR_PORT || "8080", 10);
  connectFirestoreEmulator(db, host, port);
  console.log(`Connected Firestore to emulator at ${host}:${port}`);
}
