import React from 'react';
import {FaPlusCircle} from 'react-icons/fa';
import {FaMinusCircle} from "react-icons/fa/index";
import PropTypes from 'prop-types';

const NewItemButton = (props) => {
  return (
    <div className="flex">
      <button
        className="flex-grow m-2 py-2 border border-teal-lighter bg-teal-lightest rounded-lg shadow"
        onClick={ () => props.parentCallback() }>

        <div className="flex justify-center items-center">
          {/* Show/hide icon */}
          <div className="mt-1 text-teal text-center text-3xl ">
            {
              props.showButtonTitle ? (
                <FaMinusCircle/>
              ) : (
                <div className="mr-4">
                  <FaPlusCircle/>
                </div>
              )
            }
          </div>

          {/* Display button text only when form is closed */}
          {
            !props.showButtonTitle &&
            <div className="text-grey-darkest text-center text-2xl">{props.buttonTitle}</div>
          }
        </div>
      </button>
    </div>
  )
};

NewItemButton.propTypes = {
  buttonTitle: PropTypes.string,
  showButtonTitle: PropTypes.bool,
  parentCallback: PropTypes.func
};

export default NewItemButton;