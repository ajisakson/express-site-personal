import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import firebaseConfig from "./firebaseConfig.json";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;
