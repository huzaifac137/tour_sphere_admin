import { initializeApp } from "firebase/app";

import { getMessaging } from "firebase/messaging";

//Firebase Config values imported from .env file
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APP_API_KEY as,
//   authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_APP_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_APP_ID,
//   measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
// };

 const firebaseConfig = {
  apiKey: "AIzaSyB5dld5wr-36Eofj3xLSUfg9pEfXxAS4J4",
  authDomain: "earlybirdfinds-d6823.firebaseapp.com",
  projectId: "earlybirdfinds-d6823",
  storageBucket: "earlybirdfinds-d6823.appspot.com",
  messagingSenderId: "221773930775",
  appId: "1:221773930775:web:f9b739eafb7bec0fe95752",
  measurementId: "G-T7MKDE961L"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Messaging service
export const messaging = getMessaging(app);