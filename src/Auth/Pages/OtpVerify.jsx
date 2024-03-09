import Swal from "sweetalert2";
import LabeledInput from "../../Components/auth/LabeledInput";
import axiosInstance from "../../api-config/axiosInstance";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../Components/auth/Button";

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const phoneRegex = /^\d{6}$/;
    const isValid = phoneRegex.test(value);

    setOtp(value);
  };

  const otpVerifyService = async () => {
    const payload = {
      otp: otp,
      phoneNumber: location.state.mobile,
    };

    try {
      const resp = await axiosInstance.post("/otpVerify", payload);
      const dataObject = resp.data;
      const tokenParse = JSON.parse(dataObject.data);

      const dataUser = JSON.parse(dataObject.data);
      localStorage.setItem("token", tokenParse.token);

      const userId = dataUser.userId;

      if (dataObject.statusCode === 200) {
        Swal.fire({
          icon: "success",
          position: "center",
          showConfirmButton: false,
          timer: 2500,
          title: dataObject.message,
        });

        navigate("/Dashboard", {
          replace: true,
        });
      }
    } catch (error) {
      console.error("Error", error);

      if (error.response) {
        // status code out of the range of 2xx
        Swal.fire({
          icon: "error",
          position: "center",
          showConfirmButton: false,
          timer: 2500,
          title: error.response.data.error._message,
        });

      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Error on setting up the request
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
        <form className="bg-white shadow-xl lg:w-6/12">
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
              Enter OTP
            </div>

            <LabeledInput type="text" handleChange={handlePhoneNumberChange} />
            <div className="mt-40 text-start text-xl  leading-[25.3px] text-[#707070] "></div>
            {/* <Button
                            label="Continue"
                            className="font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80"

                            handleClick={otpVerifyService}
                        /> */}
            <button
              className="font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80"
              //   handleClick={SignInService}
              onClick={() => {
                otpVerifyService();
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

export default OtpVerify;
