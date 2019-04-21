import React, { Component } from 'react';
import MediaUpload from "./media-upload";

class Media extends Component {
  render() {
    return (
      <div>
        <h1>Media page</h1>
        <MediaUpload/>
      </div>
    )
  }
}

export default Media;