import React from 'react'
import Message from './Message'

class Messages extends React.Component {
  constructor(props) {
    super(props)
    console.log('MESSAGES props--->', this.props)
    this.state = {
      messages: props.messages,
      toggleClass: props.toggleClass
    }
  }
  render() {
      console.log('MESSAGES state--->', this.state)
      return (
        <div className="row">
          { this.state.messages.map(message => <Message key={ message.id } message={ message } toggleClass={ this.state.toggleClass }/>)}
        </div>
      )
    }
  }


  export default Messages
