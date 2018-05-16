import React from 'react'

const Message = ({message, toggleClass}) => {
  //console.log("Message", message)

  const isRead = message.read ? 'read' : 'unread'
  const isSelected = message.selected ? 'selected' : ''
  const isChecked = message.selected ? 'checked' : ''
  const isStarred = message.starred ? 'star fa fa-star' : 'star fa fa-star-o'

  return (
    <div className={`row message ${isRead} ${isSelected}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
          <input type="checkbox" checked={isChecked}
            onChange = {(e) => {
            e.stopPropagation()
            console.log("onChange.checkbox")
            toggleClass(message, "selected")
          }} />
          </div>
          <div className={`col-xs-2 ${isStarred}`}
            onClick = {(e) => {
            e.stopPropagation()
            console.log("onClick.star")
            toggleClass(message, "starred")
            }}>
            <i></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {message.labels.map((label) =>
          <span key={message.labels.indexOf(label)}
            className="label label-warning">{label}
          </span>)}
        <a>
          {message.subject}
        </a>
      </div>
    </div>
  )
}

export default Message
