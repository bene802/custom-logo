import React from "react";
//import { withRR4, Nav, NavText } from "react-sidenav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import Home from "./Home";
import Setting from "./Setting";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

//const SideNav = withRR4();

class MySideNav extends React.Component {
  state = {
    data: "data from parent"
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
                  component={props => <Home data={this.state.data} />}
                />
                <Route path="/settings" component={props => <Setting />} />
              </main>
            </React.Fragment>
          )}
        />
      </Router>
    );
  }
}
export default MySideNav;
