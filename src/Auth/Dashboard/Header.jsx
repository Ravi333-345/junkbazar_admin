import location_icon from "../../assets/SVG/dashboard/location.svg";
import menu from "../../assets/SVG/dashboard/jam_menu.svg";
import { useEffect, useState } from "react";
import axiosInstance from "../../api-config/axiosInstance";
import { Link } from "react-router-dom";

const Header = ({ showNav, handleNavClick }) => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/getCurrentUser");
      const data = JSON.parse(response.data.data);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <nav>
      <main className="ml-[18%] lg:flex justify-between shadow-md h-[10%] items-center px-3 py-10 fixed top-0 right-0 left-0 bg-white mb-[20%] hidden z-50">
        <section>
          <div className="flex pl-4"></div>
        </section>
        <section className="flex px-2 items-center h-full justify-center w-1/3">
          <aside className="flex mr-1 items-center ml-1">
            <aside className="mr-2">
              <Link to="/Vendors">
                <span className="text-sm font-semibold ml-7">
                  {userData?.balance}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-6 mr-4 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                  />
                </svg>
              </Link>
            </aside>
            <span className="text-neutral-700 font-normal font-['Gilroy-Regular']">
              Junkbazar
              <span className="flex">
                <img
                  src={location_icon}
                  alt="location_icon"
                  className=" w-4 mr-.5 cursor-pointer"
                />
                <p className="text-center text-neutral-600  font-normal font-['Gilroy-Regular'] leading-[15.18px]">
                  India
                </p>
              </span>
            </span>
          </aside>
        </section>
      </main>

      {/* Mobile Nav */}

      <div
        className={
          showNav
            ? "fixed top-0 left-0 w-screen h-screen bg-black/80 backdrop-blur-lg z-40 duration-700 overflow-y-scroll overflow"
            : "fixed top-full left-0 w-screen h-screen bg-black/80 backdrop-blur-lg z-40 duration-700 overflow-y-scroll delay-700 overflow"
        }
      ></div>

      {/* Your navigation content goes here */}

      <main className="lg:hidden relative z-30">
        <section className="p-2 md:p-3 fixed top-0 right-0 left-0 bg-white">
          <aside className="flex justify-between items-center">
            <div className="flex">
              <img
                src=""
                alt="user_img"
                className="mr-1 md:mr-4 w-12 md:w-[4.5rem] cursor-pointer rounded-full"
              />
              <span>
                <p className="font-semibold text-lg md:text-2xl md:mb-.5">
                  Hi Junkbazar
                </p>
                <div className="flex mr-1">
                  <img
                    src={location_icon}
                    alt="location_icon"
                    className="w-4 md:w-7 cursor-pointer"
                  />
                  <p className="font-semibold text-base md:text-xl">India</p>
                </div>
              </span>
            </div>

            <div className="">
              <span className="flex mr-3">
                {/* <img
                  src={bell_icon_black}
                  alt="bell_icon"
                  className="mr-3 w-8 md:w-12 cursor-pointer"
                /> */}
                <img
                  src={menu}
                  alt="menu_icon"
                  className="w-12 md:w-[4.5rem] cursor-pointer"
                  onClick={handleNavClick}
                />
              </span>
            </div>
          </aside>
        </section>
        <aside className="bg-zinc-600 rounded-lg mt-20 md:mt-28 mx-3 p-3 absolute left-0 right-0 -z-30">
          <div className="flex justify-between items-center">
            <section>
              <h1 className="text-lg text-white font-bold">Admin </h1>
              <p className="text-white text-sm leading-none">You are online</p>
            </section>
            <section></section>
          </div>
        </aside>
      </main>
    </nav>
  );
};

export default Header;
