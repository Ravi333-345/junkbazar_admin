import axiosInstance from "../api-config/axiosInstance";
import showSuccessMessage from "../utils/showGeneralMessage";

const vendorService = async (obj, skip, perPageCount, phoneNumber, pincode) => {
  try {
    // const response = await axiosInstance.get(`/vendor/getVendorOrder?page=0&limit=10&orderStatus=${queryString}&key=${(obj)?obj.key:null}`);
    const response = await axiosInstance.get(
      `/getVendor?page=${skip}&limit=${perPageCount}&filterValue=${
        obj ? obj.key : null
      }&phoneNumber=${phoneNumber ? phoneNumber : null}&pincode=${
        pincode ? pincode : null
      }`
    );

    const resposeParsing = JSON.parse(response.data.data);
    console.log("get vendorService data parsing", resposeParsing);
    return resposeParsing;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const subVendorService = async (obj, skip, perPageCount) => {
  try {
    // const response = await axiosInstance.get(`/vendor/getVendorOrder?page=0&limit=10&orderStatus=${queryString}&key=${(obj)?obj.key:null}`);
    const response = await axiosInstance.get(
      `/getAdminManagedVendor?page=${skip}&limit=${perPageCount}&filterValue=${
        obj ? obj.key : null
      }`
    );

    const resposeParsing = JSON.parse(response.data.data);
    console.log("get vendorService data parsing", resposeParsing);
    return resposeParsing;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const vendorPaymentHistory = async (queryString,obj,skip,perPageCount,vendorId) => {
  try {
    // const response = await axiosInstance.get(`/vendor/getVendorOrder?page=0&limit=10&orderStatus=${queryString}&key=${(obj)?obj.key:null}`);
    const response = await axiosInstance.get(`/getVendorOrder?limit=${perPageCount}&page=${skip}&orderStatus=${queryString}&filterValue=${(obj)?obj.key:null}&vendorId=${vendorId}`);
  
    const resposeParsing = JSON.parse(response.data.data);
    return resposeParsing
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
const downLoadCsvService = async (vendorId,startDate,endDate) => {
  console.log("downLoadCsv working",vendorId,startDate,endDate);
  try {
    // const response = await axiosInstance.get(`/vendor/getVendorOrder?page=0&limit=10&orderStatus=${queryString}&key=${(obj)?obj.key:null}`);
    
    const response = await axiosInstance.get(`/downloadCsv?vendorId=${vendorId}&from=${startDate}&to=${endDate}`);
  
    // const resposeParsing = JSON.parse(response.data.data);
    return response
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const updateAccountStatusService = async (userId, status)=>{
  console.log("updateAccountStatusService working",userId,status);
  try {
    const payload = {
      userId,
      verified:status
    }
    const resp = await axiosInstance.post(`/updateAccountStatus`,payload);
    const dataObject = resp.data;
    const resposeParsing = JSON.parse(resp.data.data);
    showSuccessMessage(dataObject.message, "success");
    return resposeParsing
  } catch (error) {
    console.error("Error fetching data:", error);
    const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;
      showSuccessMessage(errorMessage, "error");
  }
}

const getVendorInfoService = async (userId)=>{
  try {
    const vendorInfoResp = await axiosInstance.get(`/getVendorInfo?userId=${userId}`)
    const resp = JSON.parse(vendorInfoResp.data.data);
    return resp;
  } catch (error) {
    console.error("error");
  }
}
export { vendorService, 
  subVendorService ,
  vendorPaymentHistory,
  downLoadCsvService,
  updateAccountStatusService,
  getVendorInfoService };
