import React, { Component } from 'react';
import Editor from './shared/editor.jsx';
import Reviewer from './shared/reviewer.jsx';
import DOCUMENT_IDENTIFY from '../../actions/index';

export default class UpdateEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let id = this.props.params["document_id"];
        let user_id = this.props.params["user_id"];
        return (
            <div>
              <Editor isNewDoc={false}
                      params={{id: id, user_id: user_id}}
                      id={id}
                      user_id={user_id} />
              <Reviewer />
            </div>
        );
    }
}
