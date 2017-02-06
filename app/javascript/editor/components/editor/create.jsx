import React, { Component } from 'react';
import Editor from './shared/editor.jsx';
import DOCUMENT_IDENTIFY from '../../actions/index';

export default class CreateEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let user_id = this.props.params["user_id"];
        return (
            <div className="container-fluid row">
              <Editor
                isNewDoc={true}
                user_id={user_id} />
              <Reviewer />
            </div>

        );
    }
}
