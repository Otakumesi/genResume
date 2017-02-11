import React, { Component } from 'react';
import { connect } from 'react-redux';
import showdown from 'showdown';

const mdConverterOptions = {
    ghCodeBlocks: true,
    tables: true,
    tasklists: true,
};
const MdConverter = new showdown.Converter(mdConverterOptions);

function rawMarkup(text) {
    let sanitizedText = htmlEncode(text);
    return { __html: MdConverter.makeHtml(sanitizedText) };
}

function htmlEncode(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

class Reviewer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="column">
              <div
                className="document_reviewer keiyaku ui segment"
                dangerouslySetInnerHTML={rawMarkup(this.props.content)} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state.document;
}

export default connect(mapStateToProps)(Reviewer);
