import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux'
import { compose, createStore } from 'redux'
import persistState from 'redux-localstorage'
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import bfcApp from "./reducers";

const enhancer = compose(
    persistState(),
)

const store = createStore(bfcApp, enhancer)

ReactDOM.render((
    <Provider store={store}>
        <CookiesProvider>
            <BrowserRouter>
                <App store={store}/>
            </BrowserRouter>
        </CookiesProvider>
    </Provider>
    ),
   document.getElementById('root')
);
registerServiceWorker();
