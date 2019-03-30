import React from 'react';

const FullWidthBlock = (props) => {
    if (!props.children) {
        return null;
    }
    return (
        <div className="flex justify-center p-2 m-2 bg-white border border-purple rounded shadow">
            {props.children}
        </div>
    )
};

export default FullWidthBlock;