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
    data: "data from parent",
    file: "",
    logoPreview: "",
    logo: ""
  };

  componentDidMount = () => {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "blob";
    request.onload = () => {
      var reader = new FileReader();
      reader.readAsDataURL(request.response);
      reader.onload = e => {
        this.setState({ logo: e.target.result });
      };
    };
    request.send();
  };

  handleSubmit = e => {
    e.preventDefault();
    const newLogo = this.state.logoPreview;
    this.setState({ logo: newLogo });
  };

  handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        logoPreview: reader.result
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
                <Route path="/" exact component={props => <Home />} />
                <Route
                  path="/home"
                  component={props => <Home logo={this.state.logo} />}
                />
                <Route
                  path="/settings"
                  component={props => (
                    <Setting
                      file={this.state.file}
                      logoPreview={this.state.logoPreview}
                      handleSubmit={this.handleSubmit}
                      handleImageChange={this.handleImageChange}
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
