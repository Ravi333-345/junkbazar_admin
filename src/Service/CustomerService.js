import axiosInstance from "../api-config/axiosInstance";

const customerService = async (obj,skip,perPageCount) => {
    try {
      // const response = await axiosInstance.get(`/vendor/getVendorOrder?page=0&limit=10&orderStatus=${queryString}&key=${(obj)?obj.key:null}`);
      const response = await axiosInstance.get(`/getUser?page=${skip}&limit=${perPageCount}&filterValue=${(obj)?obj.key:null}`);
    
      const resposeParsing = JSON.parse(response.data.data);
      console.log("get Customer data parsing", resposeParsing);
      return resposeParsing
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  export {customerService}