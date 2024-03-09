/* eslint-disable react/prop-types */
// import React from "react";

const Input = ({
    type,
    name,
    classname,
    handleChange,
    value,
    placeHolder,
    style,
    checked,
    id
}) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            className={classname}
            onChange={handleChange}
            placeholder={placeHolder}
            style={style}
            checked={checked}
            id={id}
        />
    );
};

export default Input;
