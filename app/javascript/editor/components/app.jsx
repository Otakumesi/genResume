import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import CreateEditor from './editor/create.jsx';
import UpdateEditor from './editor/update.jsx';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
const history = syncHistoryWithStore(browserHistory, store);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/">
            <Route path="/users/:user_id/documents/new" component={CreateEditor} />
            <Route path="/users/:user_id/documents/:document_id/edit" component={UpdateEditor} />
          </Route>
        </Router>
      </Provider>
    );
  }
}
