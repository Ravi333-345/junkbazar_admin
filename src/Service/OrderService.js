import axiosInstance from "../api-config/axiosInstance";

const assignOrderToVendor = async (vendorId, orderId) => {
  const payload = {
    vendorId,
    orderId,
  };

  try {
    console.log("payload", payload);
    const resp = await axiosInstance.post("/assignOrderToVendor", payload);
    const dataObject = resp.data;
    console.log("response from api", dataObject);

    return dataObject;
  } catch (error) {
    console.error("Error While Otp Verify", error);
    if (error.response) {
      // Handle specific server response errors
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;
    } else {
      // Handle other types of errors
      console.log("error", error);
    }
    throw error; // Rethrow the error to propagate it to the calling code
  }
};

const orderPendingService = async (obj,skip,perPageCount,scrap_Name,orderId) => {
  try {
  
    const resp = await axiosInstance.get(`/getPendingOrders?page=${skip}&limit=${perPageCount}&filterValue=${(obj)?obj.key:null}&scrapName=${(scrap_Name)?scrap_Name : null}`);
    const dataObject = JSON.parse(resp.data.data);
    console.log("response from api", dataObject);

    return dataObject;
  } catch (error) {
    console.error("Error While Otp Verify", error);
    if (error.response) {
      // Handle specific server response errors
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;
    } else {
      // Handle other types of errors
      console.log("error", error);
    }
    throw error; // Rethrow the error to propagate it to the calling code
  }
};

const orderPendingAssignService = async (obj,skip,perPageCount,scrap_Name) => {
  try {
  
    const resp = await axiosInstance.get(`/getPendingOrdersAssignToAdmin?page=${skip}&limit=${perPageCount}&filterValue=${(obj)?obj.key:null}&scrapName=${(scrap_Name)?scrap_Name : null}`);
    const dataObject = JSON.parse(resp.data.data);
    console.log("response from api", dataObject);

    return dataObject;
  } catch (error) {
    console.error("Error While Otp Verify", error);
    if (error.response) {
      // Handle specific server response errors
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;
    } else {
      // Handle other types of errors
      console.log("error", error);
    }
    throw error; // Rethrow the error to propagate it to the calling code
  }
};

export{
    assignOrderToVendor,
    orderPendingService,
    orderPendingAssignService
}
