/* eslint-disable react/prop-types */
// import React from "react";
import Input from "./Input.jsx";

const Label = ({
    input: {
        label, type, name, value, placeHolder 
    },
    handleChange
}) => {
    return (
        <>
            <label className="labels">{label}</label>
            <Input
                classname="input-content signup-input"
                placeHolder={placeHolder}
                type={type}
                name={name}
                value={value}
                handleChange={handleChange}
            />
        </>
    );
};

export default Label;
