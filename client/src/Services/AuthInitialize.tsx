import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCDg9qa0NkXaBkGy5CoMUcdIi2rF0np5hk",
	authDomain: "personal-site-57cc8.firebaseapp.com",
	databaseURL: "https://personal-site-57cc8-default-rtdb.firebaseio.com",
	projectId: "personal-site-57cc8",
	storageBucket: "personal-site-57cc8.appspot.com",
	messagingSenderId: "1087362191593",
	appId: "1:1087362191593:web:1e8fd10abad54f3341e078"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;
