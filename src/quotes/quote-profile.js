import React, {Component} from 'react';
// import {getQuotesEndpoint} from "../utils/helper-functions";
import Callback from "../callback/callback";
// import QuoteForm from "./quote-form";
// import NewItemButton from "../utils/new-item-button";

class QuoteProfile extends Component {

  constructor() {
    super();
    this.state = {
      quote : null,
      showQuoteForm : false,
    }
  }

  componentDidMount() {
    // update state with quote prop
    // if quote was not passed down through props, send an HTTP using the parameter

    if (this.props.location.state === undefined) {
      // const quote_id = this.props.match.params.quote_id;
      // const quote_endpoint = getQuotesEndpoint() + quote_id;
      // send http request here
    } else {
      this.setState({quote : this.props.location.state.quote })
    }
  }

  toggleShowQuoteForm = () => {
    this.setState({ showQuoteForm: !this.state.showQuoteForm });
  };

  quoteEditedCallback = () => {
    this.toggleShowQuoteForm();
    console.log('need to refresh!');
  };

  render() {
    if (this.state.quote) {
      return (
        <div>
          <p className="m-2 text-grey-darkest text-xl">
            {this.state.quote.quote_text}
          </p>
        </div>
      )
    }
    return (
      <Callback/>
    )
  }
}

export default QuoteProfile;