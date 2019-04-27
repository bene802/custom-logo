import React, { Component } from "react";
import ImageUpload from "./ImageUpload";

class Setting extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div>
              <ImageUpload
                file={this.props.file}
                logoPreview={this.props.logoPreview}
                handleSubmit={this.props.handleSubmit}
                handleImageChange={this.props.handleImageChange}
              />
            </div>
          </div>
          <div className="col">
            <div>
              <ImageUpload
                file={this.props.file}
                logoPreview={this.props.logoPreview}
                handleSubmit={this.props.handleSubmit}
                handleImageChange={this.props.handleImageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Setting;
