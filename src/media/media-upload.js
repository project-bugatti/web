import React, { Component } from 'react';
import {getMediaEndpoint, sendHttp} from "../utils/helper-functions";
import { FaCloudUploadAlt } from 'react-icons/fa';

class MediaUpload extends Component {

  constructor() {
    super();

    this.state = {
      fileName: null
    }
  }

  handleChange = (e) => {
    const path = String.raw`${e.target.value}`; // C:\fakepath\beach.jpeg
    const splitPath = path.split("\\"); // splits the path at the backslash character
    // produces: ["C:", "fakepath", "beach.jpeg"]
    const fileName = splitPath[2];  // "beach.jpeg"
    this.setState({
      fileName: fileName
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.fileName == null || this.state.fileName.length <= 3) {
      return;
    }

    var fileExtension = this.state.fileName.split(".")[1]; // jpeg

    switch (fileExtension) {
      case "jpeg":
        break;
      case "png":
        break;
      case "gif":
        break;
      case "jpg":
        fileExtension = "jpeg";
        break;
      default:
        console.log(`Unsupported file extension: ${fileExtension}`);
    }

    const presignedUrlEndpoint = getMediaEndpoint() + 'presigned';
    const params = {
      fileExtension
    };

    sendHttp('GET', presignedUrlEndpoint, params, null,false, false, (response) => {
      const presignedUrl = response.media.presignedUrl;

    }, (error) => {
      console.log(error);
    })
  };

  render() {
    return (
      <div className="p-2 m-2 border border-purple rounded">

        <p>File: {this.state.fileName}</p>

        <form>
          <label htmlFor="media">Choose an image or video to upload:</label>

          <input type="file"
                 id="media"
                 name="media"
                 accept="image/png, image/jpeg"
                 onChange={this.handleChange}
          />
          <button
            type="submit"
            onClick={this.handleSubmit}
            className="p-2 rounded border border-purple"
          >
            <FaCloudUploadAlt/> Upload
          </button>
        </form>
      </div>
    )
  }
}

export default MediaUpload;