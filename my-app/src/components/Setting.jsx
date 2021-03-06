import React from "react";
class Setting extends React.Component {
  render() {
    let emailLogoPreview = this.props.emailLogoPreview;
    let $emailImagePreview = null;
    if (emailLogoPreview) {
      $emailImagePreview = (
        <img src={emailLogoPreview} height="250" width="250" alt="Email Logo" />
      );
    } else {
      $emailImagePreview = (
        <div className="previewText">
          Please select an Email Logo for Preview
        </div>
      );
    }
    let webLogoPreview = this.props.webLogoPreview;
    let $webImagePreview = null;
    if (webLogoPreview) {
      $webImagePreview = (
        <img
          src={webLogoPreview}
          height="250"
          width="250"
          style={{ backgroundColor: "#808080" }}
          alt="Web Logo"
        />
      );
    } else {
      $webImagePreview = (
        <div className="previewText">Please select an Web Logo for Preview</div>
      );
    }

    return (
      <div className="container">
        <div className="top50 Div1">
          <p>Welcome & Queue Emails</p>
          <form onSubmit={e => this.props.handleEmailSubmit(e)}>
            <input
              className="fileInput"
              type="file"
              onChange={e => this.props.handleEmailChange(e)}
            />
            <button
              className="submitButton"
              type="submit"
              onClick={e => this.props.handleEmailSubmit(e)}
            >
              Upload Image
            </button>
          </form>
          <div className="imgPreview">{$emailImagePreview}</div>
        </div>
        <div className="top50 Div2">
          <p>Web User Interface</p>
          <form onSubmit={e => this.props.handleWebSubmit(e)}>
            <input
              className="fileInput"
              type="file"
              onChange={e => this.props.handleWebChange(e)}
            />
            <button
              className="submitButton"
              type="submit"
              onClick={e => this.props.handleWebSubmit(e)}
            >
              Upload Image
            </button>
          </form>
          <div className="imgPreview">{$webImagePreview}</div>
        </div>
      </div>
    );
  }
}

export default Setting;
