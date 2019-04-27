import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import Home from "./Home";
import Setting from "./Setting";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

const url =
  "https://s3.amazonaws.com/images.clearviewsocial/CVSLogo.FullColor.RGB+(2).png";

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
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "blob";
    request.onload = () => {
      var reader = new FileReader();
      reader.readAsDataURL(request.response);
      reader.onload = e => {
        this.setState({ emailLogo: e.target.result, webLogo: e.target.result });
      };
    };
    request.send();
  };

  handleEmailSubmit = e => {
    e.preventDefault();
    if (this.state.emailFile.size / 1000000 > 1) {
      this.setState({ emailLogoPreview: "" });
      alert("Image size should smaller than 1 Mb");
    } else {
      const newEmailLogo = this.state.emailLogoPreview;
      this.setState({ emailLogo: newEmailLogo });
    }
  };

  handleWebSubmit = e => {
    e.preventDefault();
    if (this.state.webFile.size / 1000000 > 1) {
      this.setState({ webLogoPreview: "" });
      alert("Image size should smaller than 1 Mb");
    } else {
      const newWebLogo = this.state.webLogoPreview;
      this.setState({ webLogo: newWebLogo });
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
