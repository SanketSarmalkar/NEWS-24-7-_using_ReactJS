import React, { Component } from 'react'
import loadingImage from './loadingImage.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className="col-xs-1 text-center">
        <img src={loadingImage} alt="loading" />
      </div>
    )
  }
}

export default Spinner
