import React, { Component } from 'react';
import SingleQuote from "./single-quote";
import NewItemButton from "../utils/new-item-button";
import QuoteForm from "./quote-form";
import connect from "react-redux/es/connect/connect";
import {getQuotesEndpoint, sendHttp} from "../utils/helper-functions";
import Loading from "../utils/loading";

class Quotes extends Component {

  constructor() {
    super();
    this.state = {
      quotes: null,
      showQuoteForm: false,
    };
  }

  componentDidMount() {
    this.getQuotes();
  }

  getQuotes = () => {
    sendHttp('GET', getQuotesEndpoint(), null, true, (response) => {
      this.setState({quotes: response.quotes});
    }, (error) => {
      console.log(error);
    });
  };


  toggleShowQuoteForm = () => {
    this.setState({ showQuoteForm: !this.state.showQuoteForm });
  };

  newQuoteSubmittedCallback = () => {
    // hide the form and refresh quotes
    this.toggleShowQuoteForm();
    this.getQuotes();
  };

  render() {
    return (
      <React.Fragment>
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
          this.state.quotes != null ? (
            this.state.quotes.map( quote =>
              <SingleQuote quote={quote} key={quote.quote_id} />
            )
          ):(
            <Loading/>
          )
        }
      </React.Fragment>
    );
  }

}



const mapStateToProps = (state) => ({
  appConfigs: state.appConfigs
});

export default connect(mapStateToProps) (Quotes);