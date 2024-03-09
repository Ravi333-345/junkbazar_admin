import { useState } from "react";
import { vendorPaymentHistory } from "../../Service/Vendor";
import { useEffect } from "react";
import { OrdersRespEnum } from "../../api-config/commonUploadType";
import axiosInstance from "../../api-config/axiosInstance";
import showGeneralMessage from "../../utils/showGeneralMessage";
import {downLoadCsvService} from "../../Service/Vendor"
const Vendor_Payment_History = (props) => {
  const [userOrder, setUserOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState();
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [filterOrderStatus, setFilterOrderStatus] = useState("0");
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const [isItemSelected, setIsItemSelected] = useState([]);

  const [isCsvPopupOpen, setIsCsvPopupOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const perPageCount = 10;


  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };


  useEffect(() => {
    window.scrollTo(0, 0);

    vendorPayHistory();
  }, [page]);

  const venderId = props ? props?.props : null;
  const vendorPayHistory = async (queryString, obj) => {
    try {
      const scrapOrders = await vendorPaymentHistory(
        queryString,
        obj,
        page - 1,
        perPageCount,
        venderId
      );
      console.log("vendor orders", scrapOrders);
      setUserOrder(scrapOrders.orders);
      setTotalItem(scrapOrders.totalScrapCount);
      setTotalPageCount(Math.ceil(scrapOrders.totalScrapCount / perPageCount));
    } catch (error) {
      console.error("error", error);
    }
  };

  const selectPageHandler = (selectedPage) => {
    console.log("selectPageHandler", userOrder);
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPageCount &&
      selectedPage !== page
    ) {
      console.log("selectedPage", selectedPage);
      setPage(selectedPage);
    }
  };

  const filterByOrderStatus = async (filterStatus) => {
    console.log("filterByOrderStatus", filterOrderStatus, filterStatus);
    const filterValue = filterStatus
      ? filterStatus.target.value
      : filterOrderStatus;

    let queryString = "";
    try {
      if (filterValue.toLowerCase() === "all") {
        queryString += "0,1,2,3,4";
      } else {
        queryString += filterValue;
      }

      setFilterOrderStatus(queryString);
      await vendorPayHistory(queryString);
      console.log("queryString", queryString);
    } catch (error) {
      console.error("Error during select payment method");
    }
  };

  const filetrOrderBySearch = async (event) => {
    console.log("serach event", event.target.value);
    // setSearchFilter(event.target.value);
    let obj = {};
    try {
      obj.key = event.target.value;
      console.log("searchFilter", obj, filterOrderStatus);
      await vendorPayHistory(filterOrderStatus, obj);
    } catch (error) {
      console.error("Search Error", error);
    }
  };
  const csvDownloadEvent = async (venderId) => {
    console.log("venderId for csv", venderId);

    try {
  
      const pdf = await downLoadCsvService(venderId,startDate,endDate);
      const pdfResponse = pdf.data;
      console.log("pdfResponse", pdfResponse);
    
    const blob = new Blob([pdfResponse], { type: 'text/csv' });

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice_${venderId}.csv`;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("error", error);
    }
  };
  const openPopUp = () => {
    console.log("isItemSelected", isItemSelected);
    return (
      <div className="bg-white w-[50%] relative z-50 flex flex-col gap-2 justify-between px-10 pb-10 pt-3 rounded-lg">
        <div
          className="flex justify-end text-[22px] font-bold text-[#5AB344] cursor-pointer"
          onClick={() => {
            setIsPaymentPopupOpen(false);
          }}
        >
          X
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex flex-row gap-2 justify-between">
            <p className="font-bold overflow-hidden w-[240px]">
              Transaction Receipt:
            </p>
            <img
              alt=""
              src={
                isItemSelected?.paymentDocUrl
                  ? isItemSelected?.paymentDocUrl
                  : ""
              }
              class="h-[350px] w-full bg-cover text-center overflow-hidden"
            />
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-bold w-[170px]">Transaction Number:</p>
            <p className="">{isItemSelected?.transactionOrUtrNumber}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <p className="font-bold w-[170px]">Markup Fees:</p>
            <p className="">{isItemSelected?.markupFee}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-bold w-[170px]">Name:</p>
            <p className="">{isItemSelected?.fullName}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-bold w-[170px]">phoneNumber:</p>
            <p className="">{isItemSelected?.phoneNumber}</p>
          </div>
        </div>
        <div
          className={`flex justify-end gap-4 ${
            (isItemSelected?.isAdminApprovedPaymentStatus === "approved" &&
              isItemSelected?.isPaid) ||
            isItemSelected?.isAdminApprovedPaymentStatus === "rejected"
              ? "hidden"
              : "block"
          }`}
        >
          <button
            onClick={() => {
              acceptPaymentDetails("rejected");
            }}
            className="bg-red-500 px-8 py-2 text-white shadow-lg rounded-full font-bold"
          >
            Reject
          </button>
          <button
            className="bg-[#5AB344] px-8 py-2 text-white shadow-lg rounded-full font-bold"
            type="button"
            onClick={() => {
              acceptPaymentDetails("approved");
            }}
          >
            Accept
          </button>
        </div>
        <div
          className={`${
            isItemSelected?.isAdminApprovedPaymentStatus === "rejected"
              ? "block"
              : "hidden"
          } flex justify-end`}
        >
          <button
            className="bg-red-500 px-8 py-2 text-white shadow-lg rounded-full font-bold"
            type="button"
          >
            Payment Rejected
          </button>
        </div>
        <div
          className={`${
            isItemSelected?.isAdminApprovedPaymentStatus === "approved" &&
            isItemSelected?.isPaid
              ? "block"
              : "hidden"
          } flex justify-end`}
        >
          <button
            className="bg-[#5AB344] px-8 py-2 text-white shadow-lg rounded-full font-bold"
            type="button"
          >
            Payment Accepted
          </button>
        </div>
      </div>
    );
  };
  const acceptPaymentDetails = async (paymentStatus) => {
    try {
      const payload = {
        orderId: isItemSelected?.orderId,
        isAdminApprovedPaymentStatus: paymentStatus,
      };
      const result = await axiosInstance.post(
        "approvePendingTransaction",
        payload
      );
      setIsPaymentPopupOpen(false);
      vendorPayHistory();
      showGeneralMessage(result.message, "success");
    } catch (error) {
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;

      showGeneralMessage(errorMessage, "error");
    }
  };
  const csvPopUp = () => {
   
    return (
      <div className="bg-white w-[50%] relative z-50 flex flex-col gap-2 justify-between p-10 rounded-lg">
      <div
          className="flex justify-end text-[22px] font-bold text-[#5AB344] cursor-pointer"
          onClick={() => {
            setIsCsvPopupOpen(false)
          }}
        >
          X
        </div>
      <label htmlFor="startDate">Start Date:</label>
      <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} />

      <label htmlFor="endDate">End Date:</label>
      <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} />
      <button
            className="mt-5 bg-[#5AB344] px-8 py-2 text-white shadow-lg rounded-full font-bold"
            type="button"
            onClick={() => {
              csvDownloadEvent(venderId);
            }}
          >
            Accept
          </button>
    </div>
    );
  };
  return (
    <main className="flex flex-col ">
      <section className="lg:ml-[1%] h-full p-5 ">
        {isPaymentPopupOpen && (
          <div className=" bg-[#0000004d] absolute top-0 left-0 right-0 bottom-0 h-screen z-10 flex justify-center items-center">
            {openPopUp()}
          </div>
        )}
        <div
          id="NewRootRoot"
          className="flex flex-col w-full shadow bg-green-50"
        >
          <div className="flex-grow overflow-x-auto bg-white">
            <div class="px-8 pt-4 pb-4">
              <div class="flex gap-4 items-center">
                <div class="flex gap-4">
                  <p className="pt-3 pl-5 relative right-0 lg:max-w-sm">
                    Order Status
                  </p>
                  <select
                    value={filterOrderStatus}
                    onChange={filterByOrderStatus}
                    className=" text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance h-12 focus:border-indigo-600"
                  >
                    <option value="0">Pending Order</option>

                    <option value="all">All</option>
                    <option value="1">Accpted Order</option>
                    <option value="2">On the Way</option>
                    <option value="3">Arrived</option>
                    <option value="4">Scrap Picked</option>
                  </select>
                </div>
                <div class="flex gap-4">
                  <p className="pl-5 relative right-0 lg:max-w-sm">
                    Search By Order ID
                  </p>
                </div>
                <input
                  onChange={(e) => {
                    filetrOrderBySearch(e);
                  }}
                  type="text"
                  placeholder="Search By Order ID"
                  className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-3 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                 <div>
                {isCsvPopupOpen && (
                    <div className=" bg-[#0000004d] absolute top-0 left-0 right-0 bottom-0 h-screen z-10 flex justify-center items-center">
                      {csvPopUp()}
                    </div>
                  )}
                  <svg
                    viewBox="0 0 384 512"
                    fill="currentColor"
                    height="2em"
                    width="2em"
                    onClick={()=>{
                      setIsCsvPopupOpen(!isCsvPopupOpen);
                    }}
                    className="cursor-pointer"
                    >
                    
                    <path d="M64 0C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zm192 0v128h128L256 0zM80 224h16c22.1 0 40 17.9 40 40v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-4.4-3.6-8-8-8H80c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-8c0-8.8 7.2-16 16-16s16 7.2 16 16v8c0 22.1-17.9 40-40 40H80c-22.1 0-40-17.9-40-40v-80c0-22.1 17.9-40 40-40zm72 46.4c0-25.6 20.8-46.4 46.4-46.4H216c8.8 0 16 7.2 16 16s-7.2 16-16 16h-17.6c-7.9 0-14.4 6.4-14.4 14.4 0 5.2 2.8 9.9 7.2 12.5l25.4 14.5C231 305.7 240 321 240 337.7c0 25.6-20.8 46.4-46.4 46.4H168c-8.8 0-16-7.2-16-16s7.2-16 16-16h25.6c7.9 0 14.4-6.4 14.4-14.4 0-5.2-2.8-9.9-7.2-12.5l-25.4-14.5c-14.5-8.3-23.4-23.7-23.4-40.3zM280 240v31.6c0 23 5.5 45.6 16 66 10.5-20.3 16-42.9 16-66V240c0-8.8 7.2-16 16-16s16 7.2 16 16v31.6c0 34.7-10.3 68.7-29.6 97.6l-5.1 7.7c-3 4.5-8 7.1-13.3 7.1s-10.3-2.7-13.3-7.1l-5.1-7.7c-19.3-28.9-29.6-62.9-29.6-97.6V240c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="py-2 border-t inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="">
                  <thead>
                    <tr className="flex flex-row">
                      <th
                        scope="col"
                        className="pl-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-[100px] flex justify-center items-center "
                      >
                        SN. No
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 py-4 flex justify-center items-center w-[230px] "
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 flex justify-center items-center w-[130px] py-4"
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 flex justify-center items-center py-4 w-[170px] "
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 flex justify-center items-center py-4 w-[200px] "
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 flex justify-center items-center w-[130px] py-4"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 flex justify-center items-center w-[130px] py-4"
                      >
                        Vendor Payment Status
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 flex justify-center items-center w-[130px] py-4"
                      >
                        Admin Approved Status
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 flex justify-center items-center w-[200px] py-4"
                      >
                        Order Status
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 flex justify-center items-center w-[160px] py-4"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userOrder?.map((item, index) => (
                      <tr key={index} className="border-b flex flex-row">
                        <td className="pl-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900 w-[100px] ">
                          {index + 1}
                        </td>
                        <td className="py-4 pl-6 whitespace-nowrap text-sm text-center font-medium text-gray-900 w-[230px] ">
                        {new Date(item?.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 whitespace-nowrap text-sm  text-center font-medium text-gray-900 w-[130px]">
                          {item?.orderId}
                        </td>
                        <td className="text-sm font-medium text-gray-900 text-center pl-6 py-4 w-[170px] ">
                          {item?.fullName}
                        </td>
                        <td className="text-sm font-medium text-gray-900 text-center pl-6 py-4 w-[200px]">
                          {item?.dialCode} {item?.phoneNumber}
                        </td>
                        <td className="pl-6 text-sm font-medium text-gray-900 flex justify-center items-center w-[130px] py-4">
                          {item?.finalAmount}
                        </td>
                        <td
                          className={`pl-6 text-sm font-medium flex justify-center items-center w-[130px] py-4 ${
                            !item?.isPaid ? "text-red-500" : "text-green-500"
                          }`}
                        >
                          {item?.isPaid ? "Yes" : "No"}
                        </td>
                        <td
                          className={`pl-6 text-sm font-medium flex justify-center items-center w-[130px] py-4 ${
                            !item?.isAdminApprovedPaymentStatus
                              ? "text-red-500"
                              : item?.isAdminApprovedPaymentStatus ===
                                  "pending" ||
                                item?.isAdminApprovedPaymentStatus ===
                                  "rejected"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {item?.isAdminApprovedPaymentStatus
                            ? item?.isAdminApprovedPaymentStatus
                            : "No"}
                        </td>
                        <td className="pl-6 text-sm font-medium flex justify-center items-center w-[200px] py-4 text-[#1b3814]">
                          {OrdersRespEnum[item?.orderStatus]}
                        </td>
                        <td
                          className={`pl-6 text-sm font-medium flex justify-center items-center w-[160px] py-4 text-[#1b3814] ${
                            item?.isPaid ? "block" : "block"
                          }`}
                        >
                          <button
                            className="bg-[#5AB344] w-full py-2 text-white shadow-lg rounded-lg"
                            type="button"
                            onClick={() => {
                              setIsPaymentPopupOpen(true);
                              setIsItemSelected(item);
                            }}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <span className="text-xs xs:text-sm text-gray-900">
                Total Payment History : {totalItem}
              </span>
              <div>
                {console.log("pagination ", userOrder.length)}
                {userOrder && userOrder.length > 0 && (
                  <div className="pagination">
                    <span
                      onClick={() => selectPageHandler(page - 1)}
                      className={page > 1 ? "" : "pagination__disable"}
                    >
                      ◀
                    </span>

                    {Array.isArray(userOrder) &&
                      [...Array(Math.ceil(totalPageCount))].map((_, i) => {
                        return (
                          <span
                            key={i}
                            className={
                              page === i + 1 ? "pagination__selected" : ""
                            }
                            onClick={() => selectPageHandler(i + 1)}
                          >
                            {i + 1}
                          </span>
                        );
                      })}

                    <span
                      onClick={() => selectPageHandler(page + 1)}
                      className={
                        page < totalPageCount ? "" : "pagination__disable"
                      }
                    >
                      ▶
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Vendor_Payment_History;
