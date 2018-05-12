import React from 'react'

const Message = ({message, toggleClass}) => {

  const isRead = message.read ? 'read' : 'unread'
  const isSelected = message.selected ? 'selected' : ''
  const isChecked = message.selected ? 'checked' : ''
  const isStarred = message.starred ? 'star fa fa-star' : 'star fa fa-star-o'

  return (
    <div className={`row message ${isRead} ${isSelected}`}
      onClick = {() => {toggleClass(message, "read")}
    }>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
          <input type="checkbox" checked={isChecked}
            onChange = {(e) => {
            e.stopPropagation()
            toggleClass(message, "selected")
          }} />
          </div>
          <div className={`col-xs-2 ${isStarred}`}
            onClick = {(e) => {
            e.stopPropagation()
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



// import React from 'react'
//
// class Message extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       message: props.message,
//       toggleClass: props.toggleClass
//     }
//   }
//
//   isRead = () => this.state.message.read ? 'read' : 'unread'
//   isSelected = () => this.state.message.selected ? 'selected' : ''
//   isChecked = () => this.state.message.selected ? 'checked' : ""
//   isStarred = () => this.state.message.starred ? 'star fa fa-star' : 'star fa fa-star-o'
//
//   render() {
//     // console.log('MESSAGE props--->', this.props)
//     // console.log('MESSAGE state--->', this.state)
//
//     return (
//     <div className={`row message ${this.isRead} ${this.isSelected}`}
//       onClick={()=>{this.state.toggleClass(this.state.message, 'read')}
//     }>
//       <div className='col-xs-1'>
//         <div className='row'>
//           <div className='col-xs-2'>
//             <input type='checkbox' checked={this.isChecked} onChange={(e)=> {
//               e.stopPropagation()
//               console.log('checkox changed')
//               this.state.toggleClass(this.state.message, 'selected')
//             }}/>
//           </div>
//           <div className={`col-xs-2 ${this.isStarred}`}  onClick={(e) => {
//             console.log('star clicked')
//             e.stopPropagation()
//             this.state.toggleClass(this.state.message, 'starred')
//             }}>
//               <i></i>
//           </div>
//         </div>
//       </div>
//       <div className='col-xs-11'>
//         {this.state.message.labels.map((label) =>
//           <span key={this.state.message.labels.indexOf(label)}
//             className='label label-warning'>{label}</span>)}
//         <a>
//           {this.state.message.subject}
//         </a>
//       </div>
//     </div>
//   )
// }
// }
//
// export default Message
