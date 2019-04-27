import React, { Component } from "react";
import ImageUpload from "./ImageUpload";

class Setting extends Component {
  render() {
    const url =
      "https://s3.amazonaws.com/images.clearviewsocial/CVSLogo.FullColor.RGB+(2).png";
    return (
      <div>
        Setting
        <button onClick={() => this.props.getImageInfo()}>click</button>
        <div>
          <ImageUpload />
        </div>
      </div>
    );
  }
}

export default Setting;
