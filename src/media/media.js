import React, { Component } from 'react';
import MediaUpload from "./media-upload";

class Media extends Component {
  render() {
    return (
      <div className="flex justify-center">
        <MediaUpload/>
      </div>
    )
  }
}

export default Media;