importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDS_IAVmdRNa8pfv7c8L0KJeSfdVBDFdqU",
  authDomain: "cmg-company.firebaseapp.com",
  projectId: "cmg-company",
  storageBucket: "cmg-company.appspot.com",
  messagingSenderId: "206948296278",
  appId: "1:206948296278:web:6a2348d8e8e2ea75743df7",
  measurementId: "G-2YKHCCRVNK"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message pppppppppppppppppppppppppppppppppppppppppp', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
