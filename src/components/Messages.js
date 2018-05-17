import React from 'react'
import Message from './Message'
import ComposeForm from './ComposeForm'


class Messages extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: props.messages,
      toggleClass: props.toggleClass,
      composeCliked: props.composeCliked,
      sendMsg: props.sendMsg
    }
  }

  render() {
    let composeMsgForm = ''
    if (this.props.composeCliked) {
      composeMsgForm = <ComposeForm  sendMsg= { this.props.sendMsg }/>
    }
    let allMessages = {}
    if (this.props.messages) {
      allMessages = this.props.messages.map(message =>
        <Message key={ message.id }
                 message={ message }
                 toggleClass={ this.state.toggleClass } />)
    }
    return (
      <div className="Messages">
        { composeMsgForm }
        { allMessages }
      </div>
    )
  }
}

  export default Messages
