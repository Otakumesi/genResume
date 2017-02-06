import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import CreateEditor from './components/editor/create.jsx';
import UpdateEditor from './components/editor/update.jsx';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerRuducer } from 'react-router-redux';

const history = syncHistoryWithStore(browserHistory, store);

document.addEventListener("DOMContentLoaded", e => {
    ReactDOM.render(
        <Provider store={store}>
          <Router history={history}>
            <Route path="/">
              <Route path="/users/:user_id/documents/new" component={CreateEditor} />
              <Route path="/users/:user_id/documents/:document_id/edit" component={UpdateEditor} />
            </Route>
          </Router>
        </Provider>,
        document.getElementById('editor'));
});
