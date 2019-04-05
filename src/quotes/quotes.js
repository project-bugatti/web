import React, { Component } from 'react';
import SingleQuote from "./single-quote";
import NewItemButton from "../utils/new-item-button";
import QuoteForm from "./quote-form";
import { connect } from 'react-redux'
import {getQuotesEndpoint, sendHttp} from "../utils/helper-functions";
import Loading from "../utils/loading";

const myQuotes =  [
  {
    quote_id: "f8f694f0-5405-11e9-825c-d3ab363732c1",
    quote_text: "Fulfilled direction use continual set him propriety continued. Saw met applauded favourite deficient engrossed concealed and her. Concluded boy perpetual old supposing. Farther related bed and passage comfort civilly.",
    member: {
      member_id: "e2292d46-3d12-11e9-b210-d663bd873d93",
      firstname: "Bob",
      lastname: "Raus",
      nickname: null
    }
  },
  {
    quote_id: "f8f694f0-5405-11e9-825c-d3ab363732c2",
    quote_text: "Placing forming nay looking old married few has. Margaret disposed add screened rendered six say his striking confined. ",
    member: {
      member_id: "e2292d46-3d12-11e9-b210-d663bd873d93",
      firstname: "Bob",
      lastname: "Raus",
      nickname: null
    }
  },
  {
    quote_id: "f8f694f0-5405-11e9-825c-d3ab363732c3",
    quote_text: "Let's get it",
    member: {
      member_id: "e2292d46-3d12-11e9-b210-d663bd873d93",
      firstname: "Bob",
      lastname: "Raus",
      nickname: null
    }
  },
  {
    quote_id: "f8f694f0-5405-11e9-825c-d3ab363732c4",
    quote_text: "Doubtful on an juvenile as of servants insisted. Judge why maids led sir whose guest drift her point. Him comparison especially friendship was who sufficient attachment favourable how.",
    member: {
      member_id: "e2292d46-3d12-11e9-b210-d663bd873d93",
      firstname: "Bob",
      lastname: "Raus",
      nickname: null
    }
  },
  {
    quote_id: "f8f694f0-5405-11e9-825c-d3ab363732c5",
    quote_text: "Neat own nor she said see walk. And charm add green you these. Sang busy in this drew ye fine.",
    member: {
      member_id: "e2292d46-3d12-11e9-b210-d663bd873d93",
      firstname: "Bob",
      lastname: "Raus",
      nickname: null
    }
  }
];

class Quotes extends Component {

  constructor() {
    super();
    this.state = {
      quotes: myQuotes,
      showQuoteForm: false
    };
  }

  componentDidMount() {
    // this.getQuotes();
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

        {/* New quote button */}
        <NewItemButton
          buttonTitle={"New Quote"}
          showButtonTitle={this.state.showQuoteForm}
          parentCallback={this.toggleShowQuoteForm}
        />

        {
          this.state.showQuoteForm &&
          <div className="flex justify-center">
            <QuoteForm parentCallback={this.newQuoteSubmittedCallback} />
            <div className="my-8 bg-red"/>
          </div>
        }

        {
          this.state.quotes != null ? (
            <div className="flex flex-wrap">
              {
                this.state.quotes.map( quote =>
                  <SingleQuote quote={quote} key={quote.quote_id} />
                )
              }
            </div>
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