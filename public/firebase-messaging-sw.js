// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
const firebaseConfig = {
    apiKey: "AIzaSyB5dld5wr-36Eofj3xLSUfg9pEfXxAS4J4",
    authDomain: "earlybirdfinds-d6823.firebaseapp.com",
    projectId: "earlybirdfinds-d6823",
    storageBucket: "earlybirdfinds-d6823.appspot.com",
    messagingSenderId: "221773930775",
    appId: "1:221773930775:web:f9b739eafb7bec0fe95752",
    measurementId: "G-T7MKDE961L"
  };

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});