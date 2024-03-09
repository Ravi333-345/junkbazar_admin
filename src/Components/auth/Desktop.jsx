/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
// import React from "react";
import cash from "../../assets/auth/CASH 1.png";
import Card from "./Card.jsx";

const Desktop = ({
    children, signin, activateSignin, activateSignup 
}) => {
    return (
        <div className="desktop-content">
            <div className="img-content">
                <img src={cash} className="auth-image" alt="" />
            </div>
            <div className="form-form-content">
                <Card
                    children={children}
                    signin={signin}
                    activateSignin={activateSignin}
                    activateSignup={activateSignup}
                />
            </div>
        </div>
    );
};

export default Desktop;
