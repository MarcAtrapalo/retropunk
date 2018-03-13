import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main/components/Main';
import MainReducer from './Main/redux/reducer';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import * as firebase from 'firebase';
import logger from 'redux-logger';
import {linkStoreWithFirebase} from './firebase';

firebase.initializeApp({
    apiKey: "AIzaSyBDgXXPkYo3roZICGR2j_ySfjJwbCuBllM",
    authDomain: "retropunk-f572f.firebaseapp.com",
    databaseURL: "https://retropunk-f572f.firebaseio.com",
    projectId: "retropunk-f572f",
    storageBucket: "retropunk-f572f.appspot.com",
    messagingSenderId: "135332344397",
});

const store = createStore(
    combineReducers({
        main: MainReducer,
    }),
    applyMiddleware(logger),
);

linkStoreWithFirebase(firebase.database(), store);

ReactDOM.render(
    <Provider store={store}>
        <Main/>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
