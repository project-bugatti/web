import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

class SingleQuote extends Component {
  memberName = (this.props.quote.nickname) ? this.props.quote.nickname : this.props.quote.firstname;
  quoteProfileLink = '/quotes/' + this.props.quote.quote_id;

  render() {
    return (
      <Link
        className="no-underline"
        to={{
          pathname: this.quoteProfileLink,
          state: {
            quote: this.props.quote
          }
        }}
      >
        <div
          className="flex flex-col m-2 text-xl text-grey-darkest shadow rounded-lg border border-grey-light bg-white hover:bg-blue-lightest"
          onClick={ () => this.setState({ redirectToQuoteProfile: true}) }
        >

          <p className="m-4 text-grey-darkest whitespace-pre-line font-bold">
            {this.props.quote.quote_text}
          </p>

          {/* Show author of quote if prop was passed */}
          <div className="flex flex-initial">
            {
              this.memberName &&
              <p
                className="px-4 py-1 text-grey-darkest border-t border-r rounded-bl-lg rounded-tr-lg border-teal-light bg-teal-lightest">
                {this.memberName}
              </p>
            }
          </div>
        </div>
      </Link>

    )
  }
}

SingleQuote.propTypes = {
  quote_id: PropTypes.string,
  quote_text: PropTypes.string,
  member: PropTypes.shape({
    member_id: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    nickname: PropTypes.string
  })
};

export default SingleQuote;