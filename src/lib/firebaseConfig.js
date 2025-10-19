
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB700Q-CFdQ93DIv3tBxIzXcuGbyIib4-o",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "aipplytech.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "aipplytech",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "aipplytech.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "155524064281",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:155524064281:web:eee375eaec6f5f74bfb688",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-3JR491SPR2"
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
