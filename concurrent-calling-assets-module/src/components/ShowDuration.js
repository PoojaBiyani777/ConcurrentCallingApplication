import React, { Component } from 'react'

export class ShowDuration extends Component {
  render() {
      console.log("Show Duration");
    return (
      <div>
        "In Show Duration : " { this.props.callDuration }
      </div>
    )
  }
}

export default ShowDuration
