import React, { Component } from  "react" ;
import { connect } from "react-redux";
import { post_document, edit_document } from "../../../actions/index";

class FlashMessage extends Component {
    constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.edit({title: e.target.value});
    }

    onBlur(e) {
        this.props.post({isNewDoc: this.props.isNewDoc, document: this.props.document});
    }

    render() {
        return(
              <div className="ui form column input_value">
                <input value={this.props.document.title}
                       onChange={this.onChange}
                       onBlur={this.onBlur}
                       placeholder="document title" />
              </div>
        );
    }
}

function mapStateToProps(state) {
    return {document: state.document};
}

function mapDispatchToProps(dispatch) {
    return {
        edit: (title) => dispatch(edit_document(title)),
        post: (postdata) => dispatch(post_document(postdata)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage);
