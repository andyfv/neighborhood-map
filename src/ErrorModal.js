import React, { Component } from 'react'

class ErrorModal extends Component {

    componentDidMount() {
        document.getElementById('modal-box').focus();
    }

    render() {
        return (
            <div id = "modal">
                <div id = "modal-box"
                    role = "dialog"
                    aria-labelledby = "error-message"
                    aria-modal = "true"
                    tabIndex = "1">
                    <button id = "close-modal"
                        tabIndex = "0"
                        onClick = {this.props.closeModal}></button>
                    <div id = "modal-message-box" tabIndex="5">
                        <p id = "error-message">{this.props.message.message}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ErrorModal