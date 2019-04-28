import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="top50 Div1">
          <p>Welcome & Queue Emails</p>
          <div className="imgShow">
            <img src={this.props.emailLogo} alt="Email Logo" />
          </div>
        </div>
        <div className="top50 Div2">
          <p>Web User Interface</p>
          <div className="imgShow">
            <img
              src={this.props.webLogo}
              alt="Web Logo"
              style={{ backgroundColor: "#808080" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
