import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SingleQuote extends Component {
  memberName = (this.props.quote.nickname) ? this.props.quote.nickname : this.props.quote.firstname;

  render() {
    return (
      <div className="w-full md:w-1/2 lg:w-1/3">

        <div className="flex flex-col m-2 text-xl text-grey-darkest shadow rounded-lg border border-grey-light leading-normal">

          <p className="m-4 text-grey-darkest whitespace-pre-line font-sans">
            "{this.props.quote.quote_text}"
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
      </div>
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