import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from  './components/News';

export default class App extends Component {
  constructor(){
    super();
    this.state={
      pageSize: 12,
      country:"in",
      catogories:"",
    };
  }

  render() {
    return (
      <div>
        <NavBar country={this.state.country}/>
        <News pageSize={12} country={this.state.country}/>
      </div>
    )
  }
}