import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase } from 'firebase/database';

let app: FirebaseApp | undefined;

const apiKey = '';
const projectId = 'telliclick-master';
const messagingSenderId = '';
const appId = '';

/**
 * Returns an instance of the firebase app.
 */
export const getFirebaseApp = () => {
  if (!app) {
    const config = {
      apiKey,
      projectId: projectId,
      authDomain: `${projectId}.firebaseapp.com`,
      databaseURL: `https://${projectId}.firebaseio.com`,
      storageBucket: `${projectId}.appspot.com`,
      messagingSenderId,
      appId,
    };
    if (process.env.NODE_ENV === 'development') {
      config.databaseURL = `http://localhost:9100?ns=${projectId}`;
    }
    app = initializeApp(config);
  }

  return app;
};

/**
 * Returns an instance of the realtime database.
 */
export const getRealtimeDatabase = (): Database => {
  return getDatabase(getFirebaseApp());
};
