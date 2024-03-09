import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Swal from "sweetalert2";
import axiosInstance from "../../api-config/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import LabeledInput from "../../Components/auth/LabeledInput.jsx";
import Button from "../../Components/auth/Button.jsx";
import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility } from "semantic-ui-react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import Input from "../../Components/auth/Input.jsx";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    });
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const phoneRegex = /^\d{6}$/;
    const isValid = phoneRegex.test(value);

    setPassword(value);
  };

  const SignInService = async () => {
    const mobile = phoneNumber.slice(3, 13);
    try {
      const payLoad = {
        dialCode: "+91",
        phoneNumber: mobile,
        password: password,
      };
      const response = await axiosInstance.post("/login", payLoad);

      const dataObj = response.data;


      if (dataObj.statusCode === 200) {
        Swal.fire({
          icon: "success",
          position: "center",
          showConfirmButton: false,
          timer: 2500,
          title: response.data.message,
        });
        navigate("/OtpVerify", {
          state: {
            mobile,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);

      if (error.response) {
        // If server responded with a status code for a request
        Swal.fire({
          icon: "error",
          position: "center",
          showConfirmButton: false,
          timer: 2500,
          title: "Enter Valid Mobile Number",
        });
      } else if (error.request) {
        // Client made a request but response is not received
        console.log(error.request);
      } else {
        // Other case
        console.log("Error", error.message);
      }
    }
  };
  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr   justify-around items-center hidden">
        <div>
          <img
            src="https://file.rendit.io/n/bn92fRq4fOQmLl8Xy4AU.png"
            alt="Junkbazaradminremovebgpreview"
            className="max-h-fit mt-16 mb-12"
          />
        </div>
      </div>
      <div className="flex md:w-1/2 justify-center  items-center  bg-white">
        <form className="bg-white shadow-xl  lg:w-6/12">
          <div className=" p-6 text-center items-center justify-center text-2xl font-['Gilroy-Bold'] tracking-[0.16] text-[#5ab344] ">
            Admin
          </div>
          <div className="bg-[#5ab344] w-full h-2" />

          <div className="p-10">
            <div className=" text-start text-3xl font-['Gilroy-SemiBold'] tracking-[0.16] text-[#707070] ">
              Welcome! Admin
            </div>
            <div className="mt-5 text-start text-xl font-['Gilroy-Regular'] leading-[25.3px] text-[#707070] ">
              Sign In
            </div>
            <div className="text-xl font-['Inter'] tracking-[0.09] leading-[29.3px] text-[#95989a] mt-20">
              Phone Number
            </div>
            <div className="border border-l-zinc-600 rounded p-2 max-w-2xl">
              <PhoneInput
                maxLength={15}
                className={"input-phone-number"}
                international
                defaultCountry="IN"
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
            </div>
            <div className="text-xl font-['Inter'] tracking-[0.09] leading-[29.3px] text-[#95989a] mt-5">
              Password
            </div>
            <div class="mb-4 flex border border-l-zinc-600 rounded p-2 max-w-2xl">
              <input
                className="w-full focus:outline-none"
                type={type}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <span
                class="flex justify-around items-center"
                onClick={handleToggle}
              >
                <Icon class="absolute mr-10" icon={icon} size={25} />
              </span>
            </div>
            <div className="mt-40 text-start text-xl  leading-[25.3px] text-[#707070] "></div>
            {/* <Button
              label="Continue"
              className="font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80"
              handleClick={SignInService}
            /> */}
            <button
              className="font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80"
              //   handleClick={SignInService}
              onClick={() => {
                SignInService()
              }}
              type="button"
            >
              Continue
            </button>
            <div className="mt-20 text-start text-xl font-['Gilroy-Regular'] leading-[25.3px] text-[#707070] "></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
