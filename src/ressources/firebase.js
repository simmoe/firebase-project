	// Import the functions you need from the SDKs you need
	import { initializeApp } from "firebase/app";
	import { getFirestore } from "firebase/firestore";


	// Your web app's Firebase configuration
	const firebaseConfig = {
		apiKey: "AIzaSyCh6qBiQPmlQz1si4wcgt-QXuKVTwlfRBQ",
		authDomain: "chindogu-21adf.firebaseapp.com",
		databaseURL: "https://chindogu-21adf.firebaseio.com",
		projectId: "chindogu-21adf",
		storageBucket: "chindogu-21adf.appspot.com",
		messagingSenderId: "1008991921153",
		appId: "1:1008991921153:web:80b24ea0b04b629b920c00"
	};

	// Initialize Firebase
	export const app = initializeApp(firebaseConfig);
	export const db = getFirestore(app)

