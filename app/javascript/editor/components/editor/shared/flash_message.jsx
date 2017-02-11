import React, { Component } from  "react" ;

export default class FlashMessage extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.clear();
    }

    render() {
        return(
            <div className={"ui floating message flash_message " + this.props.flash_message.type} onClick={this.onClick}>
              {this.props.flash_message.message}
            </div>
        );
    }
}
