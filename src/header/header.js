import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import connect from "react-redux/es/connect/connect";
import { FaEquals } from "react-icons/fa";

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expandedNav: false
    };
  }

  showNavbarItems() {
    const headerItemStyles = "block mt-4 lg:inline-block lg:mt-0 text-teal-lighter " +
      "hover:text-white lg:mr-4 text-right text-lg";
    return (
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {
            this.props.appConfigs.pages.map( (headerItem) =>
              <Link
                to={headerItem.route}
                className={headerItemStyles}
                key={headerItem.title}
              >
                {headerItem.title}
              </Link>
            )
          }
        </div>
      </div>
    )
  };


  render() {
    return (
      <nav className="flex justify-between flex-wrap bg-teal p-6">

        { /* App Title */ }
        <div className="pin-t mt-2 mr6">
          <Link to="/home" className="no-underline text-white font-semibold text-xl tracking-tight">
            {this.props.appConfigs.app_title}
          </Link>
        </div>

        <div>
          <div className="text-right block lg:hidden">
            <button
              className="px-3 pt-2 pb-1 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"
              onClick={() => this.setState({expandedNav: !this.state.expandedNav} )}
            >
              <FaEquals/>
            </button>
          </div>

          <div className="hidden lg:block">
            {this.showNavbarItems()}
          </div>

          {
            this.state.expandedNav &&
            <div className="w-full block flex-grow lg:hidden">
              {this.showNavbarItems()}
            </div>
          }
        </div>
      </nav>
    )
  }

}

const mapStateToProps = (state) => ({
  appConfigs: state.appConfigs
});

export default connect(mapStateToProps) (Header);