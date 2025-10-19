
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB700Q-CFdQ93DIv3tBxIzXcuGbyIib4-o",
  authDomain: "aipplytech.firebaseapp.com",
  projectId: "aipplytech",
  storageBucket: "aipplytech.firebasestorage.app",
  messagingSenderId: "155524064281",
  appId: "1:155524064281:web:eee375eaec6f5f74bfb688",
  measurementId: "G-3JR491SPR2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics and get a reference to the service
export const analytics = getAnalytics(app);

export default app;
