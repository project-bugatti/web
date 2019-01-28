import React, { Component } from 'react';
import {FaUpload, FaRegCheckCircle, FaRegTimesCircle} from "react-icons/fa";
import {createNewMember} from "../utils/helper-functions";

class NewMemberForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      nickname: '',
      phone: ''
    };
  }

  handleFormChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key] : value });
  };

  handleSubmit = () => {
    // return if at least one required input is blank
    for (const key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        if (this.state[key].length === 0) {
          return;
        }
      }
    }

    const newMemberRequest = this.state;
    createNewMember(newMemberRequest, (postResponse) => {
      this.props.parentCallback();
    });
  };

  showIcons = (key) => {
    if (this.state[key].length >= 1) {
      return(
        <div className="ml-2 mt-3 text-3xl text-green-dark">
          <FaRegCheckCircle/>
        </div>
      )
    }
    return (
      <div className="ml-2 mt-3 text-3xl text-red">
        <FaRegTimesCircle/>
      </div>
    )
  };

  render() {

    const FORM_INPUT_STYLES = "block appearance-none w-full border " +
      "border-grey-lighter text-grey-darker py-3 px-4 pr-8 shadow-md border rounded leading-tight " +
      "focus:outline-none focus:shadow-outline focus:bg-white focus:border-grey";

    return(
      <div className="flex justify-center m-2">
        <div className="w-full max-w-sm shadow-lg rounded-lg text-grey-darkest bg-teal-lightest">
          <form>

            {/* Firstname */}
            <div className="px-4 mt-4 mb-8">
              <p className="ml-2 mb-2 font-bold">Firstname</p>
              <div className="flex">
                <input
                  className={FORM_INPUT_STYLES}
                  name="firstname"
                  type="text"
                  placeholder="Firstname"
                  onChange={this.handleFormChange}
                />
                {this.showIcons("firstname")}
              </div>
            </div>

            {/* Lastname */}
            <div className="px-4 mb-8">
              <p className="ml-2 mb-2 font-bold">Lastname</p>
              <div className="flex">
                <input
                  className={FORM_INPUT_STYLES}
                  name="lastname"
                  type="text"
                  placeholder="Lastname"
                  onChange={this.handleFormChange}
                />
                {this.showIcons("lastname")}
              </div>
            </div>

            {/* Nickname */}
            <div className="px-4 mb-8">
              <p className="ml-2 mb-2 font-bold">Nickname</p>
              <div className="flex">
                <input
                  className={FORM_INPUT_STYLES}
                  name="nickname"
                  type="text"
                  placeholder="Nickname"
                  onChange={this.handleFormChange}
                />
                {this.showIcons("nickname")}
              </div>
            </div>

            {/* Phone */}
            <div className="px-4 mb-4">
              <p className="ml-2 mb-2 font-bold">Phone</p>
              <div className="flex">
                <input
                  className={FORM_INPUT_STYLES}
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  onChange={this.handleFormChange}
                />
                {this.showIcons("phone")}
              </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="p-3 m-4 bg-white font-bold text-teal-dark shadow-md rounded-lg"
                onClick={this.handleSubmit}
              >
                <FaUpload/> Create member
              </button>
            </div>

          </form>
        </div>
      </div>
    )
  }
};

export default NewMemberForm;