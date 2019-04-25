import React, { Component } from 'react';
import {getMediaEndpoint, sendHttp} from "../utils/helper-functions";
import {FaCloudUploadAlt, FaFileUpload, FaUndo} from 'react-icons/fa';
import axios from 'axios';
import appConfig from "../app-config";
import {Field, Formik, Form} from "formik";
import Alert from "../utils/alert";

const TYPE_JPEG = "image/jpeg";
const TYPE_PNG = "image/png";
const TYPE_GIF = "image/gif";

class MediaUpload extends Component {

  state = {
    // During submission process, where file gets uploaded to S3 and a record is saved in the database, if an error
    // occurs or the process succeeds, update the status message so an alert displays
    statusMessage: 'Upload Successful',

    // On a successful upload, save the media ID to state so it can be passed to an alert component
    uploadedMediaId: null
  };

  // Returns a string containing an error message or null if file is valid
  validateFile = file => {
    // Check file size
    if (file.size > appConfig.maxFileSize) {
      return "File is too large";
    }

    // Check file type
    const allowedTypes = new Set([TYPE_JPEG, TYPE_PNG, TYPE_GIF]);
    if (!allowedTypes.has(file.type)) {
      return 'Unsupported file';
    }

    return null;
  };
  /*
    TODO: Add comment
   */
  handleSubmit = async (values, callback) => {
    var fileExtension = values.file.name.split(".")[1]; // beach_7-4-2015.jpeg => jpeg

    const presignedUrlEndpoint = getMediaEndpoint() + appConfig.api.presigned;
    const params = { fileExtension };
    const headers = { "Content-Type": values.file.type };

    try {
      // requests a media object consisting of a presigned url and media_id
      const mediaResponse = await axios.get(presignedUrlEndpoint,{headers, params});
      // extract media object from HTTP payload
      let media = mediaResponse.data.media;

      await this.pushToS3(media.presignedUrl, values.file);

      // add database props to media object
      media.file_type = fileExtension;
      await this.saveMedia(media);
      callback();
    } catch (error) {
      console.error(error);
      this.state.statusMessage = error;
      callback();
    }
  };

  // Given a presigned url and file, uploads the file saved in state to S3
  pushToS3 = (presignedUrl, file) => {
    console.log(file);
    return new Promise(async (resolve, reject) => {
      const headers = {"Content-Type": file.type};
      try {
        resolve(await axios.put(presignedUrl, file, {headers}));
      } catch (e) {
        reject(e);
      }
    });
  };

  // Given a media object, saves a media record in the database
  saveMedia = (media) => {
    return new Promise( async (resolve, reject) => {
      sendHttp('POST', getMediaEndpoint(), media, false, true,
          response => {resolve(response);console.log(response)},
          error => reject(error));
    })
  };

  render() {
    return (
      <div className="max-w-xs w-full p-4 m-2 shadow rounded-lg border border-grey-light bg-white text-grey-darkest">

        <p className="p-2 text-2xl">Media Upload</p>

        <Formik
          initialValues={{ file: null, title: '', description: '' }}
          validate={values => {
            let errors = {};
            if (!values.file) {
              errors.file = 'REQUIRED';
            } else {
              const fileError = this.validateFile(values.file);
              if (fileError) {
                errors.file = fileError;
                // Set the file to null to render default file upload state / Don't display a file with an error
                values.file = null;
              }
            }
            return errors;
          }}
          onSubmit={(values, actions) => {
            this.handleSubmit(values, () => {
              actions.setSubmitting(false);
            })
          }}
          render = {props => {
            const errorStyles = "ml-3 text-orange-dark block tracking-wide text-xs font-bold";
            return (
              <Form className="flex flex-col p-2 overflow-hidden">

                {/* File field */}
                <div className="flex flex-row items-center">
                  {
                    !props.values.file ? (
                      <React.Fragment>
                        <label
                          className="rounded-full h-16 w-16 flex items-center justify-center bg-teal text-white text-3xl border border-teal-dark cursor-pointer"
                          htmlFor="media"
                        >
                          <FaFileUpload/>
                        </label>
                        <label htmlFor="media" className="ml-4 text-sm text-grey-dark uppercase tracking-wide font-bold cursor-pointer">Browse</label>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <label htmlFor="media">
                          <img
                            src={URL.createObjectURL(props.values.file)}
                            alt={props.values.file.name}
                            className="rounded-full h-16 w-16 flex items-center justify-center border border-teal-dark cursor-pointer"
                          />
                        </label>
                        <p className="ml-4 text-sm text-grey-dark uppercase tracking-wide font-bold">{props.values.file.name}</p>
                      </React.Fragment>
                    )
                  }

                  {props.errors.file && <p className={errorStyles}>{props.errors.file}</p>}

                  {/* Hide the default HTML file upload button */}
                  <input type="file"
                         id="media"
                         name="media"
                         accept={[TYPE_JPEG, TYPE_PNG, TYPE_GIF]}
                         hidden={true}
                         onChange={(event) => props.setFieldValue('file', event.currentTarget.files[0])}
                  />
                </div>

                {/* Title field */}
                <div className="flex flex-row items-center mt-8 mb-1">
                  <label htmlFor="title" className="text-sm text-grey-dark uppercase tracking-wide font-bold">
                    Title
                  </label>
                  {props.errors.title && props.touched.title &&
                  <p className={errorStyles}>
                    {props.errors.title}
                  </p>
                  }

                </div>
                <Field
                  component="input"
                  name="title"
                  className="w-full p-2 appearance-none bg-white border border-grey-light hover:border-grey rounded shadow outline-none"
                  placeholder="Add a title..."
                />

                {/* Description field */}
                <div className="flex flex-row items-center mt-8 mb-1">
                  <label htmlFor="description" className="text-sm text-grey-dark uppercase tracking-wide font-bold">
                    Description
                  </label>

                </div>
                <Field
                  component="input"
                  name="description"
                  className="w-full p-2 appearance-none bg-white border border-grey-light hover:border-grey rounded shadow outline-none"
                  placeholder="Add some more info..."
                />



                {/* Buttons */ }
                <div className="flex justify-center mt-8">
                  {/* Reset button */}
                  <button type="reset"
                          className="flex py-2 px-4 mr-1 rounded border border-orange-dark bg-white hover:bg-blue-lightest text-grey-darkest">
                    <span className="self-center mr-1"><FaUndo/></span>
                    <span>Reset</span>
                  </button>

                  {/* Submission button */}
                  <button type="submit"
                          disabled={props.isSubmitting}
                          className="flex py-2 px-4 mr-1 rounded border border-teal-dark bg-white hover:bg-blue-lightest text-grey-darkest">
                    <span className="self-center mr-1"><FaCloudUploadAlt/></span> Submit
                  </button>
                </div>
              </Form>
            )
          }}
        />

        {
          this.state.statusMessage && <Alert alertTitle={this.state.statusMessage} alertSubtext="Click to dismiss" alertLevel={0}/>
        }

      </div>
    )
  }
}

export default MediaUpload;