// react and related 
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// redux and related 
import { Provider } from 'react-redux'
import { compose, createStore } from 'redux'
import persistState from 'redux-localstorage'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import bfcApp from "./reducers";

const enhancer = compose(
    persistState(),
)

const store = createStore(bfcApp, enhancer)

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
