import { useEffect, useState } from "react";
import Header from "../Auth/Dashboard/Header";
import DashboardNav from "../Auth/Dashboard/Nav";
import {
  assignOrderToVendor,
  orderPendingAssignService,
} from "../Service/OrderService";
import axiosInstance from "../api-config/axiosInstance";
import Swal from "sweetalert2";

const PendingOrders = () => {
  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);
  const [selectedVendor, setSelectedVendor] = useState();
  const [checked, setChecked] = useState();
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const perPageCount = 10;
  const [totalItemCount, setTotalItemCount] = useState();
  const [order, setOrder] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
  const [isOrderIdSelected, setIsOrderIdSelected] = useState(0);
  const [orderRejectionReason, setOrderRejectionReason] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [page]);

  const fetchData = async (obj, ScrapName) => {
    try {
      const orders = await orderPendingAssignService(
        obj,
        page - 1,
        perPageCount,
        ScrapName
      );
      console.log("orders", orders);
      setOrder(orders.scrap);
      setTotalItemCount(orders.totalScrapCount);
      setTotalPageCount(Math.ceil(orders.totalScrapCount / perPageCount));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    console.log("ischeked data", e);
    setSelectedVendor(e.userId);
  };

  const handleAssign = async (orderId) => {
    console.log("orderId", orderId);
    try {
      const scrap = await assignOrderToVendor(selectedVendor.userId, orderId);
      console.log("Order Assign to vendor", scrap);
      if (scrap.statusCode === 200) {
        Swal.fire({
          icon: "success",
          position: "center",
          showConfirmButton: false,
          timer: 2500,
          title: "Successfully Assign Order",
        });
        fetchData();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const selectPageHandler = (selectedPage) => {
    console.log("selectPageHandler", order);
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPageCount &&
      selectedPage !== page
    ) {
      console.log("selectedPage", selectedPage);
      setPage(selectedPage);
    }
  };

  const filetrBySearch = async (event) => {
    console.log("serach event", event.target.value);
    // setSearchFilter(event.target.value);
    let obj = {};
    try {
      obj.key = event.target.value;
      // console.log("searchFilter", obj, filterOrderStatus);
      await fetchData(obj);
    } catch (error) {
      console.error("Search Error", error);
    }
  };

  const filetrScrapNameBySearch = async (event) => {
    console.log("serach event", event.target.value);
    // setSearchFilter(event.target.value);
    let ScrapName = {};
    try {
      ScrapName.key = event.target.value;
      // console.log("searchFilter", obj, filterOrderStatus);
      await fetchData(null, ScrapName);
    } catch (error) {
      console.error("Search Error", error);
    }
  };

  const onChange = (vend) => {
    setSelected((prev) => (vend === prev ? null : vend));
    setSelectedVendor(vend);
    console.log("selected Adddress ", selectedVendor);
  };

  const render = () => {
    return order?.map((item) => (
      <div className="block p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-md  hover:bg-gray-100 dark:border-gray-700 lg:mb-0">
        <card className=" p-8 w-[32rem]">
          <header className="flex font-light text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 rotate-90 -ml-2"
              viewBox="0 0 24 24"
              stroke="#b91c1c"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 12H4"
              />
            </svg>
            <p>Order ID : #{item.orderId}</p>
          </header>

          {/* <h2 className="font-bold text-3xl mt-2">
            Rapid Event Notification System at Netflix
          </h2> */}

          <div className="-mx-3 md:flex mb-6 mt-5">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Customers Name
              </label>

              <p className="text-red text-xs italic">
                {item?.addressInfo.fullName}
              </p>
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Address
              </label>
              <p className="text-red text-xs italic">
                {item?.addressInfo.address}
              </p>
            </div>
          </div>

          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Category
              </label>

              <p className="text-red text-xs italic">Scrap</p>
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Geography
              </label>
              <p className="text-red text-xs italic">
                {item?.addressInfo.city}
                {","}
                {item?.addressInfo.stateCode}
              </p>
            </div>
          </div>

          <h3 className="font-bold text-xl mt-8"> Closest Vendor </h3>

          <section className="container mx-auto p-1 font-mono">
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
              <div className="w-full overflow-x-auto md:overflow-y-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-sm font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                      <th className="px-4 py-3">Name/profile</th>
                      <th className="px-4 py-3">City</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Select</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {item.vendors?.map((vend) => (
                      <tr className="text-gray-700">
                        <td className="px-4 py-3 border">
                          <div className="flex items-center text-sm">
                            <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                              <img
                                className="object-cover w-full h-full rounded-full"
                                src={vend.profileUrl}
                                alt=""
                                loading="lazy"
                              />
                              <div
                                className="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              ></div>
                            </div>
                            <div>
                              <p className="font-semibold text-black">
                                {vend?.firstName} {vend.lastName}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold border">
                          {vend.city}
                          <p>PinCode - {vend.pincode}</p>
                        </td>
                        <td className="px-4 py-3 text-xs border">
                          <span
                            className={
                              !vend.isActive
                                ? "mx-auto bg-[#D10000] text-white py-1 px-2 rounded-full text-xs"
                                : "mx-auto bg-[#5AB344] text-white py-1 px-2 rounded-full text-xs"
                            }
                          >
                            {!vend.isActive ? "offline" : " online"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm border">
                          <input
                            type="checkbox"
                            checked={vend === selected}
                            onChange={() => onChange(vend)}
                            className="w-[18px] h-[18px] bg-[#5AB344] mr-2 translate-y-1 cursor-pointer"
                            value={checked}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <div className="text-right">
            <button
              onClick={() => {
                setIsRejectPopupOpen(true);
                setIsOrderIdSelected(item.orderId);
              }}
              className="rounded-3xl  bg-white-600 text-[#343434] border border-[#343434] font-semibold py-2 px-5 text-sm mt-6 inline-flex items-center group"
            >
              <p>Reject </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 group-hover:translate-x-2 delay-100 duration-200 ease-in-out"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button
              onClick={() => handleAssign(item.orderId)}
              className="bg-[#3CB043] rounded-3xl ml-5 text-white font-semibold py-2 px-5 text-sm mt-6 inline-flex items-center group"
            >
              <p>Assign Order</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 group-hover:translate-x-2 delay-100 duration-200 ease-in-out"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </card>
      </div>
    ));
  };
  const renderRejectPopUp = () => {
    const handleRejection = async () => {
      const payload = {
        orderId: isOrderIdSelected,
        rejectionReason: orderRejectionReason,
      };
      const result = await axiosInstance.post("rejectOrder", payload);
      if(result?.data?.success){
        fetchData();
        setIsRejectPopupOpen(false);
      }
      console.log("result", result);
      console.log("ordee", orderRejectionReason, isOrderIdSelected);
    };
    return (
      <div className="bg-white w-[40%] rounded-lg p-7 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="font-bold">Rejection Reason :</p>
          <textarea
            rows="4"
            className="border-[1px] border-black w-full rounded-md px-2 py-1"
            onChange={(e) => {
              setOrderRejectionReason(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-end gap-5">
          <button
            className="bg-red-500 px-8 py-2 text-white shadow-lg rounded-full font-bold"
            type="button"
            onClick={() => {
              setIsRejectPopupOpen(false);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-[#5AB344] px-8 py-2 text-white shadow-lg rounded-full font-bold"
            type="button"
            onClick={handleRejection}
          >
            Submit
          </button>
        </div>
      </div>
    );
  };
  return (
    <>
      <main className="bg-slate-100">
        <DashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
        <Header handleNavClick={handleVendorNav} showNav={vendorNav} />

        <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[10%] sm-[10%] h-full relative">
          {isRejectPopupOpen && (
            <div className="bg-[#0000004d] absolute top-0 left-0 right-0 bottom-0 h-screen z-10 flex justify-center items-center">
              {renderRejectPopUp()}
            </div>
          )}
          <div className="mt-10 p-6 lg:grid lg:grid-cols-2 lg:gap-8 bg-white  shadow-lg m-10">
            <div className="block p-6 mb-6   lg:mb-0">
              <h3 className="mb-2 text-2xl font-bold tracking-tight text-[#343434] dark:text-white">
                New Pickup Alert
              </h3>
            </div>
            <div className="block p-6 mb-6    lg:mb-0">
              <form className="flex flex-col  justify-end  md:flex-row gap-3">
                <div className="flex">
                  <input
                    onChange={(e) => {
                      filetrBySearch(e);
                    }}
                    type="text"
                    placeholder="Search"
                    className="w-full md:w-80 px-3 h-10 rounded-l border-2  focus:outline-none f"
                  />
                </div>
                <div className="flex">
                  <input
                    onChange={(e) => {
                      filetrScrapNameBySearch(e);
                    }}
                    type="text"
                    placeholder="Search By Scrap Name"
                    className="w-full md:w-80 px-3 h-10 rounded-l border-2  focus:outline-none f"
                  />
                </div>
                {/* <select
                  id="pricingType"
                  name="pricingType"
                  className="max-w-sm h-10 border-2 border-[#95989A80] focus:outline-none  text-[#95989A80] rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
                >
                  <option value="All" selected="">
                    Location
                  </option>
                </select> */}
              </form>
            </div>
          </div>

          <div className="mt-15 p-6 lg:grid lg:grid-cols-2 lg:gap-20 gap-20">
            {render()}
          </div>
          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
            <span className="text-xs xs:text-sm text-gray-900">
              Total Pending Orders : {totalItemCount}
            </span>
            <div>
              {console.log("pagination ", order.length)}
              {order && order.length > 0 && (
                <div className="pagination">
                  <span
                    onClick={() => selectPageHandler(page - 1)}
                    className={page > 1 ? "" : "pagination__disable"}
                  >
                    ◀
                  </span>

                  {Array.isArray(order) &&
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
        </section>
      </main>
    </>
  );
};

export default PendingOrders;
