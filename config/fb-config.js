const firebase = require("firebase");

var firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "dinner-70925.firebaseapp.com",
    databaseURL: "https://dinner-70925.firebaseio.com",
    projectId: "dinner-70925",
    storageBucket: "dinner-70925.appspot.com",
    messagingSenderId: "81278181735",
    appId: "1:81278181735:web:e6441bc700eae6f17c8fc2",
    measurementId: "G-7N41FQGW63"
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase.auth();
