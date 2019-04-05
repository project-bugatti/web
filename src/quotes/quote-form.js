import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux'
import {getMembersEndpoint, getQuotesEndpoint, sendHttp} from '../utils/helper-functions';
import {LOAD_MEMBERS} from '../redux-helpers/actions';
import {sortMembers} from '../members/sort-members';
import {MEMBERS_SORT_TYPES} from '../members/members-sort-types';
import {FaChevronRight, FaUndo, FaCloudUploadAlt, FaCheckCircle} from 'react-icons/fa';
import Loading from '../utils/loading';


class QuoteForm extends Component {

  constructor() {
    super();
    this.state = { didSubmit: false};
  }

  componentDidMount() {
    if (this.props.members !== null) {
      return;
    }

    sendHttp('GET', getMembersEndpoint(), null, true, (response) => {
      const members = sortMembers(response.members, MEMBERS_SORT_TYPES.LASTNAME);
      this.saveMembers(members);
    })
  }

  saveMembers = (members) => {
    this.props.dispatch({
      type: LOAD_MEMBERS,
      members
    });
  };

  submitQuote = (formData, callback) => {
    const quote = {
      author_member_id: formData.member_id,
      quote_text: formData.quote_text
    };
    console.log(quote);

    sendHttp('POST', getQuotesEndpoint(), quote, true,
      () => {
        this.setState({ didSubmit: true });
        callback();
      }, (error) => {
        console.log(error);
        callback();
      });
  };

  render() {

    const containerStyles = 'flex flex-grow justify-center w-full sm:max-w-sm p-4 m-4 shadow rounded-lg shadow';

    if (this.props.members == null) {
      return <Loading/>
    }

    if (this.state.didSubmit) {
      return (
        <div className={containerStyles}>
          <div className="flex flex-col items-center">
            <p className="text-teal text-5xl">
              <FaCheckCircle/>
            </p>
            <p className="text-xl text-grey-darkest">Quote created successfully</p>
          </div>
        </div>
      )
    }

    return(
      <div className={containerStyles}>

        <Formik
          initialValues={{ member_id: '', quote_text: '' }}
          validate={values => {
            let errors = {};
            if (!values.member_id) {
              errors.member_id = 'REQUIRED';
            }
            if (!values.quote_text) {
              errors.quote_text = 'REQUIRED';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            this.submitQuote(values, () => {
              setSubmitting(false);
            });
          }}
        >
          {props => {
            const { touched, errors, isSubmitting, handleSubmit, handleReset } = props;
            const errorStyles = 'text-orange-dark block tracking-wide text-xs font-bold m-1';
            const optionStyles = 'text-grey-darkest';
            return (
              <form onSubmit={handleSubmit} className="w-full">

                {/* Member selection section */}
                <div className="mb-8">

                  {/* Label */}
                  <label htmlFor="member_id" className="block mb-2 text-center font-bold text-grey-darkest">
                    Who said it?
                  </label>

                  <div className="inline-block relative w-full">
                    <Field
                      component="select"
                      name="member_id"
                      className="w-full px-4 py-2 pr-8 appearance-none bg-white border border-grey-light hover:border-grey rounded shadow outline-none"
                    >
                      <option value="" className={optionStyles}>Choose a member</option>
                      {
                        this.props.members.map( (member) =>
                          <option
                            value={member.member_id}
                            key={member.member_id}
                            className={optionStyles}
                          >
                            {member.firstname} {member.lastname}
                          </option>
                        )
                      }
                    </Field>

                    {/* Chevron / dropdown icon */}
                    <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                      <FaChevronRight/>
                    </div>
                  </div>

                  {/* Error for member */}
                  <p className={errorStyles}>
                    {errors.member_id && touched.member_id &&
                    errors.member_id
                    }
                  </p>
                </div>

                {/* Quote input section */}
                <div className="mb-8">

                  {/* Label */}
                  <label htmlFor="quote_text" className="block m-2 text-center font-bold text-grey-darkest">
                    What's the quote?
                  </label>

                  <Field
                    component="textarea"
                    name="quote_text"
                    className="w-full p-2 appearance-none bg-white border border-grey-light hover:border-grey rounded shadow outline-none"
                  />

                  {/* Error for quote text */}
                  <p className={errorStyles}>
                    {errors.quote_text && touched.quote_text &&
                    errors.quote_text
                    }
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-center">

                  {/* Reset button */}
                  <button type="reset" onClick={handleReset} className="flex py-2 px-4 mr-1 rounded border border-grey-light bg-white hover:bg-blue-lightest text-grey-darkest">
                    <span className="self-center mr-1"><FaUndo/></span>
                    <span>Reset</span>
                  </button>

                  {/* Submission button */}
                  <button type="submit" className="flex py-2 px-4 ml-1 rounded border border-teal-light bg-white hover:bg-blue-lightest text-grey-darkest" disabled={isSubmitting}>
                    <span className="self-center mr-1"><FaCloudUploadAlt/></span>
                    <span>Create Quote</span>
                  </button>
                </div>

              </form>
            );
          }}
        </Formik>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  members: state.members
});

export default connect(mapStateToProps) (QuoteForm);