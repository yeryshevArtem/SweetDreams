import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./config";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
const project = initializeApp(firebaseConfig);

const storage = getStorage(project);
const db = getDatabase(project);
const auth = getAuth(project);

export { storage, db, auth };