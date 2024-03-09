/* eslint-disable react/prop-types */
// import React from "react";

const Button = ({
    label, handleClick, classname, style, disabled 
}) => {
    return (
        <button
            type="button"
            className={classname}
            onClick={handleClick}
            style={style}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;
