import { useEffect, useState } from "react";
import Header from "../Auth/Dashboard/Header";
import DashboardNav from "../Auth/Dashboard/Nav";
import axiosInstance from "../api-config/axiosInstance";
import {
  assignOrderToVendor,
  orderPendingService,
} from "../Service/OrderService";

const Orders = () => {
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
  const [filter, setFilter] = useState();
  const [scrapNamefilter, setScrapName] = useState();
  const [orderIdFilter, setOrderFilter] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchOrders();
  }, [page]);

  const fetchOrders = async (obj, ScrapName, orderId) => {
    try {
      const orders = await orderPendingService(
        obj,
        page - 1,
        perPageCount,
        ScrapName
      );

      setOrder(orders.scrap);
      console.log("Customer list response", orders);
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
      await fetchOrders(obj, scrapNamefilter, orderIdFilter);
      setFilter(obj);
    } catch (error) {
      console.error("Search Error", error);
    }
  };

  const filetrByOrderId = async (event) => {
    console.log("serach event", event.target.value);
    // setSearchFilter(event.target.value);
    let orderId = {};
    try {
      orderId = event.target.value;
      setOrderFilter(orderId);
      // console.log("searchFilter", obj, filterOrderStatus);
      await fetchOrders(filter, scrapNamefilter, orderId);
    } catch (error) {
      console.error("Search Error", error);
    }
  };

  const filetrScrapNameBySearch = async (event) => {
    console.log("serach event", event.target.value);
    // setSearchFilter(event.target.value);
    let ScrapName = {};
    try {
      ScrapName = event.target.value;
      setScrapName(ScrapName);
      // console.log("searchFilter", obj, filterOrderStatus);
      await fetchOrders(filter, ScrapName, orderIdFilter);
    } catch (error) {
      console.error("Search Error", error);
    }
  };

  const render = () => {
    return order?.map((item) => (
      <div className=" p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-md  hover:bg-gray-100 dark:border-gray-700 lg:mb-0">
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

          {/* <h3 className="font-bold text-xl mt-8"> Closest Vendor </h3> */}

          {/* <section className="container mx-auto p-1 font-mono">
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
                                src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
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
                                {vend.firstName
                                  ? vend.firstName
                                  : "Vendor Name"}
                              </p>
                              <p className="text-xs text-gray-600">
                                {vend.lastName ? vend.lastName : "Vendor Name"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold border">
                          {vend.city}
                        </td>
                        <td className="px-4 py-3 text-xs border">
                          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                            {" "}
                            onlinem{" "}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm border">
                          <input
                            type="checkbox"
                            onChange={() => handleChange(vend)}
                            classNamename="w-[18px] h-[18px] bg-[#5AB344] mr-2 translate-y-1 cursor-pointer"
                            value={checked}
                            handleChange={() =>
                              setChecked((prevState) => !prevState)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section> */}

          {/* <div classNameName="text-right">
            <button className="rounded-3xl  bg-white-600 text-[#343434] border border-[#343434] font-semibold py-2 px-5 text-sm mt-6 inline-flex items-center group">
              <p>Cancel </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-1 group-hover:translate-x-2 delay-100 duration-200 ease-in-out"
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
              class="bg-[#3CB043] rounded-3xl ml-5 text-white font-semibold py-2 px-5 text-sm mt-6 inline-flex items-center group"
            >
              <p>Assign Order</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-1 group-hover:translate-x-2 delay-100 duration-200 ease-in-out"
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
          </div> */}
        </card>
      </div>
    ));
  };

  return (
    <>
      <main className="bg-slate-100">
        <DashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
        <Header handleNavClick={handleVendorNav} showNav={vendorNav} />
        <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[10%] sm-[10%] h-full ">
          <div class="mt-10 p-6 lg:grid lg:grid-cols-2 lg:gap-8 bg-white  shadow-lg m-10">
            <div className="block p-6 mb-2  lg:mb-0">
              <h3 className="mb-2 text-2xl font-bold tracking-tight text-[#343434] dark:text-white">
                Orders:-
              </h3>
            </div>
            <form class="flex flex-col  justify-end  md:flex-row gap-3">
              <div class="p-8">
                <div class="flex gap-4">
                  <input
                    onChange={(e) => {
                      filetrBySearch(e);
                    }}
                    type="text"
                    placeholder="Search "
                    class="w-full md:w-80 px-3 h-10 rounded-l border-2  focus:outline-none f"
                  />
                  <input
                    onChange={(e) => {
                      filetrByOrderId(e);
                    }}
                    type="text"
                    placeholder="Search By Order ID"
                    class="w-full md:w-80 px-3 h-10 rounded-l border-2  focus:outline-none f"
                  />
                </div>
                <div class="my-6 flex gap-4">
                  <input
                    onChange={(e) => {
                      filetrScrapNameBySearch(e);
                    }}
                    type="text"
                    placeholder="Search By Scrap Name"
                    class="w-full md:w-80 px-3 h-10 rounded-l border-2  focus:outline-none f"
                  />
                </div>
              </div>

              {/* <select
                  id="pricingType"
                  name="pricingType"
                  class="max-w-sm h-10 border-2 border-[#95989A80] focus:outline-none  text-[#95989A80] rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
                >
                  <option value="All" selected="">
                    Location
                  </option>
                </select> */}
            </form>
          </div>

          <div class="mt-15 p-6 lg:grid lg:grid-cols-2 lg:gap-20 gap-20">
            {render()}
          </div>
          <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
            <span class="text-xs xs:text-sm text-gray-900">
              Total Orders : {totalItemCount}
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
                      {
                        console.log("pagination 178", order.length);
                      }
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

export default Orders;
