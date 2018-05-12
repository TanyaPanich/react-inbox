import React from 'react'

class Toolbar extends React.Component {
  constructor(props) {
    super(props)
    console.log('TOOLBAR props:', this.props)
    this.state = {
      messages: this.props.messages,
      countMsgProps: this.props.countMsgProps,
      bulkSelectUnselect: this.props.bulkSelectUnselect,
      markReadUnread: this.props.markReadUnread,
      updateMsgLabels: this.props.updateMsgLabels,
      deleteMsg: this.props.deleteMsg
    }
  }


  checkSelected = (messages) => {
    if(this.state.countMsgProps('selected') === 0) {
      return 'fa fa-square-o'
    } else if (this.state.countMsgProps('selected') < messages.length) {
      return 'fa fa-minus-square-o'
    } else {
      return 'fa fa-check-square-o'
    }
  }

  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">
              {this.state.messages.length - this.state.countMsgProps("read")}
            </span>
            unread messages
          </p>

          <button className="btn btn-default"
                  onClick={() => {
                    this.state.bulkSelectUnselect()}}>
            <i className={this.checkSelected(this.state.messages)}></i>
          </button>

          <button className="btn btn-default"
                  onClick={() => {
                    this.state.markReadUnread(true)}}>
            Mark As Read
          </button>

          <button className="btn btn-default"
                  onClick={() => {
                    this.state.markReadUnread(false)}}>
            Mark As Unread
          </button>

          <select className="form-control label-select"
                  onChange={(e) => {
                    this.state.updateMsgLabels(e.target.value, true)
                  }}>
            <option value={false}>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select"
                  onChange={(e) => {
                    this.state.updateMsgLabels(e.target.value, false)
                  }}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default"
                  onClick={() => {
                    this.state.deleteMsg()
                  }}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}
export default Toolbar
