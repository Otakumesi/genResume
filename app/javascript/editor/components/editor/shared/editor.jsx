import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    edit_document,
    fetch_document,
    post_document,
    identify_document,
} from '../../../actions/index';
import { push } from 'react-router-redux';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onBlurContent = this.onBlurContent.bind(this);
    }

    componentWillMount() {
        if(!this.props.isNewDoc) {
            this.props.identify({
                    id: Number(this.props.id),
                    user_id: Number(this.props.user_id),
                    isNewDoc: this.props.isNewDoc
            });
            this.props.fetch({id: this.props.id, user_id: this.props.user_id});
        } else {
            this.props.identify({user_id: Number(this.props.user_id), isNewDoc: this.props.isNewDoc});
        }
    }

    onChangeContent(e) {
        this.props.edit({content: this.refs.editor.value});
    }

    onBlurContent(e) {
        this.props.post({isNewDoc: this.props.isNewDoc, document: this.props.document});
    }

    render() {
        return(
            <textarea value={this.props.content}
                      onChange={this.onChangeContent}
                      onBlur={this.onBlurContent}
                      ref='editor' />
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return ({
        edit: (content) => dispatch(edit_document(content)),
        fetch: (identity) => dispatch(fetch_document(identity)),
        post: (postdata) => dispatch(post_document(postdata)),
        identify: (identity) => dispatch(identify_document(identity)),
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);