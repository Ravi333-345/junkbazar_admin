import { useEffect, useState } from "react";
import Header from "../Auth/Dashboard/Header";
import DashboardNav from "../Auth/Dashboard/Nav";
import axiosInstance from "../api-config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { scrapService } from "../Service/ScrapService";
import { customerService } from "../Service/CustomerService";

const Customers = () => {
  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);
  const [customer, setCustomerList] = useState([]);

  const [totalPageCount, setTotalPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const perPageCount = 10;
  const [totalItemCount, setTotalItemCount] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCustomerData();
  }, [page]);

  const fetchCustomerData = async (obj) => {
    try {
      const response = await customerService(obj, page - 1, perPageCount);
      setCustomerList(response.users);
      setTotalItemCount(response.totalScrapCount);
      setTotalPageCount(Math.ceil(response.totalScrapCount / perPageCount));
      console.log("Customer list response", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCustomer = (item) => {
    navigate("/CustomerDetails", {
      state: {
        item,
      },
    });
  };

  const selectPageHandler = (selectedPage) => {
    console.log("selectPageHandler", customer);
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPageCount &&
      selectedPage !== page
    ) {
      console.log("selectedPage", selectedPage);
      setPage(selectedPage);
    }
  };

  const filetrOrderBySearch = async (event) => {
    console.log("serach event", event.target.value);
    // setSearchFilter(event.target.value);
    let obj = {};
    try {
      obj.key = event.target.value;
      // console.log("searchFilter", obj, filterOrderStatus);
      await fetchCustomerData(obj);
    } catch (error) {
      console.error("Search Error", error);
    }
  };

  const renderData = () => {
    return customer?.map((item) => (
      <tr className="even:bg-[#FAFAFA] ">
        <td class="px-5 py-5   text-sm">
          <div class="flex items-center">
            <div class="flex-shrink-0 w-10 h-10">
              <img
                class="w-full h-full rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                alt=""
              />
            </div>
            <div class="ml-3">
              <p class="text-gray-900 whitespace-no-wrap">
                {item.firstName ? item.firstName : "N/A"} {item.lastName}
              </p>
            </div>
          </div>
        </td>
        <td class="px-5 py-5   text-sm">
          <p class="text-gray-900 whitespace-no-wrap">
            {item.city ? item.city : "N/A"}
          </p>
        </td>
        <td class="px-5 py-5   text-sm">
          <p class="text-gray-900 whitespace-no-wrap">
            {item.dialCode} {item.phoneNumber ? item.phoneNumber : "XXXXXXXXX0"}
          </p>
        </td>
        <td class="px-5 py-5   text-sm">
          <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden
              class="absolute inset-0  opacity-50 rounded-full"
            ></span>
            <span class="relative">
              {item.address ? item.address : "--/--"}
            </span>
          </span>
        </td>
        <td class="px-5 py-5   text-sm">
          <p
            className={
              item.verified
                ? "mx-auto bg-[#5AB344] text-white py-1 px-2 rounded-full text-xs"
                : "mx-auto bg-[#D10000] text-white py-1 px-2 rounded-full text-xs"
            }
          >
            {item.isActive ? "Active" : "InActive"}
          </p>
        </td>
        <td class="px-5 py-5   text-sm">
          <button
            onClick={() => handleCustomer(item)}
            className="border border-slate-400 p-2"
          >
            Details
          </button>
        </td>
      </tr>
    ));
  };
  return (
    <>
      <main>
        <DashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
        <Header handleNavClick={handleVendorNav} showNav={vendorNav} />

        <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[10%] sm-[10%] h-full ">
          <div class="mt-10 p-6 lg:grid lg:grid-cols-2 lg:gap-8 bg-white  shadow-lg m-10">
            <a href="#" class="block p-6 mb-6   lg:mb-0">
              <h3 class="mb-2 text-2xl font-bold tracking-tight text-[#343434] dark:text-white">
                Customers
              </h3>
            </a>
            <a href="#" class="block p-6 mb-6    lg:mb-0">
              <form class="flex flex-col justify-end d md:flex-row gap-3">
                <div class="flex">
                  <input
                    onChange={(e) => {
                      filetrOrderBySearch(e);
                    }}
                    type="text"
                    placeholder="Search "
                    class="w-full md:w-80 px-3 h-10 rounded-l border-2  focus:outline-none f"
                  />
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
            </a>
          </div>

          <div className="bg-white  shadow-lg m-10 p-5">
            <div class="-mx-4 -mt-5 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
              <table class="min-w-full border-none">
                <thead className="bg-[#EBFFDD] ">
                  <tr>
                    <th class="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th class="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      City
                    </th>
                    <th class="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th class="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Address
                    </th>
                    <th class="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th class="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>{renderData()}</tbody>
              </table>
              <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span class="text-xs xs:text-sm text-gray-900">
                  Total Customers : {totalItemCount}
                </span>
                <div>
                  {console.log("pagination ", customer.length)}
                  {customer && customer.length > 0 && (
                    <div className="pagination">
                      <span
                        onClick={() => selectPageHandler(page - 1)}
                        className={page > 1 ? "" : "pagination__disable"}
                      >
                        ◀
                      </span>

                      {Array.isArray(customer) &&
                        [...Array(Math.ceil(totalPageCount))].map((_, i) => {
                          {
                            console.log("pagination 178", customer.length);
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

              {/* <div class="flex items-center justify-center">
                <div class="py-3 border rounded-lg dark:border-gray-600">
                  <ol class="flex items-center text-sm text-gray-500 divide-x rtl:divide-x-reverse divide-gray-300 dark:text-gray-400 dark:divide-gray-600">
                    <li>
                      <button
                        onClick={() => selectPageHandler(page - 1)}
                        type="button"
                        class="relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500 dark:hover:bg-gray-400/5 transition text-yellow-600"
                        aria-label="Previous"
                        rel="prev"
                      >
                        <svg
                          class="w-5 h-5 rtl:scale-x-[-1]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </li>
                    {Array.isArray(customer) &&
                      [...Array(Math.ceil(totalPageCount))].map((_, i) => {
                        {
                          console.log("pagination 178", customer.length);
                        }
                        return (
                          <li>
                            <button
                              type="button"
                              class="relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none transition text-yellow-600 focus:underline bg-yellow-500/10 ring-2 ring-yellow-500"
                            >
                              <span
                                key={i}
                                className={
                                  page === i + 1 ? "pagination__selected" : ""
                                }
                                onClick={() => selectPageHandler(i + 1)}
                              >
                                {i + 1}
                              </span>
                            </button>
                          </li>
                        );
                      })}

                    <li>
                      <button
                        onClick={() => selectPageHandler(page + 1)}
                        type="button"
                        class="relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500 dark:hover:bg-gray-400/5 transition text-yellow-600"
                        aria-label="Next"
                        rel="next"
                      >
                        <svg
                          class="w-5 h-5 rtl:scale-x-[-1]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </li>
                  </ol>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Customers;
