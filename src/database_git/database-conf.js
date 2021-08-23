import Vue from 'vue'

import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
Vue.use(firestorePlugin)

// Initialize Firebase
firebase.initializeApp( {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
})

export const db =  firebase.firestore()