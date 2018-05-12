import React, { Component } from 'react'
import './App.css'
import Messages from './components/Messages'
import Toolbar from './components/Toolbar'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: this.props.messages
    }
  }

  toggleClass = (msg, nameOfClass) => {
    const index = this.state.messages.indexOf(msg)
    //removed .slice(0) method
    let newMessages = this.state.messages
    console.log('From toggle new: ', newMessages)
    newMessages[index][nameOfClass] = !newMessages[index][nameOfClass]
    this.setState({ messages: newMessages })
  }

  render() {
    return (
       <main>
        <h1>React Inbox</h1>
        <Toolbar messages={ this.state.messages } />
        <Messages messages={ this.state.messages } toggleClass={this.toggleClass} />
      </main>
    )
  }
}
export default App
