import React from 'react'
import Message from './Message'

class Messages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: props.messages,
      toggleClass: props.toggleClass
    }
  }
  render() {
      return (
        <div>
          { this.state.messages.map(message => <Message key={ message.id } message={ message } toggleClass={ this.state.toggleClass }/>)}
        </div>
      )
    }
  }


  export default Messages
