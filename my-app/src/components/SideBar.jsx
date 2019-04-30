import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import Home from "./Home";
import Setting from "./Setting";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

const url =
  "https://s3.amazonaws.com/images.clearviewsocial/CVSLogo.FullColor.RGB+(2).png";

function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach(b => (binary += String.fromCharCode(b)));

  return window.btoa(binary);
}
var headers = new Headers({ "X-Mashape-Key": "API_KEY" });
var options = {
  method: "GET",
  headers: headers,
  mode: "cors",
  cache: "default"
};
var request = new Request(url);

class MySideNav extends React.Component {
  state = {
    emailLogoPreview: "",
    emailLogo: "",
    emailFile: "",
    webLogoPreview: "",
    webLogo: "",
    webFile: ""
  };

  componentDidMount = () => {
    //retrieve data from localStorage first.
    const emailLogo = localStorage.getItem("emailLogo");
    const webLogo = localStorage.getItem("webLogo");

    fetch(request, options).then(response => {
      response.arrayBuffer().then(buffer => {
        var base64Flag = "data:image/jpeg;base64,";
        var imageStr = arrayBufferToBase64(buffer);
        if (emailLogo !== null) {
          this.setState({ emailLogo: emailLogo });
        } else {
          this.setState({
            emailLogo: base64Flag + imageStr
          });
        }
        if (webLogo !== null) {
          this.setState({ webLogo: webLogo });
        } else {
          this.setState({
            webLogo: base64Flag + imageStr
          });
        }
      });
    });
  };

  handleEmailSubmit = e => {
    e.preventDefault();
    if (this.state.emailFile.size / 1000000 > 1) {
      this.setState({ emailLogoPreview: "" });
      alert("Image size should smaller than 1 Mb");
    } else if (this.state.emailFile !== "") {
      const newEmailLogo = this.state.emailLogoPreview;
      // store data to local storage
      window.onbeforeunload = function() {
        localStorage.setItem("emailLogo", newEmailLogo);
      };
      this.setState({ emailLogo: newEmailLogo });
      alert("Logo uploaded successfully!");
    } else if (this.state.emailFile === "") {
      alert("Please upload image!");
    }
  };

  handleWebSubmit = e => {
    e.preventDefault();
    if (this.state.webFile.size / 1000000 > 1) {
      this.setState({ webLogoPreview: "" });
      alert("Image size should smaller than 1 Mb");
    } else if (this.state.webFile !== "") {
      const newWebLogo = this.state.webLogoPreview;
      // store data to local storage
      window.onbeforeunload = function() {
        localStorage.setItem("webLogo", newWebLogo);
      };
      this.setState({ webLogo: newWebLogo });
      alert("Logo uploaded successfully!");
    } else if (this.state.webFile === "") {
      alert("Please upload image!");
    }
  };

  handleEmailChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        emailLogoPreview: reader.result,
        emailFile: file
      });
    };
    reader.readAsDataURL(file);
  };

  handleWebChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        webLogoPreview: reader.result,
        webFile: file
      });
    };
    reader.readAsDataURL(file);
  };

  render() {
    return (
      <Router>
        <Route
          render={({ location, history }) => (
            <React.Fragment>
              <SideNav
                onSelect={selected => {
                  const to = "/" + selected;
                  if (location.pathname !== to) {
                    history.push(to);
                  }
                }}
              >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                  <NavItem eventKey="home">
                    <NavIcon>
                      <i
                        className="fa fa-fw fa-home"
                        style={{ fontSize: "1.75em" }}
                      />
                    </NavIcon>
                    <NavText>Home</NavText>
                  </NavItem>
                  <NavItem eventKey="settings">
                    <NavIcon>
                      <i
                        className="fa fa-fw fa-device"
                        style={{ fontSize: "1.75em" }}
                      />
                    </NavIcon>
                    <NavText>Setting</NavText>
                  </NavItem>
                </SideNav.Nav>
              </SideNav>
              <main>
                <Route
                  path="/"
                  exact
                  component={props => (
                    <Home
                      emailLogo={this.state.emailLogo}
                      webLogo={this.state.webLogo}
                    />
                  )}
                />
                <Route
                  path="/home"
                  component={props => (
                    <Home
                      emailLogo={this.state.emailLogo}
                      webLogo={this.state.webLogo}
                    />
                  )}
                />
                <Route
                  path="/settings"
                  component={props => (
                    <Setting
                      emailLogoPreview={this.state.emailLogoPreview}
                      handleEmailSubmit={this.handleEmailSubmit}
                      handleEmailChange={this.handleEmailChange}
                      webLogoPreview={this.state.webLogoPreview}
                      handleWebSubmit={this.handleWebSubmit}
                      handleWebChange={this.handleWebChange}
                    />
                  )}
                />
              </main>
            </React.Fragment>
          )}
        />
      </Router>
    );
  }
}
export default MySideNav;
