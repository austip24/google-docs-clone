// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyACkMG2Th8FDzAFWcTECXLBwmKQmEmzEpw",
	authDomain: "docs-clone-2765c.firebaseapp.com",
	projectId: "docs-clone-2765c",
	storageBucket: "docs-clone-2765c.appspot.com",
	messagingSenderId: "191402714656",
	appId: "1:191402714656:web:ae42a90496a6ae3ec2be45",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// auth
const auth = getAuth(app);

export { db, auth };
