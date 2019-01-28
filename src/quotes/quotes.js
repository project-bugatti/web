import React, { Component } from 'react';
import SingleQuote from "./single-quote";
import NewItemButton from "../utils/new-item-button";
import QuoteForm from "./quote-form";
import connect from "react-redux/es/connect/connect";
import {getQuotesEndpoint, sendHttpGet} from "../utils/helper-functions";

class Quotes extends Component {

  constructor() {
    super();
    this.state = {
      quotes: [],
      showQuoteForm: false,
    };
  }

  componentDidMount() {
    this.fetchQuotes();
  }

  fetchQuotes = () => {
    sendHttpGet(getQuotesEndpoint(),
      (response) => this.setState({quotes: response}),
      (error) => {} );
  };

  toggleShowQuoteForm = () => {
    this.setState({ showQuoteForm: !this.state.showQuoteForm });
  };

  newQuoteSubmittedCallback = () => {
    // hide the form and refresh quotes
    this.toggleShowQuoteForm();
    this.fetchQuotes();
  };

  render() {
    return (
      <div>
        <NewItemButton
          buttonTitle={"New Quote"}
          showButtonTitle={this.state.showQuoteForm}
          parentCallback={this.toggleShowQuoteForm}
        />

        {
          this.state.showQuoteForm &&
          <div>
            <QuoteForm
              parentCallback={this.newQuoteSubmittedCallback}
            />
            <div className="my-8 bg-red"/>
          </div>
        }

        {
          this.state.quotes.map( quote =>
            <SingleQuote quote={quote} key={quote.quote_id} />
          )
        }
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  appConfigs: state.appConfigs
});

export default connect(mapStateToProps) (Quotes);