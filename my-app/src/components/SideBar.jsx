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
const url =
  "https://s3.amazonaws.com/images.clearviewsocial/CVSLogo.FullColor.RGB+(2).png";

class MySideNav extends React.Component {
  state = {
    data: "data from parent",
    file: "",
    imagePreviewUrl: "",
    logo: ""
  };

  parentFunc = () => {
    this.setState({ data: "new data" });
    console.log(this.state.data);
  };

  getBase64Image = img => {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    console.log(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
  };

  toDataUrl = (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  };

  convertImgToBase64URL = (url, callback, outputFormat) => {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      var canvas = document.createElement("CANVAS"),
        ctx = canvas.getContext("2d"),
        dataURL;
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      console.log(dataURL);
      this.setState({
        str:
          "iVBORw0KGgoAAAANSUhEUgAAAFgAAABSCAYAAADQDhNSAAAABHNCSVQICAgIfAhkiAAAFN5JREFUeJztnHl0FFW"
      });
      callback(dataURL);
      canvas = null;
    };
    img.src = url;
  };

  getImageInfo = () => {
    this.convertImgToBase64URL(
      "https://s3.amazonaws.com/images.clearviewsocial/CVSLogo.FullColor.RGB+(2).png",
      function(base64Img) {
        //this.setState({ str: base64Img });
        //console.log(base64Img);
      }
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log("handle uploading-", this.state.file);
    const newLogo = this.state.imagePreviewUrl;
    this.setState({ logo: newLogo });
    //console.log("url", this.state.imagePreviewUrl);
  };

  handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
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
                  component={props => (
                    <Home
                      data={this.state.data}
                      str={this.state.str}
                      logo={this.state.logo}
                    />
                  )}
                />
                <Route
                  path="/settings"
                  component={props => (
                    <Setting
                      data={this.state.data}
                      parentFunc={this.parentFunc}
                      getBase64Image={this.getBase64Image}
                      getImageInfo={this.getImageInfo}
                      file={this.state.file}
                      imagePreviewUrl={this.state.imagePreviewUrl}
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
