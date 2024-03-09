import "./App.css";

import Nav from "./Common/Navbar/Nav";
import Footer from "./Common/Footer/Footer";
import { Route, Routes } from "react-router-dom";

import Orders from "./Pages/Orders";
import Customers from "./Pages/Customers";
import Vendors from "./Pages/Vendors";
import Settings from "./Pages/Settings";
import Login from "./Auth/Pages/Login";
import OtpVerify from "./Auth/Pages/OtpVerify";
import Dashboard from "./Auth/Dashboard/Dashboard";
import UploadScrap from "./Pages/Scrap";
import AddScrap from "./Components/Scarp/ScarapList";
import EditScrap from "./Components/Scarp/EditScrap";
import ScrapDetails from "./Components/Scarp/ScrapDetails";
import DashboardPage from "./Pages/dashboardPage";
import VendorDetails from "./Components/Vendor/VendorDetails";
import CustomerDetails from "./Components/Customer/customerDetail";
import SubVendor from "./Pages/SubVendor";
import PendingOrders from "./Pages/PendingOrder";
import { useEffect, useState } from "react";
import axiosInstance from "./api-config/axiosInstance";
import Loader from "./Components/Loader/Loader";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosInstance.interceptors.request.use(
      (config) => {
        setLoading(true);

        return config;
      },
      (error) => {
        // Handle request error
        setLoading(false);
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => {
        console.log("axios response ", response);
        setLoading(false);
        return response;
      },
      (error) => {
        console.log("axiosInstance response error", error);
        setLoading(false);

        return Promise.reject(error);
      }
    );
  }, []);
  return (
    <div>
      <Loader show={loading} />
      <Routes>
        <Route path="/OtpVerify" element={<OtpVerify />} />
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<DashboardPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/Customers" element={<Customers />} />
        <Route path="/Vendors" element={<Vendors />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/UploadScrap" element={<UploadScrap />} />
        <Route path="/AddScrap" element={<AddScrap />} />
        <Route path="/editScrap" element={<EditScrap />} />
        <Route path="/ScrapDetails" element={<ScrapDetails />} />
        <Route path="/VendorDetails" element={<VendorDetails />} />
        <Route path="/CustomerDetails" element={<CustomerDetails />} />
        <Route path="/SubVendor" element={<SubVendor />} />
        <Route path="/pending_orders" element={<PendingOrders />} />
      </Routes>
    </div>
  );
}

export default App;
