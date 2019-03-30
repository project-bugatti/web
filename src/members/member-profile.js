import React, { Component } from 'react';
import InitialsCircle from "./initials-circle";
import {getMembersEndpoint, prettyPrintPhone, sendHttp} from '../utils/helper-functions';
import {FaMobileAlt, FaChevronCircleUp, FaChevronCircleDown} from 'react-icons/fa';
import SingleQuote from "../quotes/single-quote";
import connect from "react-redux/es/connect/connect";
import Loading from "../utils/loading";

class MemberProfile extends Component {

  constructor() {
    super();
    this.state = {
      showQuotes: true
    }
  }

  componentDidMount() {
    const memberUrl = getMembersEndpoint() + this.props.match.params.member_id;
    sendHttp('get', memberUrl, null, true,
      response => this.setState({member: response.member }),
      () => console.log('error loading member profile'));
  }

  handleQuotes = () => {
    const arrowStyles = "mr-2 text-teal";
    return (
      <div className="m-2">
        <div
          className="flex justify-between items-center py-4 cursor-pointer text-grey-darkest text-2xl bg-teal-lightest rounded-lg"
          onClick={ () => this.setState({showQuotes : !this.state.showQuotes })} >

          <div className="flex">
            <p className="ml-2 font-bold">Quotes</p>
            <p className="ml-2">({this.state.member.quotes.length})</p>
          </div>
          {
            this.state.showQuotes ? (
              <FaChevronCircleUp className={arrowStyles}/>
            ) : (
              <FaChevronCircleDown className={arrowStyles}/>
            )
          }
        </div>
        <div>
          {
            this.state.showQuotes &&
            this.state.member.quotes.map( (quote) =>
              <SingleQuote quote={quote} key={quote.quote_id}/>
            )
          }
        </div>
      </div>
    )
  };

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

        {/* Quotes */}
        {this.handleQuotes()}

      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => ({
  appConfigs: state.appConfigs
});

export default connect(mapStateToProps) (MemberProfile);