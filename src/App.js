import React, { Component } from 'react'
import './App.css'
import Messages from './components/Messages'
import Toolbar from './components/Toolbar'


class App extends Component {

  state = { messages: [] }

  async componentDidMount() {
    const messagesResponse = await fetch(`/api/messages`)
    if (messagesResponse.status === 200) {
      const messagesJSON = await messagesResponse.json()
      const messages = messagesJSON._embedded.messages
      this.setState({ messages })
    }
  }

  //making changes to be peristed
  async storeState(ids, cmd, prop, val) {
    let info = {'messageIds':ids, 'command':cmd }
    if (val !== null) {
      info[prop] = val
    }
    console.log("storeState:", info)

    await fetch(`/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
  }

  toggleClass = (message, nameOfClass) => {
    const index = this.state.messages.indexOf(message)
    // eslint-disable-next-line
    this.state.messages[index][nameOfClass] = !this.state.messages[index][nameOfClass]
    this.setState({ messages: this.state.messages })

    if (nameOfClass === 'starred') {
      const id = this.state.messages[index].id
      this.storeState([id], 'star', 'star', this.state.messages[index][nameOfClass])
    }
  }

  countMsgProps = (property) => {
    // eslint-disable-next-line
    let count = 0
    // eslint-disable-next-line
    this.state.messages.forEach(message => {
      if (message[property])
        count++
    })
    //console.log('count of', property, 'is', count)
    return count
  }

  bulkSelectUnselect = () => {
        // eslint-disable-next-line
      if (this.countMsgProps('selected') < this.state.messages.length) {
        // eslint-disable-next-line
        this.state.messages.forEach(message => {
          message.selected = true
        })
        // eslint-disable-next-line
        this.setState({ messages: this.state.messages })
      } else {
        // eslint-disable-next-line
        this.state.messages.forEach(message => {
          message.selected = false
        })
        // eslint-disable-next-line
        this.setState({ messages:this.state.messages })
      }
    }

    markReadUnread = (booleanValue) => {
      // eslint-disable-next-line
      let ids = []
      this.state.messages.forEach((message, idx) => {
        if (message.selected) {
          message.read = booleanValue
          ids.push(message.id)
          //console.log('is read? ', booleanValue)
        }
      })
      // eslint-disable-next-line
      this.setState({ messages:this.state.messages })
      this.storeState(ids, 'read', 'read', booleanValue)
    }

    updateMsgLabels = (label, booleanValue) => {
      // eslint-disable-next-line
      let ids = []
      this.state.messages.forEach(message => {
        if (message.selected) {
          ids.push(message.id)
          if (booleanValue && !message.labels.includes(label)) {
            //message.labels.push(label)
            message.labels.push(label)
            // message.labels = [...message.labels, label]
            //console.log('--Label--', label, 'is added')
          }
          else if (!booleanValue) {
            message.labels = message.labels.filter(l => l !== label)
            //else if (!booleanValue && message.labels.includes(label)) {
            //console.log('--Label--', label, 'is removed')
            //message.labels.splice(message.labels.indexOf(label), 1)
          }
        }
      })
      this.setState({ messages:this.state.messages })
      this.storeState(ids, booleanValue ? 'addLabel' : 'removeLabel', 'label', label)
    }

    deleteMsg = () => {
      // eslint-disable-next-line
      let ids = []
      this.state.messages.forEach((message,idx) => {
        if (message.selected) {
          this.state.messages.splice(this.state.messages.indexOf(message), 1)
          ids.push(message.id)
        }
      })
      this.setState({ messages:this.state.messages })
      this.storeState(ids, 'delete')
    }


  render() {
    if (this.state.messages.length === 0) {
      return <div>Loading...</div>
    } else {
      //console.log('app state', this.state.messages )
      return (
         <div className='App container'>
          <h1>React Inbox</h1>
          <Toolbar
            messages={ this.state.messages }
            countMsgProps={ this.countMsgProps }
            bulkSelectUnselect={ this.bulkSelectUnselect }
            markReadUnread={ this.markReadUnread }
            updateMsgLabels={ this.updateMsgLabels }
            deleteMsg={ this.deleteMsg } />
          <Messages
            messages={ this.state.messages }
            toggleClass={ this.toggleClass } />
        </div>
      )
    }
  }
}
export default App
