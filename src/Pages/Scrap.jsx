import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../Auth/Dashboard/Nav";
import Header from "../Auth/Dashboard/Header";
import "reactjs-popup/dist/index.css";
import axiosInstance from "../api-config/axiosInstance";
import "../style/Scrap.css";
import { scrapService } from "../Service/ScrapService";

const UploadScrap = () => {
  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);
  const navigate = useNavigate();
  const [scrapList, setScrapList] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const perPageCount = 10;
  const [totalItemCount, setTotalItemCount] = useState();

  const placeholderImage =
    "https://play-lh.googleusercontent.com/93TI5hqzUF7_i61dah3PexL9DktIgsExTutymOXUkd7hdjlSx1P-3ZE0T-uZ2bnF5MXq";
  const onImageError = (e) => {
    e.target.src = placeholderImage;
  };

  // useEffect to log imageKey when it changes
  useEffect(() => {}, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    scrapFind();
  }, [page]);

  const scrapFind = async (obj) => {
    try {
      const scrap = await scrapService(obj, page - 1, perPageCount);

      console.log("Scrap list ", scrap);
      setScrapList(scrap.scrap);
      setTotalItemCount(scrap.totalScrapCount);
      setTotalPageCount(Math.ceil(scrap.totalScrapCount / perPageCount));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (item) => {
    navigate("/editScrap", {
      state: {
        item,
      },
    });
  };

  const handleScrap = () => {
    navigate("/AddScrap");
  };

  const handleDetails = (item) => {
    console.log("item ", item);
    navigate("/ScrapDetails", {
      state: {
        item,
      },
    });
  };

  const filetrOrderBySearch = async (event) => {
    console.log("serach event", event.target.value);
    // setSearchFilter(event.target.value);
    let obj = {};
    try {
      obj.key = event.target.value;
      // console.log("searchFilter", obj, filterOrderStatus);
      await scrapFind(obj);
    } catch (error) {
      console.error("Search Error", error);
    }
  };

  const selectPageHandler = (selectedPage) => {
    console.log("selectPageHandler", scrapList);
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPageCount &&
      selectedPage !== page
    ) {
      console.log("selectedPage", selectedPage);
      setPage(selectedPage);
    }
  };

  const renderData = () => {
    return scrapList?.map((item) => (
      <tr className="even:bg-[#FAFAFA] ">
        <td class="px-5 py-5   text-sm">
          <p class="text-[#707070] whitespace-no-wrap">#{item.scrapId}</p>
        </td>
        <td class="px-5 py-5  text-sm">
          <div class="flex items-center">
            <div class="flex-shrink-0 w-10 h-10">
              <img
                class="w-full h-full rounded-full"
                src={item.docUrl ? item.docUrl : placeholderImage}
                alt=""
                onError={onImageError}
              />
            </div>
            <div class="ml-3">
              <p class="text-[#000000] whitespace-no-wrap">{item.scrapName}</p>
            </div>
          </div>
        </td>
        <td class="px-5 py-5   text-sm">
          <p class="text-[#707070] whitespace-no-wrap">{item.quantityType}</p>
        </td>
        <td class="px-5 py-5  text-sm">
          <p class="text-[#707070] whitespace-no-wrap">{item.price}</p>
        </td>
        {/* <td class="px-5 py-5  text-sm">
          <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden
              class="absolute inset-0  opacity-50 rounded-full"
            ></span>
           
          </span>
        </td> */}

        <td class="px-5 py-5  text-sm">
          <button
            className="border-2 p-2 border-[#95989A80]"
            onClick={(e) => handleDetails(item)}
          >
            Details
          </button>
          <button
            className="ml-2 p-2 border-2 border-[#95989A80]"
            onClick={(e) => handleEdit(item)}
          >
            Edit
          </button>
          {/* <button className="ml-2 p-2 border-2 border-[#95989A80]" onClick={(e) =>(item)}>
                        Delete
                    </button> */}
        </td>
      </tr>
    ));
  };

  return (
    <>
      <main className="bg-slate-100">
        <DashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
        <Header handleNavClick={handleVendorNav} showNav={vendorNav} />
        <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[10%] sm-[10%] h-full ">
          <div class="mt-10 p-6 lg:grid lg:grid-cols-2 lg:gap-8 bg-white  shadow-lg m-10">
            <div href="#" class="block p-6 mb-6   lg:mb-0">
              <h3 class="mb-2 text-2xl font-bold tracking-tight text-[#343434] dark:text-white">
                Scraps
              </h3>
            </div>
            <div href="#" class="block p-6 mb-6    lg:mb-0">
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

          <div class=" lg:grid lg:grid-cols-2 lg:gap-8 mr-10">
            <div class="block p-6    lg:mb-0">
              <h3 class="mb-2 text-2xl font-bold tracking-tight text-[#343434] dark:text-white"></h3>
            </div>
            <div class="block   justify-end   lg:mb-0">
              <form class="flex flex-col items-end justify-end md:flex-row ">
                <div class="block relative ml-5">
                  <button
                    onClick={handleScrap}
                    className="inline-block px-12 py-2 text-sm font-medium text-white bg-[#5AB344] border bg-[#5AB344] rounded active:text-[#5AB344] hover:bg-transparent hover:text-[#5AB344] cursor-pointer focus:outline-none focus:ring"
                  >
                    Add Scrap
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="bg-white  shadow-lg m-10 p-5">
            <div class="-mx-4 -mt-5 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
              <div class=" min-w-full  overflow-hidden">
                <table class="min-w-full border-none">
                  <thead className="bg-[#EBFFDD] ">
                    <tr className="rounded">
                      <th class="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Scrap ID
                      </th>
                      <th class="px-5 py-3   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Scrap Name
                      </th>
                      <th class="px-5 py-3  text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Quantity Type
                      </th>
                      <th class="px-5 py-3 0 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Price
                      </th>

                      <th class="px-5 text-start py-3   text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>{renderData()}</tbody>
                </table>
                <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                  <span class="text-xs xs:text-sm text-gray-900">
                    Total Scrap : {totalItemCount}
                  </span>
                  <div>
                    {console.log("pagination ", scrapList.length)}
                    {scrapList && scrapList.length > 0 && (
                      <div className="pagination">
                        <span
                          onClick={() => selectPageHandler(page - 1)}
                          className={page > 1 ? "" : "pagination__disable"}
                        >
                          ◀
                        </span>

                        {Array.isArray(scrapList) &&
                          [...Array(Math.ceil(totalPageCount))].map((_, i) => {
                            {
                              console.log("pagination 178", scrapList.length);
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
                  {/* <div class="inline-flex mt-2 xs:mt-0">
                    <PaginationComponent
                      totalPages={totalPages}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default UploadScrap;
