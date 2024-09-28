import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore/lite';
import { routes } from './app.routes';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD6AG2Xh_aV1j17jNYw1BED6zBRaDxOxng',
  authDomain: 'hello-notification-22e1c.firebaseapp.com',
  projectId: 'hello-notification-22e1c',
  storageBucket: 'hello-notification-22e1c.appspot.com',
  messagingSenderId: '464183129315',
  appId: '1:464183129315:web:f1c9212fec54fcaf2bc1d6',
  measurementId: 'G-CB288L654Y',
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => {
      const app = initializeApp(firebaseConfig);
      console.log(firebaseConfig); // Log thông báo khi Firebase được khởi tạo
      return app;
    }), // Gọi initializeApp tại đây
    provideFirestore(() => getFirestore()),
  ],
};
