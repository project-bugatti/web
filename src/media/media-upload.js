import React, { Component } from 'react';
import {getMediaEndpoint, sendHttp} from "../utils/helper-functions";
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import appConfig from "../app-config";

class MediaUpload extends Component {

  /*
    Returns (early) if file size exceeds configured max size or if file type is not allowed
    Saves the file added from the form to component state
   */
  handleChange = (e) => {
    const file = e.target.files[0];

    if (file.size > appConfig.maxFileSize) {
      console.log("File too large");
      return;
    }

    const TYPE_JPEG = "image/jpeg", TYPE_PNG = "image/png", TYPE_GIF = "image/gif";
    const allowedTypes = new Set([TYPE_JPEG, TYPE_PNG, TYPE_GIF]);
    if (!allowedTypes.has(file.type)) {
      console.log(`Unsupported file extension: ${file.type}`);
      return;
    }

    this.setState({ file });
  };
  /*
    TODO: Add comment
   */
  handleSubmit = async (e) => {
    e.preventDefault();

    var fileExtension = this.state.file.name.split(".")[1]; // jpeg

    const presignedUrlEndpoint = getMediaEndpoint() + 'presigned';
    const params = { fileExtension };
    const headers = { "Content-Type": this.state.file.type };

    try {
      // retrieves a media object consisting of a presigned url and media_id
      const mediaResponse = await axios.get(presignedUrlEndpoint,{headers, params});
      let media = mediaResponse.data.media;

      // add other props to media object
      media.file_type = fileExtension;

      await this.pushToS3(media.presignedUrl);
      await this.saveMedia(media);
    } catch (error) {
      console.error(error);
    }
  };

  /* Given a presigned url, uploads the file saved in state to S3 */
  pushToS3 = (presignedUrl) => {
    return new Promise(async (resolve, reject) => {
      const headers = {"Content-Type": this.state.file.type};
      try {
        resolve(await axios.put(presignedUrl, this.state.file, {headers}));
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  };

  /* Given a preformed media object, saves a media record in the database */
  saveMedia = (media) => {
    return new Promise( async (resolve, reject) => {
      sendHttp('POST', getMediaEndpoint(), media, false, true,(response) => {
        resolve(response);
      }, (error) => {
        console.log(error);
        reject(error);
      });
    })
  };

  getFileType = () => {
    if (this.state.file == null) {
      return null;
    }

    const splitFileName = this.state.file.name.split(".");
    return splitFileName[1];
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