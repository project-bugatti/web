import React, { Component } from 'react';
import InitialsCircle from "./initials-circle";
import {getMembersEndpoint, prettyPrintPhone, sendHttp} from '../utils/helper-functions';
import {FaMobileAlt, FaChevronCircleUp, FaChevronCircleDown} from 'react-icons/fa';
import SingleQuote from "../quotes/single-quote";
import { connect } from 'react-redux'
import Loading from "../utils/loading";
import FullWidthBlock from "../utils/full-width-block";

class MemberProfile extends Component {

  constructor() {
    super();
    this.state = {
      showQuotes: true
    }
  }

  componentDidMount() {
    const memberUrl = getMembersEndpoint() + this.props.match.params.member_id;
    sendHttp('GET', memberUrl,null, true, true,
      response => this.setState({member: response.member }),
      () => console.log('error loading member profile'));
  }

  render() {
    if (!this.state.member) {
      return <Loading/>
    }

    return (
      <React.Fragment>
        {/* Initials Circle */}
        <div className="flex justify-center mt-4">
          <InitialsCircle member={this.state.member}/>
        </div>

        {/* Name */}
        <div className="flex justify-center font-bold text-2xl mt-2">
          {this.state.member.firstname} {this.state.member.lastname}
        </div>

        {/* Phone */}
        <div className="flex justify-center text-2xl mt-4">
          <FaMobileAlt className="mr-2"/>
          <p>{prettyPrintPhone(this.state.member.phone)}</p>
        </div>

        <div className="py-2"/>

        {/* Quotes Button */}
        <FullWidthBlock>
          <div
            onClick={() => this.setState({showQuotes : !this.state.showQuotes })}
            className="w-full flex justify-between items-center text-grey-darkest text-2xl">


            <div className="flex">
              <p className="ml-2 font-bold">Quotes</p>
              <p className="ml-2">({this.state.member.quotes.length})</p>
            </div>

            {
              this.state.showQuotes ? (
                <FaChevronCircleUp className="mr-2 text-purple"/>
              ) : (
                <FaChevronCircleDown className="mr-2 text-purple"/>
              )
            }
          </div>
        </FullWidthBlock>

        {/* Quotes mapping */}
        <div className="flex flex-wrap">
          {
            this.state.showQuotes &&
            this.state.member.quotes.map( (quote) =>
              <SingleQuote quote={quote} key={quote.quote_id}/>
            )
          }
        </div>

      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => ({
  appConfigs: state.appConfigs
});

export default connect(mapStateToProps) (MemberProfile);