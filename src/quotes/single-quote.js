import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class SingleQuote extends Component {
  memberName = (this.props.quote.nickname) ? this.props.quote.nickname : this.props.quote.firstname
  quoteProfileLink = '/quotes/' + this.props.quote.quote_id;

  render() {
    return (
      <Link
        to={{
          pathname: this.quoteProfileLink,
          state: {
            quote: this.props.quote
          }
        }}
        className="no-underline"
      >
        <div
          className="flex flex-col m-2 bg-grey-lightest cursor-pointer text-xl shadow-lg rounded-lg border border-grey-light"
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
};

export default SingleQuote;