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
          <ImageUpload
            data={this.props.data}
            parentFunc={this.props.parentFunc}
            getBase64Image={this.props.getBase64Image}
            getImageInfo={this.props.getImageInfo}
            file={this.props.file}
            imagePreviewUrl={this.props.imagePreviewUrl}
            handleSubmit={this.props.handleSubmit}
            handleImageChange={this.props.handleImageChange}
          />
        </div>
      </div>
    );
  }
}

export default Setting;
