/* eslint-disable react/prop-types */
// import React from "react";
import Input from "./Input.jsx";

const LabeledInput = ({
    label, handleChange, name, type, value
}) => {
    return (
        <>
            <label className="text-[16px] font-[400] text-[#666666]">{label}</label>
            <Input
                classname="border border-[#66666659] rounded-[12px] mt-1 w-full p-3 outline-none text-[16px]"
                name={name}
                type={type}
                value={value}
                handleChange={handleChange}
            />
        </>
    );
};

export default LabeledInput;
