import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <img src={this.props.logo} />
      </div>
    );
  }
}

export default Home;
