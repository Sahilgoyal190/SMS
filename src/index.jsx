import React from 'react';
import ReactDom from 'react-dom';
import Roots from './schoolLogin/lib/roots.js';
import firebase from 'firebase'
import firebaseConfig from '../firebase.config.js'
export const firebaseApp = firebase.initializeApp(firebaseConfig);



ReactDom.render(
    <div>
        {Roots}
    </div>
    , document.getElementById('root')
)
