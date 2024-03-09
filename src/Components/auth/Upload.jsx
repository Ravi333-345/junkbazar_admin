/* eslint-disable react/prop-types */
// import React from "react";
import ulpoad_icon from "../../assets/auth/ulpoad_icon.png";

const Upload = ({
    label, value, name, handleChange, fileName 
}) => {
    return (
        <>
            <p className="labels">{label}</p>
            <label htmlFor="upload" className="_labels input-content">
                <span>{fileName}</span>
                <input
                    type="file"
                    value={value}
                    name={name}
                    style={{
                        display: "none" 
                    }}
                    id="upload"
                    onChange={handleChange}
                />
                <img src={ulpoad_icon} alt="" className="uploadImage" />
            </label>
        </>
    );
};

export default Upload;
