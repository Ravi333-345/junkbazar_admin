
import React, { useState, useEffect } from "react";
import DashboardNav from "./Nav";
import Header from "./Header";


const Dashboard = () => {
    const [vendorNav, setVendorNav] = useState(false);
    const handleVendorNav = () => setVendorNav(true);
    const closeVendorNav = () => setVendorNav(false);
    const [noScrap, setNoScrap] = useState(false);
    const [manageNavs, setManageNavs] = useState({
        showOrder: true,
        showHistory: false,
        showSettings: false,
        Pricing: false,
        AcceptOrder: false
    });
    const [renderer, setRenderer] = useState();

    useEffect(() => {
        if (manageNavs.showOrder) {

        }
        if (manageNavs.showHistory) {

        }
        if (manageNavs.showSettings) {

        }
        if (manageNavs.Pricing) {

        }
        if (manageNavs.AcceptOrder) {

        }
    }, [
        manageNavs.showHistory,
        manageNavs.showOrder,
        manageNavs.showSettings,
        manageNavs.Pricing,
        manageNavs.AcceptOrder,
        noScrap,
    ]);

    return (
        <main>
            <DashboardNav
                showNav={vendorNav}
                hideNav={closeVendorNav}
                onScrap={() => {
                    setNoScrap((prevState) => !prevState);
                    setManageNavs({
                        showHistory: false,
                        showOrder: true,
                        showSettings: false,
                        Pricing: false,
                        AcceptOrder: false
                    });
                }}
                showHistory={() =>
                    setManageNavs({
                        showSettings: false,
                        showHistory: true,
                        showOrder: false,
                        Pricing: false,
                        AcceptOrder: false
                    })
                }
                showSettings={() =>
                    setManageNavs({
                        showHistory: false,
                        showOrder: false,
                        showSettings: true,
                        Pricing: false,
                        AcceptOrder: false
                    })
                }
                Pricing={() =>
                    setManageNavs({
                        showHistory: false,
                        showOrder: false,
                        showSettings: false,
                        Pricing: true,
                        AcceptOrder: false
                    })
                }
                AcceptOrder={() =>
                    setManageNavs({
                        showHistory: false,
                        showOrder: false,
                        showSettings: false,
                        Pricing: false,
                        AcceptOrder: true
                    })
                }
            />
            <Header
                handleNavClick={handleVendorNav}
                showNav={vendorNav}
            />

            {renderer}
        </main>
    );
};

export default Dashboard;
