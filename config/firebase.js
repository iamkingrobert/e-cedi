import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import constants from "expo-constants";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: constants.manifest?.extra?.firebaseApiKey,
  authDomain: constants.manifest?.extra?.firebaseAuthDomain,
  projectId: constants.manifest?.extra?.firebaseProjectId,
  storageBucket: constants.manifest?.extra?.firebaseStorageBucket,
  messagingSenderId: constants.manifest?.extra?.firebaseMessagingSenderId,
  appId: constants.manifest?.extra?.firebaseAppId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);
export { app, storage, firestore };
