import React from 'react'

class Message extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: props.message,
      toggleClass: props.toggleClass,
      isExpanded: false
    }
  }

  isRead = () => this.state.message.read ? 'read' : 'unread'
  isSelected = () => this.state.message.selected ? 'selected' : ''
  isChecked = () => this.state.message.selected ? 'checked' : ''
  isStarred = () => this.state.message.starred ? 'star fa fa-star' : 'star fa fa-star-o'

  async toggleMsgBody(id) {
    let msgBodyDiv = null
    if (!this.state.isExpanded) {
      const responseMsgBody = await fetch(`/api/messages/${id}`)
      if (responseMsgBody.status === 200) {
        const jsonMsgBody = await responseMsgBody.json()
        msgBodyDiv = this.constructBodyDiv(jsonMsgBody.body)
      }
    }
    this.state.isExpanded = !this.state.isExpanded
    this.props.expandMsg(this.state.message, msgBodyDiv)
  }

  constructBodyDiv(body) {
    return <div className="row message-body">
                  <div className="col-xs-11 col-xs-offset-1">
                    { body }
                  </div>
                </div>
  }

  render() {
    let isExpanded = this.props.expandedMsgId === this.state.message.id
    let msgBodyDiv = isExpanded ? this.props.msgBodyDiv : null
    // eslint-disable-next-line
    this.state.isExpanded = isExpanded && msgBodyDiv != null

    return (
      <div>
        <div className={`row message ${this.isRead()} ${this.isSelected()}`}>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
              <input type="checkbox" checked={this.isChecked()}
                onChange = {(e) => {
                e.stopPropagation()
                console.log("onChange.checkbox")
                this.props.toggleClass(this.state.message, "selected")
              }} />
              </div>
              <div className={`col-xs-2 ${this.isStarred()}`}
                onClick = {(e) => {
                e.stopPropagation()
                console.log("onClick.star")
                this.props.toggleClass(this.state.message, "starred")
                }}>
                <i></i>
              </div>
            </div>
          </div>
          <div className="col-xs-11">
            {this.state.message.labels.map((label) =>
              <span key={this.state.message.labels.indexOf(label)}
                className="label label-warning">{label}
              </span>)}

            <a onClick = {(e) => {
              e.preventDefault()
              this.toggleMsgBody(this.state.message.id)
              }} >
              { this.state.message.subject }
            </a>

          </div>
        </div>
        { msgBodyDiv }
      </div>
    )
  }
}

export default Message
