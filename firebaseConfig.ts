import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBwk-xM1Hcxm0G0G2J7xoOD4uLhFyA5rWU',

  authDomain: 'pas-mobile-ad9ea.firebaseapp.com',

  projectId: 'pas-mobile-ad9ea',

  storageBucket: 'pas-mobile-ad9ea.appspot.com',

  messagingSenderId: '521612334009',

  appId: '1:521612334009:web:3fb10cb28c66ffc0f89c68',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
