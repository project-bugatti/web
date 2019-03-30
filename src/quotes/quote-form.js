import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import connect from 'react-redux/es/connect/connect';
import Loading from '../utils/loading';
import {getMembersEndpoint, sendHttp} from '../utils/helper-functions';
import {LOAD_MEMBERS} from '../redux-helpers/actions';
import {sortMembers} from "../members/sort-members";
import {MEMBERS_SORT_TYPES} from "../members/members-sort-types";

class QuoteForm extends Component {

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

  render() {

    if (this.props.members == null) {
      return <Loading/>
    }

    return(
      <div className="flex flex-grow max-w-xs md:max-w-md border border-purple rounded-lg">

        <Formik
          initialValues={{ member_id: null, quote_text: '' }}
          validate={values => {
            let errors = {};
            if (!values.member) {
              errors.member = 'Required';
            }
            if (!values.quote_text) {
              errors.quote_text = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <form onSubmit={handleSubmit}>

                <label htmlFor="member" className="flex">
                  Who said it?
                </label>
                <Field component="select" name="member">
                  <option>Choose a member</option>
                  {
                    this.props.members.map( (member) =>
                      <option value={member.member_id} key={member.member_id}>{member.firstname} {member.lastname}</option>
                    )
                  }
                </Field>

                {errors.member && touched.quote_text && errors.quote_text}
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>

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