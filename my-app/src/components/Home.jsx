import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <img src={this.props.logo} alt="Logo" />
      </div>
    );
  }
}

export default Home;
