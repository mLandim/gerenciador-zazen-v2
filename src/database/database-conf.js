import Vue from 'vue'

import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
Vue.use(firestorePlugin)

// Initialize Firebase
firebase.initializeApp( {
    apiKey: "AIzaSyBoNtlOYZIT1YLairikpD8jr37S85SL6Uk",
    authDomain: "zazen-firebase.firebaseapp.com",
    databaseURL: "https://zazen-firebase.firebaseio.com",
    projectId: "zazen-firebase",
    storageBucket: "zazen-firebase.appspot.com",
    messagingSenderId: "934896247928",
    appId: "1:934896247928:web:b5ecea0c7584e7b9"
})

export const db =  firebase.firestore()