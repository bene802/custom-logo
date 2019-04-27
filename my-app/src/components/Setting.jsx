import React, { Component } from "react";
import ImageUpload from "./ImageUpload";

class Setting extends Component {
  render() {
    return (
      <div>
        Setting
        <div>
          <ImageUpload
            file={this.props.file}
            logoPreview={this.props.logoPreview}
            handleSubmit={this.props.handleSubmit}
            handleImageChange={this.props.handleImageChange}
          />
        </div>
      </div>
    );
  }
}

export default Setting;
