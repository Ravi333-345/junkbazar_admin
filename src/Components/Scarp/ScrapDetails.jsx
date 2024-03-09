import { useState } from "react";
import Header from "../../Auth/Dashboard/Header";
import DashboardNav from "../../Auth/Dashboard/Nav";
import { useLocation } from "react-router-dom";

const ScrapDetails = () => {
  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);
  const location = useLocation();
  const scrapDetails = location.state.item;
  const placeholderImage =
    "https://play-lh.googleusercontent.com/93TI5hqzUF7_i61dah3PexL9DktIgsExTutymOXUkd7hdjlSx1P-3ZE0T-uZ2bnF5MXq";
  const onImageError = (e) => {
    e.target.src = placeholderImage;
  };

  return (
    <main>
      <DashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
      <Header handleNavClick={handleVendorNav} showNav={vendorNav} />
      <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[15%] bg-green-50 h-full ">
        <section className="mx-5 border-2 r mb-2 block  md:max-w-[600px] md:mx-auto">
          <div class="bg-white overflow-hidden shadow rounded-lg border">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Scrap Details
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500"></p>
            </div>

            <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl class="sm:divide-y sm:divide-gray-200">
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Scrap ID</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    # {scrapDetails.scrapId}
                  </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <p className="text-sm font-medium text-gray-500">
                    Scrap Image
                  </p>
                  <img
                    src={
                      scrapDetails.docUrl
                        ? scrapDetails.docUrl
                        : placeholderImage
                    }
                    alt="scarp"
                    className=" cursor-pointer"
                    onError={onImageError}
                  />
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Scrap Name</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {scrapDetails.scrapName}
                  </dd>
                </div>

                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Quantity Type
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {scrapDetails.quantityType}
                  </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Price</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {scrapDetails.price}
                  </dd>
                </div>
                {/* <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Quantity</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {scrapDetails.quantity}
                  </dd>
                </div> */}
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Created Date
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {scrapDetails.createdAt}
                  </dd>
                </div>

                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Updated Date
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {scrapDetails.updatedAt}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default ScrapDetails;
