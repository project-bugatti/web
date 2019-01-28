import React, { Component } from 'react';
import {getMembersEndpoint, sendHttpGet, submitNewQuote} from '../utils/helper-functions';
import {FaRegCheckCircle, FaRegTimesCircle, FaUpload, FaPencilAlt} from "react-icons/fa/index";

class QuoteForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      members : [],
      quote_text : '',
      target_member_id : ''
    };
  }

  componentDidMount() {
    if (this.props.quote) {
      this.setState({
        quote_text : this.props.quote.quote_text,
        target_member_id : this.props.quote.target_member_id
      });
    }

    sendHttpGet(getMembersEndpoint(),
      (response) => this.setState({members: response }),
      (error) => {} );
  }

  handleFormChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value })
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

    const newQuoteRequest = {
      target_member_id: this.state.target_member_id,
      quote_text: this.state.quote_text
    };

    submitNewQuote(newQuoteRequest, (postResponse) => {
      // use callback to close form
      this.props.parentCallback();
    });

  };

  showIcons = (key) => {
    if (this.state[key].length >= 1) {
      return (
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
      "border-grey-lighter text-grey-darker py-3 px-4 pr-8 bg-grey-lightest shadow-md border rounded leading-tight " +
      "focus:outline-none focus:shadow-outline focus:bg-white focus:border-grey";

    return(
      <div className="flex justify-center m-2">
        <div className="w-full max-w-sm shadow rounded-lg text-grey-darkest bg-teal-lightest">
          <form>

            {/* If a quote prop was passed in, that means the form is used for editing an existing quote
             So, only display the picker for a quote's author when creating a quote, not editing one */}
            {
              !this.props.quote &&
              <div className="px-4 mt-4 mb-8">
                <p className="ml-2 mb-2 font-bold">Who said it?</p>

                <div className="flex">
                  <select
                    name="target_member_id"
                    onChange={this.handleFormChange}
                    className={FORM_INPUT_STYLES}
                    defaultValue={"Choose a member"}
                  >
                    <option disabled>Choose a member</option>
                    {
                      this.state.members.map( member =>
                        <option
                          value={member.member_id}
                          key={member.member_id}
                        >{member.firstname} {member.lastname}</option>
                      )
                    }
                  </select>
                  {this.showIcons("target_member_id")}
                </div>
              </div>
            }

            {/* Quote text */}
            <div className="px-4 mt-4">
              <p className="mb-2 font-bold">What{"'"}s the quote?</p>

              <div className="flex">
            <textarea
              name="quote_text"
              onChange={this.handleFormChange}
              className={FORM_INPUT_STYLES}
              type="text"
              value={this.state.quote_text}
            />

                {this.showIcons("quote_text")}
              </div>
            </div>

            {/* Submit button for a new quote*/}
            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="p-3 m-4 bg-white font-bold text-teal-dark shadow-md rounded-lg"
                onClick={this.handleSubmit}
              >

                {
                  !this.props.quote ? (
                    <div>
                      <FaUpload/> Submit New Quote
                    </div>
                  ) : (
                    <div>
                      <FaUpload/> Edit Quote
                    </div>
                  )
                }
              </button>
            </div>

          </form>
        </div>
      </div>
    )
  }
};



export default QuoteForm;