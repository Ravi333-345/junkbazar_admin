import axiosInstance from "../api-config/axiosInstance";

const scrapService = async (obj,skip,perPageCount) => {
    try {
      // const response = await axiosInstance.get(`/vendor/getVendorOrder?page=0&limit=10&orderStatus=${queryString}&key=${(obj)?obj.key:null}`);
      const response = await axiosInstance.get(`/getScrap?page=${skip}&limit=${perPageCount}&key=${(obj)?obj.key:null}`);
    
      const resposeParsing = JSON.parse(response.data.data);
      return resposeParsing
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  export {scrapService}