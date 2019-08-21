import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import firebase from 'firebase/app'
// main app
import AppRoutes from './routes';
import HttpsRedirect from 'react-https-redirect';

const config = {
    apiKey: "AIzaSyCRytL_xEruC_-gSaBPYfBdklVGTWRR_u8",
    authDomain: "innocare-b4f65.firebaseapp.com",
    databaseURL: "https://innocare-b4f65.firebaseio.com",
    projectId: "innocare-b4f65",
    storageBucket: "innocare-b4f65.appspot.com",
    messagingSenderId: "1050728880080"
};

firebase.initializeApp(config);

ReactDOM.render(
    <Provider store={store}>
    <HttpsRedirect>
    <AppRoutes />
    </HttpsRedirect>
    </Provider>, 
    document.getElementById('app')
)