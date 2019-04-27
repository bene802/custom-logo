import React from "react";
class ImageUpload extends React.Component {
  render() {
    let imagePreviewUrl = this.props.imagePreviewUrl;
    console.log(imagePreviewUrl);
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
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
