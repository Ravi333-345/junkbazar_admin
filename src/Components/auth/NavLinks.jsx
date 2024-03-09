/* eslint-disable react/prop-types */
// import React from "react";

const NavLinks = ({
    signin, activateSignin, activateSignup 
}) => {
    return (
        <div className="nav-links">
            <ul>
                { <li
                    className={signin ? "active-link" : ""}
                    onClick={() => {
                        activateSignin();
                    }}
                >
                    <p>Sign In</p>
                </li> }
                <li
                    className={!signin ? "active-link" : ""}
                    onClick={() => {
                        activateSignup();
                    }}
                >
                    <p>Sign Up</p>
                </li>
            </ul>
        </div>
    );
};

export default NavLinks;
