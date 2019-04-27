import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <h2>Email Logo: </h2>
          <img
            src={this.props.emailLogo}
            height="250"
            width="250"
            alt="Email Logo"
          />
        </div>
        <div className="row top30">
          <h2>Web Logo: </h2>
          <img
            src={this.props.webLogo}
            height="250"
            width="250"
            alt="Web Logo"
            style={{ backgroundColor: "#808080" }}
          />
        </div>
      </div>
    );
  }
}

export default Home;
