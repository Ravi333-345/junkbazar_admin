import { useState } from "react";
import axiosInstance from "../../api-config/axiosInstance";
import PhoneInput from "react-phone-number-input";
import showSuccessMessage from "../../utils/showGeneralMessage";

const AddSubVendor = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubVendor = async () => {
    const mobile = phoneNumber.slice(3, 13);
    const dialCode = phoneNumber.slice(0, 3);
    const payload = {
      dialCode: dialCode,
      phoneNumber: mobile,
    };

    try {
      const resp = await axiosInstance.post("/createVendor", payload);
      const data = resp.data;
      showSuccessMessage(resp?.data.message, "success");
      setPhoneNumber("");
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;

      showSuccessMessage(errorMessage, "error");
    }
  };

  return (
    <div class="w-full max-w-3xl mx-auto p-2">
      <div class="bg-white:bg-gray-800 p-8 rounded-lg shadow-md border white:border-gray-700">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Add New Vendor
        </h1>
        <div className="col-span-6 sm:col-span-3">
          <label className="block py-3 text-black">Enter Phone Number</label>
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
        </div>
      </div>
      <div class="mt-8 flex justify-end">
        <button
          onClick={handleSubVendor}
          class="bg-[#5AB344] text-white px-4 py-2 rounded-lg "
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddSubVendor;
