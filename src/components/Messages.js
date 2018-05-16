import React from 'react'
import Message from './Message'

class Messages extends React.Component {
  constructor(props) {
    //console.log('Messages props', props)
    super(props)
    this.state = {
      messages: props.messages,
      toggleClass: props.toggleClass
    }
  }
  render() {
    //console.log('Messages state: ' , this.state.messages)
    return (
      <div>
        { this.state.messages.map(message => <Message key={ message.id } message={ message } toggleClass={ this.state.toggleClass }/>)}
      </div>
    )
  }
}

  export default Messages
