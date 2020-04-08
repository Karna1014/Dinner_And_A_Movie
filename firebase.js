
const config = {
  apiKey: "AIzaSyBOmny4mwrBq_uySxdWhy22Rfk1ax5uDB4",
  authDomain: ""
  databaseURL: "https://console.firebase.google.com/project/dinner-70925/database/firestore/data~2F",
  storageBucket: "",
  messagingSenderID: ""
};
firebase.initializeApp(config);


const firebase = require('firebase');
const firebaseui = require('firebaseui');

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  });

  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      }
    ]
  });

  // Is there an email link sign-in?
if (ui.isPendingRedirect()) {
    ui.start('#firebaseui-auth-container', uiConfig);
  }
  // This can also be done via:
  if ((firebase.auth().isSignInWithEmailLink(window.location.href)) {
    ui.start('#firebaseui-auth-container', uiConfig);
  }