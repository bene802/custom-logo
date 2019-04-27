import React from "react";
class ImageUpload extends React.Component {
  render() {
    let logoPreview = this.props.logoPreview;
    let $imagePreview = null;
    if (logoPreview) {
      $imagePreview = <img src={logoPreview} alt="Logo" />;
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }

    return (
      <div className="previewComponent">
        <form onSubmit={e => this.props.handleSubmit(e)}>
          <input
            className="fileInput"
            type="file"
            onChange={e => this.props.handleImageChange(e)}
          />
          <button
            className="submitButton"
            type="submit"
            onClick={e => this.props.handleSubmit(e)}
          >
            Upload Image
          </button>
        </form>
        <div className="imgPreview">{$imagePreview}</div>
      </div>
    );
  }
}

export default ImageUpload;
