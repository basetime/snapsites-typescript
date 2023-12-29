"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRealtimeDatabase = exports.getFirebaseApp = void 0;
const app_1 = require("firebase/app");
const database_1 = require("firebase/database");
let app;
const apiKey = '';
const projectId = 'telliclick-master';
const messagingSenderId = '';
const appId = '';
/**
 * Returns an instance of the firebase app.
 */
const getFirebaseApp = () => {
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
        app = (0, app_1.initializeApp)(config);
    }
    return app;
};
exports.getFirebaseApp = getFirebaseApp;
/**
 * Returns an instance of the realtime database.
 */
const getRealtimeDatabase = () => {
    return (0, database_1.getDatabase)((0, exports.getFirebaseApp)());
};
exports.getRealtimeDatabase = getRealtimeDatabase;
//# sourceMappingURL=firebase.js.map