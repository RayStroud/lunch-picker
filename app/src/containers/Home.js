import React, { Component } from 'react';
import './Home.css';

export default class Home extends Component {
  componentDidMount() {
    // nav to groupName lunch until groups feature is finished
    this.props.history.push('/lunch')
  }

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Lunch Picker</h1>
          <p>Vote on where to go for lunch</p>
        </div>
      </div>
    );
  }
}
