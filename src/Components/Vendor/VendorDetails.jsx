import { useEffect, useState } from "react";
import Header from "../../Auth/Dashboard/Header";
import DashboardNav from "../../Auth/Dashboard/Nav";
import { useLocation } from "react-router-dom";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Vendor_Payment_History from "./Vender_payment_history";
import {
  updateAccountStatusService,
  getVendorInfoService,
} from "../../Service/Vendor";

const VendorDetails = () => {

  
  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);
  // const [currentImage, setCurrentImage] = useState(0);
  // const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("false");
  const [vendorRespInfo,setVendorRespInfo] = useState()
  const location = useLocation();

  const sampleAadhar =
    "https://aadhaarcard.co.in/wp-content/uploads/2023/04/aadhaar-card-800x445.webp";
  const onImageError = (e) => {
    e.target.src = sampleAadhar;
  };

  const samplePan =
    "https://mybillbook.in/blog/wp-content/uploads/2022/07/pan-card.png";
  const onImagePanError = (e) => {
    e.target.src = samplePan;
  };

  const sampleProfile =
    " https://st2.depositphotos.com/1104517/11965/v/450/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg";
  const onImageProfileError = (e) => {
    e.target.src = sampleProfile;
  };
  const vendorDetailResp = location.state ? location.state.item : null;

  const getVendorInfo = async () => {
    try {
      const vendorResp = await getVendorInfoService(vendorDetailResp?.userId);
      console.log("vendorResp", vendorResp);
      setVendorRespInfo(vendorResp)
    } catch (error) {}
  };
  const updateAccountStatus = async (status) => {
    try {
     const updateStatus= await updateAccountStatusService(vendorDetailResp?.userId, status);
     console.log("updateStatus",updateStatus);
     setUpdateStatus("true")
      await getVendorInfo();
    } catch (error) {
      console.error("error", error);
    }
  };
  useEffect(() => {
    getVendorInfo()
  
   
  }, [updateStatus])

  return (
    <main className="">
      <DashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
      <Header handleNavClick={handleVendorNav} showNav={vendorNav} />
      <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[5%] bg-green-50 h-full flex flex-col justify-start">
        <div class="max-w-screen-xl mx-auto px-5 pb-0 pt-0 mt-8 shadow-lg bg-white rounded-lg z-0 relative">
          <div class="p-4 grid grid-cols-1 sm:grid-cols-12 gap-10 bg-white">
            <div class="sm:col-span-12 lg:col-span-3">
              <div href="#">
                <Zoom>
                  <img
                    src={
                      vendorRespInfo?.profileUrl
                        ? vendorRespInfo?.profileUrl
                        : sampleProfile
                    }
                    alt="profile"
                    onError={onImageProfileError}
                    class="h-56 bg-cover text-center overflow-hidden"
                    title="Woman holding a mug"
                  />
                </Zoom>
              </div>
              <div class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                <div>
                  <div class="text-gray-900 font-bold text-lg mb-2 hover:text-indigo-600 transition duration-500 ease-in-out">
                    Name : {vendorRespInfo?.firstName} {vendorRespInfo?.lastName}
                  </div>
                  <div
                    href="#"
                    class="t font-medium flex items-center hover:text-gray-900 transition duration-500 ease-in-out"
                  >
                    Phone : {vendorRespInfo?.dialCode}{" "}
                    {vendorRespInfo?.phoneNumber}
                  </div>

                  <p className="text-gray-700  font-medium mt-2">
                    Address : {vendorRespInfo?.address}
                  </p>
                  <div className="flex">
                    <span>Account Status :</span>{" "}
                    <p
                      className={`font-medium ml-2 ${
                       (vendorRespInfo?.verified.toLowerCase() === "pending"|| vendorRespInfo?.verified.toLowerCase() === 'Rejected')
                          ? `text-red-500`
                          : `text-green-500`
                      }`}
                    >
                      {" "}
                      {vendorRespInfo?.verified}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <button
                  onClick={() => {
                    updateAccountStatus("Rejected");
                  }}
                  className="bg-red-500 w-2/5 py-1 text-white shadow-lg rounded-lg"
                  type="button"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    updateAccountStatus("Approved");
                  }}
                  className={`bg-[#5AB344] w-2/5 py-1 ml-5 text-white shadow-lg rounded-lg ${
                    vendorRespInfo?.verified.toLowerCase() === "pending"
                      ? ``
                      : `cursor-not-allowed`
                  }`}
                  type="button"
                  disabled={(vendorRespInfo?.verified.toLowerCase() === "pending")?false:true}
                >
                  Approve
                </button>
              </div>
            </div>

            <div class="sm:col-span-6 lg:col-span-9 flex">
              <div class="flex items-start mb-3 pb-3">
                <div href="#" class="inline-block mr-3">
                  <Zoom>
                    <img
                      src={
                        vendorRespInfo?.panUrl
                          ? vendorRespInfo?.panUrl
                          : samplePan
                      }
                      alt="pan card"
                      onError={onImagePanError}
                      class="w-100 bg-cover bg-center"
                    />
                  </Zoom>
                  <div>
                    <p className="text-gray-600 text-lg text-center">
                      Pan Card
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex items-start mb-3 pb-3">
                <div href="#" class="inline-block mr-3">
                  <Zoom>
                    <img
                      src={
                        vendorRespInfo?.aadhaarUrl
                          ? vendorRespInfo?.aadhaarUrl
                          : sampleAadhar
                      }
                      alt="pan card"
                      onError={onImageError}
                      class="w-100  bg-cover bg-center"
                    />
                  </Zoom>
                  <div>
                    <p className="text-gray-600 text-lg text-center">
                      Aadhar Card
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <Vendor_Payment_History props={vendorRespInfo?.userId} />
        </div>
      </section>
    </main>
  );
};

export default VendorDetails;
