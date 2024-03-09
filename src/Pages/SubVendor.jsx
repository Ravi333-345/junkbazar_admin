import { useEffect, useState } from "react";
import Header from "../Auth/Dashboard/Header";
import DashboardNav from "../Auth/Dashboard/Nav";
import { useNavigate } from "react-router-dom";
import "react-responsive-modal/styles.css";
import AddSubVendor from "../Components/SubVendor/addSubVendor";
import { Modal } from "react-responsive-modal";
import { subVendorService } from "../Service/Vendor";
import noData from "../assets/PNG/no-data.png";

const SubVendor = () => {
  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);
  const [vendorList, setVendorList] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const perPageCount = 10;
  const [totalItemCount, setTotalItemCount] = useState();

  const placeholderImage =
    "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp";
  const onImageError = (e) => {
    e.target.src = placeholderImage;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [page]);

  const fetchData = async (obj) => {
    try {
      const response = await subVendorService(obj, page - 1, perPageCount);

      setVendorList(response.vendor);
      console.log("Customer list response", response);
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
    let obj = {};
    try {
      obj.key = event.target.value;
      await fetchData(obj);
    } catch (error) {
      console.error("Search Error", error);
    }
  };

  const renderData = () => {
    return vendorList?.map((item) => (
      <tr className="even:bg-[#FAFAFA] ">
        <td class="px-5 py-5   text-sm">
          <div class="flex items-center">
            <div class="flex-shrink-0 w-10 h-10">
              <img
                class="w-full h-full rounded-full"
                src={item.profileUrl ? item.profileUrl : placeholderImage}
                alt=""
                onError={onImageError}
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
            {item.dialCode} {item.phoneNumber ? item.phoneNumber : "XXXXXXXX00"}
          </p>
        </td>
        <td class="px-5 py-5   text-sm">
          <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden
              class="absolute inset-0  opacity-50 rounded-full"
            ></span>
            <span class="relative">{item.address ? item.address : "N/A"}</span>
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
              item.verified
                ? "mx-auto bg-[#5AB344] text-white py-1 px-2 rounded-full text-xs"
                : "mx-auto bg-[#D10000] text-white py-1 px-2 rounded-full text-xs"
            }
          >
            {item.verified ? "Verify" : "UnVerify"}
          </p>
        </td>
        <td className="px-5 py-5   text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {item.platformFee ? item.platformFee : "0.0"}
          </p>
        </td>
        <td class="px-5 py-5   text-sm">
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

        <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[10%] sm-[10%] h-full ">
          <div class="mt-10 p-6 lg:grid lg:grid-cols-2 lg:gap-8 bg-white  shadow-lg m-10">
            <div class="block p-6 mb-6   lg:mb-0">
              <h3 class="mb-2 text-2xl font-bold tracking-tight text-[#343434] dark:text-white">
                Sub Vendor Details
              </h3>
            </div>
            <div class="block p-6 mb-6    lg:mb-0">
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
              </form>
            </div>
          </div>

          <div class="mt-10 p-6 lg:grid lg:grid-cols-2 lg:gap-8 bg-white  shadow-lg m-10">
            <div class="block p-6 mb-6   lg:mb-0">
              <h3 class="mb-2 text-2xl font-bold tracking-tight text-[#343434] dark:text-white"></h3>
            </div>
            <div class="block   justify-end   lg:mb-0">
              <div class="flex flex-col items-end justify-end md:flex-row ">
                <div class="block relative ml-5">
                  <div
                    onClick={onOpenModal}
                    className="inline-block px-12 py-2 text-sm font-medium text-white bg-[#5AB344] border bg-[#5AB344] rounded active:text-[#5AB344] hover:bg-transparent hover:text-[#5AB344] cursor-pointer focus:outline-none focus:ring"
                  >
                    Add Sub Vendor
                  </div>
                  <Modal open={open} onClose={onCloseModal} center>
                    <AddSubVendor />
                  </Modal>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white  shadow-lg m-10 p-5">
            <div class="-mx-4 -mt-5 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
              {vendorList && vendorList.length > 0 ? (
                <>
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
                        <th className="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Verified
                        </th>
                        <th className="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Platform Fee
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
                      Total Sub Venders : {totalItemCount}
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
                            [...Array(Math.ceil(totalPageCount))].map(
                              (_, i) => {
                                {
                                  console.log(
                                    "pagination 178",
                                    vendorList.length
                                  );
                                }
                                return (
                                  <span
                                    key={i}
                                    className={
                                      page === i + 1
                                        ? "pagination__selected"
                                        : ""
                                    }
                                    onClick={() => selectPageHandler(i + 1)}
                                  >
                                    {i + 1}
                                  </span>
                                );
                              }
                            )}

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
                </>
              ) : (
                <div className="mx-auto">
                  <img
                    className="mx-auto w-[50]"
                    alt="No Data Found"
                    src={noData}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SubVendor;
