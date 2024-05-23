import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC1JZ1i7VO3ixh5Jd4CbbgprggBSUA4z5o",
    authDomain: "sweet-dreams-bc3b1.firebaseapp.com",
    projectId: "sweet-dreams-bc3b1",
    storageBucket: "sweet-dreams-bc3b1.appspot.com",
    messagingSenderId: "122074611854",
    appId: "1:122074611854:web:cb04773cddf0b9ef0e49df",
    measurementId: "G-7M33X6HG3J",
};

// Initialize Firebase
const project = initializeApp(firebaseConfig);

const storage = getStorage(project);
const db = getDatabase(project);

// const storageRef = ref(storage);

export { storage, db };