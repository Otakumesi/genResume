import { createStore, combineReducers, applyMiddleware } from 'redux';

import document from './reducer';

import createSagaMiddleware from 'redux-saga';
import 'babel-polyfill';
const sagaMiddleware = createSagaMiddleware();
import mySaga from './sagas/index';
import { routerReducer } from 'react-router-redux';

const store = createStore(
    combineReducers({document, routing: routerReducer}),
    applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

export default store;
