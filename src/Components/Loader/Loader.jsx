/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { RotatingSquare } from "react-loader-spinner";

const Loader = ({ show }) => {
    return show ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <RotatingSquare
            height={100}
            width={100}
            color="#4fa94d"
            ariaLabel="rotating-square-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : null;
    
};

export default Loader;
