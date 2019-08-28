const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyB8JZT0Jy7jQa9f8Mn6BiVWWs5-eCRQ9jQ",
  authDomain: "waiter-app-90737.firebaseapp.com",
  databaseURL: "https://waiter-app-90737.firebaseio.com",
  projectId: "waiter-app-90737",
  storageBucket: "waiter-app-90737.appspot.com",
  messagingSenderId: "521325054457",
  appId: "1:521325054457:web:2779fe7d5543b3c6"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const storageRef = app.storage().ref();
