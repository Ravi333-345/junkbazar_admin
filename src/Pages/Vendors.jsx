import { useEffect, useState } from "react";
import DashboardNav from "../Auth/Dashboard/Nav";
import Header from "../Auth/Dashboard/Header";
import { useNavigate } from "react-router-dom";
import { vendorService } from "../Service/Vendor";

const Vendors = () => {
  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);
  const [vendorList, setVendorList] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const perPageCount = 10;
  const navigate = useNavigate();
  const [totalItemCount, setTotalItemCount] = useState();
  const [filterPhoneNumber, setFilterPhoneNuber] = useState();
  const [filterValue, setFilterValue] = useState();

  const placeholderImage =
    "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp";
  const onImageError = (e) => {
    e.target.src = placeholderImage;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [page]);

  const fetchData = async (obj, phoneNumber, pincode) => {
    try {
      const response = await vendorService(
        obj,
        page - 1,
        perPageCount,
        phoneNumber,
        pincode
      );

      setVendorList(response.vendor);
      console.log("Customer list response", response.vendor);
      setTotalItemCount(response.totalScrapCount);
      setTotalPageCount(Math.ceil(response.totalScrapCount / perPageCount));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDetails = (item) => {
    console.log("Vendor DEtails", item);
    navigate("/VendorDetails", {
      state: {
        item,
      },
    });
  };
  const selectPageHandler = (selectedPage) => {
    console.log("selectPageHandler", vendorList);
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
      setFilterValue(obj);
      // console.log("searchFilter", obj, filterOrderStatus);
      await fetchData(obj, filterPhoneNumber);
    } catch (error) {
      console.error("Search Error", error);
    }
  };

  const filterByPhoneNumber = async (event) => {
    console.log("serach event", event.target.value);
    // setSearchFilter(event.target.value);
    let phoneNumber = {};

    try {
      phoneNumber = event.target.value;
      console.log("searchFilter", filterValue, phoneNumber);
      setFilterPhoneNuber(phoneNumber);
      await fetchData(filterValue, phoneNumber);
    } catch (error) {
      console.error("Search Error", error);
    }
  };

  const filterByPincode = async (event) => {
    console.log("serach event", event.target.value);
    // setSearchFilter(event.target.value);
    let pincode = {};

    try {
      pincode = parseInt(event.target.value);
      console.log("searchFilter", filterValue, filterPhoneNumber, pincode);
      await fetchData(filterValue, filterPhoneNumber, pincode);
    } catch (error) {
      console.error("Search Error", error);
    }
  };

  const renderData = () => {
    return vendorList?.map((item) => (
      <tr className="even:bg-[#FAFAFA] ">
        <td className="px-5 py-5   text-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10">
              <img
                className="w-full h-full rounded-full"
                src={item.profileUrl ? item.profileUrl : placeholderImage}
                alt=""
                onError={onImageError}
              />
            </div>
            <div className="ml-3">
              <p className="text-gray-900 whitespace-no-wrap">
                {item.firstName ? item.firstName : "N/A"} {item.lastName}
              </p>
            </div>
          </div>
        </td>
        <td className="px-5 py-5   text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {item.city ? item.city : "N/A"}
          </p>
        </td>
        <td className="px-5 py-5   text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {item.dialCode} {item.phoneNumber ? item.phoneNumber : "N/A"}
          </p>
        </td>
        <td className="px-5 py-5   text-sm">
          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden
              className="absolute inset-0  opacity-50 rounded-full"
            ></span>
            <span className="relative">
              {item.address ? item.address : "--/--"}
            </span>
          </span>
        </td>
        <td className="px-5 py-5 mx-auto   ">
          <p
            className={
              item.verified
                ? "mx-auto bg-[#5AB344] text-white py-1 px-2 rounded-full text-xs"
                : "mx-auto bg-[#D10000] text-white py-1 px-2 rounded-full text-xs"
            }
          >
            {item.isActive ? "online" : "offline"}
          </p>
        </td>
        <td className="px-5 py-5 mx-auto  ">
          <p
            className={
              (item?.verified.toLowerCase()==="approved")
                ? "mx-auto bg-[#5AB344] text-white py-1 px-2 rounded-full text-xs"
                :(item?.verified.toLowerCase()==="pending")?"mx-auto bg-[#F0E68C] text-black  py-1 px-2 rounded-full text-xs": "mx-auto bg-[#D10000] text-white py-1 px-2 rounded-full text-xs"
            }
          >
            {item.verified}
          </p>
        </td>
        <td className="px-5 py-5   text-sm">
          <p
            className={` whitespace-no-wrap ${
              item?.platformFee ? "text-red-500" : "text-gray-900"
            } `}
          >
            {item.platformFee ? -item.platformFee.toFixed(2) : "0.0"}
          </p>
        </td>
        <td className="px-5 py-5   text-sm">
          <button
            className="border border-slate-400 p-2"
            onClick={() => handleDetails(item)}
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

        <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[5%] sm-[10%] h-full ">
          <div className="mt-8 p-5  bg-white  shadow-lg m-10">
            <div className="block mb-2  lg:mb-0">
              <h3 className="mb-2 text-2xl font-bold tracking-tight text-[#343434]">
                Vendors:-
              </h3>
            </div>
            <div class="">
              <div class="flex gap-4">
                <input
                  onChange={(e) => {
                    filetrOrderBySearch(e);
                  }}
                  type="text"
                  placeholder="Search "
                  className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                <input
                  onChange={(e) => {
                    filterByPhoneNumber(e);
                  }}
                  type="text"
                  placeholder="Search By Phone Number"
                  className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
              <div class="my-3 flex gap-4">
                <input
                  onChange={(e) => {
                    filterByPincode(e);
                  }}
                  type="text"
                  placeholder="Search By Pincode"
                  className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-white  shadow-lg mx-10 mb-10 mt-5 p-5">
            <div className="-mx-4 -mt-5 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
              <table className="min-w-full border-none">
                <thead className="bg-[#EBFFDD] ">
                  <tr>
                    <th className="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Verified
                    </th>
                    <th className="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Platform Fee
                    </th>
                    <th className="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>{renderData()}</tbody>
              </table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-900">
                  Total Vendors : {totalItemCount}
                </span>
                <div>
                  {console.log("pagination ", vendorList.length)}
                  {vendorList && vendorList.length > 0 && (
                    <div className="pagination">
                      <span
                        onClick={() => selectPageHandler(page - 1)}
                        className={page > 1 ? "" : "pagination__disable"}
                      >
                        ◀
                      </span>

                      {Array.isArray(vendorList) &&
                        [...Array(Math.ceil(totalPageCount))].map((_, i) => {
                          {
                            console.log("pagination 178", vendorList.length);
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
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Vendors;
