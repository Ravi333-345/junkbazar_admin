/* eslint-disable react/prop-types */
// import React from "react";
import Input from "./Input.jsx";

const SigupInput = ({
    input: {
        label, placeholder, type, name, value 
    },
    handleChange,
    style
}) => {
    return (
        <>
            <label>{label}</label>
            <Input
                classname="input-content signin-input  placeholder:font-[Gilroy-Regular]"
                placeHolder={placeholder}
                type={type}
                name={name}
                value={value}
                handleChange={handleChange}
                style={style}
            />
        </>
    );
};

export default SigupInput;
