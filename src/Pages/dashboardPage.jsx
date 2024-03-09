import { useEffect, useState } from "react";
import DashboardNav from "../Auth/Dashboard/Nav";
import Header from "../Auth/Dashboard/Header";
import overview from "../assets/PNG/Overview.png";
import recent from "../assets/PNG/Recent Orders.png";
import axiosInstance from "../api-config/axiosInstance";

const DashboardPage = () => {
  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);
  const [dasboardData, setdashboardData] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/stats`);

      const resposeParsing = JSON.parse(response.data.data);
      setdashboardData(resposeParsing);
      console.log("dashboard data", resposeParsing);
      return resposeParsing;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <main className="">
        <DashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
        <Header handleNavClick={handleVendorNav} showNav={vendorNav} />
        <section className=" bg-slate-100 lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[10%] sm-[10%] h-full ">
          <div class="mt-12 p-10">
            <div class="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
              <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    class="w-6 h-6 text-white"
                  >
                    <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                      clip-rule="evenodd"
                    ></path>
                    <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                  </svg>
                </div>
                <div class="p-4 text-right">
                  <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Total Platform Fee
                  </p>
                  <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    ₹{" "}
                    {dasboardData?.platformFee
                      ? dasboardData?.platformFee
                      : "0"}
                  </h4>
                </div>
                {/* <div class="border-t border-blue-gray-50 p-4">
                  <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong class="text-green-500">+55%</strong>&nbsp;than last
                    week
                  </p>
                </div> */}
              </div>
              <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    class="w-6 h-6 text-white"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div class="p-4 text-right">
                  <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Total Users
                  </p>
                  <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    {dasboardData?.userCount ? dasboardData?.userCount : "0"}
                  </h4>
                </div>
                {/* <div class="border-t border-blue-gray-50 p-4">
                  <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong class="text-green-500">+3%</strong>&nbsp;than last
                    month
                  </p>
                </div> */}
              </div>
              <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    class="w-6 h-6 text-white"
                  >
                    <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                  </svg>
                </div>
                <div class="p-4 text-right">
                  <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Total Vendors
                  </p>
                  <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    {dasboardData?.vendorCount
                      ? dasboardData?.vendorCount
                      : "0"}
                  </h4>
                </div>
                {/* <div class="border-t border-blue-gray-50 p-4">
                  <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong class="text-red-500">-2%</strong>&nbsp;than
                    yesterday
                  </p>
                </div> */}
              </div>
              <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    class="w-6 h-6 text-white"
                  >
                    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                  </svg>
                </div>
                <div class="p-4 text-right">
                  <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Total Sale
                  </p>
                  <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    ₹{" "}
                    {dasboardData?.totalPlatformSale
                      ? dasboardData?.totalPlatformSale
                      : "0"}
                  </h4>
                </div>
                {/* <div class="border-t border-blue-gray-50 p-4">
                  <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong class="text-green-500">+5%</strong>&nbsp;than
                    yesterday
                  </p>
                </div> */}
              </div>
            </div>
          </div>

          <div className="bg-white  shadow-lg m-10 p-5">
            <div class="-mx-4 -mt-5 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
              <div class=" min-w-full  overflow-hidden">
                <table class="min-w-full border-none">
                  <thead className="bg-[#EBFFDD] ">
                    <tr className="rounded">
                      <th class="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ID
                      </th>
                      <th class="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        NAME
                      </th>
                      <th class="px-5 py-3  text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        CATEGORY
                      </th>
                      <th class="px-5 py-3 0 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        PRICE
                      </th>
                      <th class="px-5 py-3  text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        KILOGRAM
                      </th>
                      <th class="px-5 text-start py-3   text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        GEOGRAPHY
                      </th>
                      <th class="px-5 text-start py-3   text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        LOCATION
                      </th>
                      <th class="px-5 text-start py-3   text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        STATUS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="even:bg-[#FAFAFA] ">
                      <td class="px-5 py-5   text-sm">
                        <p class="text-[#707070] whitespace-no-wrap">#23</p>
                      </td>
                      <td class="px-5 py-5  text-sm">
                        <p class="text-[#707070] whitespace-no-wrap">
                          Sahim Adar
                        </p>
                      </td>
                      <td class="px-5 py-5   text-sm">
                        <p class="text-[#707070] whitespace-no-wrap">Plastic</p>
                      </td>
                      <td class="px-5 py-5  text-sm">
                        <p class="text-[#707070] whitespace-no-wrap">₹234</p>
                      </td>
                      {/* <td class="px-5 py-5  text-sm">
                        <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            class="absolute inset-0  opacity-50 rounded-full"
                          ></span>
                          <span class="relative">-23kg</span>
                        </span>
                      </td> */}
                      <td class="px-5 py-5  text-sm">
                        <p class="text-[#707070] whitespace-no-wrap">
                          Delhi, Inidia
                        </p>
                      </td>
                      <td class="px-5 py-5  text-sm">
                        <p class="text-[#707070] whitespace-no-wrap">
                          456, New street, Delhi, India
                        </p>
                      </td>

                      <td class="px-5 py-5  text-sm">
                        <p class="text-[#707070] whitespace-no-wrap">Online</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <div
                                    class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                                    <span class="text-xs xs:text-sm text-gray-900">
                                        Total Scrap : 
                                    </span>
                                    <div class="inline-flex mt-2 xs:mt-0">
                                        <PaginationComponent

                                          
                                        />
                                    </div>
                                </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default DashboardPage;
