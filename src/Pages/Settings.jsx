const Settings = () => {
    return (
        <div id="NewRootRoot" className="flex flex-row w-full items-start">
            <div className="bg-white flex flex-col gap-12 w-full font-['Gilroy-Medium'] items-start pt-20 pb-16 px-10 rounded-lg">
                <div className="bg-[#ebffdd] flex flex-col gap-8 w-full items-start pt-8 pb-12 px-32 rounded-[36px]">
                    <div className="flex flex-col gap-1 w-1/4 items-start">
                        <div className="text-center text-3xl font-['Gilroy-Bold'] tracking-[0.12] text-[#4a4a4a]">
                            Setting
                        </div>
                        <div className="text-center tracking-[0.12] text-[#707070]">
                            Real time information about your account
                        </div>
                    </div>
                    <div className="flex flex-col ml-1 gap-6 w-full items-start">
                        <div className="flex flex-row justify-between w-full items-start">
                            <div className="flex flex-row gap-4 w-1/5 items-start">
                                <img
                                    src="https://file.rendit.io/n/j8gn4M46sK0NA7dOT1mH.png"
                                    alt="Ellipse"
                                    id="Ellipse"
                                />
                                <div className="flex flex-col mt-8 gap-1 w-1/2 font-['Gilroy-Light'] items-start">
                                    <div className="text-lg font-['Gilroy-Medium'] text-[#343434]">
                                        Ragesh Sahim
                                    </div>
                                    <div className="text-center text-base leading-[19.4px] text-[#4a4a4a] ml-px">
                                        Admin
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row mt-8 gap-4 w-1/4 font-['Gilroy-Medium'] items-start">
                                <div className="text-center text-sm tracking-[0.12] text-[#4a4a4a] shadow-[0px_3px_3px_0px_rgba(0,_0,_0,_0.25)] bg-white flex flex-row w-3/5 h-12 items-start pt-4 px-3 rounded-lg">
                                    Upload New Picture
                                </div>
                                <div className="text-center text-sm tracking-[0.12] text-[#4a4a4a] shadow-[0px_3px_3px_0px_rgba(0,_0,_0,_0.25)] bg-[rgba(182,_182,_182,_0.45)] flex flex-row w-20 h-12 items-start pt-4 px-4 rounded-lg">
                                    Delete
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row ml-4 gap-6 w-3/4 font-['Gilroy-Medium'] items-start">
                            <div className="flex flex-col gap-6 w-1/2 items-start">
                                <div className="relative flex flex-row ml-px pl-1 w-1/4 items-start">
                                    <div className="text-xl font-['Gilroy-SemiBold'] text-[#343434] absolute top-0 left-0 h-6 w-24">
                                        Full Name
                                    </div>
                                    <div className="text-center text-sm tracking-[0.12] text-[#707070] relative mt-6">
                                        Edit your name
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-full items-start">
                                    <div className="text-[#343434] ml-px">First Name</div>
                                    <div className="text-center text-sm tracking-[0.12] text-[rgba(112,_112,_112,_0.5)] shadow-[0px_3px_3px_0px_rgba(0,_0,_0,_0.25)] bg-white flex flex-row w-full h-12 items-start pt-4 px-5 rounded-lg">
                                        First Name
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mt-10 gap-8 w-1/2 items-start">
                                <div className="text-[#343434] ml-1">Last Name</div>
                                <div className="shadow-[0px_3px_3px_0px_rgba(0,_0,_0,_0.25)] bg-white w-full h-12 rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex flex-row w-full items-start">
                    <img
                        src="https://file.rendit.io/n/vU97AZiOwJKMso5YvfKo.svg"
                        alt="Akariconsedit"
                        id="Akariconsedit"
                        className="w-5 h-5 absolute top-12 left-[146px]"
                    />
                    <div className="bg-[#ebffdd] relative flex flex-col gap-12 w-full font-['Gilroy-Bold'] items-start pt-10 pb-20 px-[147px] rounded-[36px]">
                        <div className="flex flex-col ml-0 gap-8 w-3/4 h-[212px] items-start">
                            <div className="text-center text-3xl tracking-[0.12] text-[#4a4a4a] ml-px">
                                Privacy and Security
                            </div>
                            <div className="flex flex-col mb-1 gap-px w-1/5 font-['Gilroy-Medium'] items-start">
                                <div className="text-lg font-['Gilroy-SemiBold'] text-[#343434]">
                                    Modify Password
                                </div>
                                <div className="text-center text-xs tracking-[0.12] text-[#707070] ml-px">
                                    Modify your current password
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 w-full font-['Gilroy-Medium'] items-start">
                                <div className="text-base text-[#343434] ml-px">
                                    Current Password
                                </div>
                                <div className="flex flex-row gap-6 w-full items-start">
                                    <div className="text-center text-lg tracking-[0.12] text-[#707070] shadow-[0px_3px_3px_0px_rgba(0,_0,_0,_0.25)] bg-white flex flex-row mt-px w-1/2 h-10 items-start pt-1 px-6 rounded-lg">
                                        *************
                                    </div>
                                    <div className="text-center text-lg tracking-[0.12] text-[#707070] shadow-[0px_3px_3px_0px_rgba(0,_0,_0,_0.25)] bg-white flex flex-row w-1/2 h-10 items-start pt-1 px-6 rounded-lg">
                                        ***************
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between gap-6 w-5/6 font-['Gilroy-SemiBold'] items-start">
                            <div className="flex flex-col gap-5 w-full items-start">
                                <div className="relative flex flex-row w-16 items-start">
                                    <div className="text-center text-xs font-['Gilroy-Medium'] tracking-[0.12] text-[#707070] absolute top-6 left-px h-4 w-16">
                                        Lists of roles
                                    </div>
                                    <div className="text-2xl text-[#343434] relative mb-3">Roles</div>
                                </div>
                                <div className="flex flex-row justify-between ml-px w-full font-['Gilroy-Medium'] items-start">
                                    <div className="text-lg text-[#343434]">Author</div>
                                    <div className="flex flex-row justify-between w-2/3 items-start">
                                        <div className="text-lg text-[#707070]">Vijay Rahul</div>
                                        <div className="flex flex-row justify-between w-1/2 items-start">
                                            <div className="text-lg text-[#707070] mb-px">0 User</div>
                                            <div className="flex flex-row justify-between mt-1 w-20 items-start">
                                                <img
                                                    src="https://file.rendit.io/n/BnQofLk2Pk4a6LrTCwSO.svg"
                                                    alt="Materialsymbolslightdeleteoutline1"
                                                    className="w-4"
                                                />
                                                <img
                                                    src="https://file.rendit.io/n/fvHHX1loDMZQnYs0OYxG.svg"
                                                    alt="Iconamooncopythin1"
                                                    id="Iconamooncopythin1"
                                                    className="w-5"
                                                />
                                                <img
                                                    src="https://file.rendit.io/n/yUOYLhlZ0JiHcNYnZun7.svg"
                                                    alt="Circumedit1"
                                                    id="Circumedit1"
                                                    className="w-4"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between ml-px w-full font-['Gilroy-Medium'] items-start">
                                <div className="text-lg text-[#343434] mt-px">Editors</div>
                                <div className="flex flex-row gap-48 w-2/3 items-start">
                                    <div className="text-lg text-[#707070] mt-px mr-2">
                                        Vikhram Walia
                                    </div>
                                    <div id="User1" className="text-lg text-[#707070] mt-px">
                                        1{"  "}
                                        User
                                    </div>
                                    <div className="flex flex-row justify-between w-20 items-start">
                                        <img
                                            src="https://file.rendit.io/n/BnQofLk2Pk4a6LrTCwSO.svg"
                                            alt="Materialsymbolslightdeleteoutline"
                                            className="w-4"
                                        />
                                        <img
                                            src="https://file.rendit.io/n/fvHHX1loDMZQnYs0OYxG.svg"
                                            alt="Iconamooncopythin"
                                            id="Iconamooncopythin"
                                            className="w-5"
                                        />
                                        <img
                                            src="https://file.rendit.io/n/yUOYLhlZ0JiHcNYnZun7.svg"
                                            alt="Circumedit"
                                            id="Circumedit"
                                            className="w-4"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row ml-px gap-48 w-full font-['Gilroy-Medium'] items-start">
                                <div className="text-lg text-[#343434] mt-1 mr-3">Super Admins</div>
                                <div className="text-lg text-[#707070] mt-1 mr-3">Hina Khurana</div>
                                <div className="text-lg text-[#707070] mt-1">1 User</div>
                                <div className="flex flex-row justify-between w-20 items-start">
                                    <img
                                        src="https://file.rendit.io/n/BnQofLk2Pk4a6LrTCwSO.svg"
                                        alt="Materialsymbolslightdeleteoutline2"
                                        className="w-4"
                                    />
                                    <img
                                        src="https://file.rendit.io/n/fvHHX1loDMZQnYs0OYxG.svg"
                                        alt="Iconamooncopythin2"
                                        id="Iconamooncopythin2"
                                        className="w-5"
                                    />
                                    <img
                                        src="https://file.rendit.io/n/yUOYLhlZ0JiHcNYnZun7.svg"
                                        alt="Circumedit2"
                                        id="Circumedit2"
                                        className="w-4"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Settings