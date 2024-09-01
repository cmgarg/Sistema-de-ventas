// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "BI0FaUPg2jSE45iQrUc9yTjpT2M_ivWL3SOau0nzIFhbAddeecGUQi2DHmK_TJa-n-4Xh-0zjr-eW7JIKvHsSzQ",
  authDomain: "cmg-company.firebaseapp.com",
  projectId: "cmg-company",
  storageBucket: "cmg-company.appspot.com",
  messagingSenderId: "206948296278",
  appId: "1:206948296278:web:6a2348d8e8e2ea75743df7",
  measurementId: "G-2YKHCCRVNK"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Mensaje recibido en segundo plano:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
