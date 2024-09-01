// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyDS_IAVmdRNa8pfv7c8L0KJeSfdVBDFdqU",
    projectId: "cmg-company",
    messagingSenderId: "206948296278",
    appId: "1:206948296278:web:6a2348d8e8e2ea75743df7",
    measurementId: "G-2YKHCCRVNK"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);