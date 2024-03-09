import React, {
    useEffect, useState
} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../api-config/config";
import axiosInstance from "../../api-config/axiosInstance";
import DashboardNav from "../../Auth/Dashboard/Nav";
import Header from "../../Auth/Dashboard/Header";
import { Loader } from "semantic-ui-react";

const AddScrap = () => {

    const [vendorNav, setVendorNav] = useState(false);
    const handleVendorNav = () => setVendorNav(true);
    const closeVendorNav = () => setVendorNav(false);
    const [message, setMessage] = useState('');

    // const handleChange = event => {
    //     const result = event.target.value.replace(/[^a-z]/gi, '');

    //     setMessage(result);
    //   };

    const options = [

        { label: 'Kilogram', value: 'KG' },

        { label: 'per/piece', value: 'per/piece' },

    ];

    const checkAuthority = () => {
        const token = localStorage.getItem("token");

        if (token === '' || token === undefined || token == null) {
            navigate("/sign-in");
        }
    }
    const navigate = useNavigate();
    const [value, setValue] = React.useState('fruit');

    const [scrapName, setScrapName] = useState("");
    const [quantityType, setquantityType] = useState("");
    const [loader, setLoading] = useState(true);
    const [preview, setPreview] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [imageKey, setImageKey] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        checkAuthority();
    }, []);


    const token = localStorage.getItem("token");

    const headers = {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        platform: "web"
    };


    const handleImage = async (e) => {
        setLoading(true);
        const file = e.target.files[0];
        const previewUrl = URL.createObjectURL(file);

        setPreview(previewUrl);
        const payload = {
            ContentType: file.type,
            fileName: file.name,
            uploadType: "SCRAP"
        };


        try {
            const signedUrl = await axios.post(`${serverUrl}/generateS3UploadSignedUrl`, payload, {
                headers: headers
            });

            const imageSignedObj = JSON.parse(signedUrl.data.data);

            setImageKey(imageSignedObj.key);


            const uploadResponse = await fetch(imageSignedObj.signedUrl, {
                body: file,
                headers: {
                    "Content-Type": file.type // Set the Content-Type header based on the image type
                },
                method: "PUT"
            });

            console.log("uploadResponse", uploadResponse);
        }
        catch (error) {
            console.error("Error fetching data:", error);

            if (error.response.status === 401) {
                const data = error.response;
                console.log("error more", data)
                // If server responded with a status code for a request  
                Swal.fire({
                    icon: "error",
                    position: "center",
                    showConfirmButton: false,
                    timer: 2500,
                    title: data.data.error
                });
                navigate("/sign-in");
            }
            else if (error.request) {
                // Client made a request but response is not received 
                console.log("<<<<<<<Response Not Received>>>>>>>>");
                console.log(error.request);
            }
            else {
                // Other case 
                console.log("Error", error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    // useEffect to log imageKey when it changes
    useEffect(() => {
    }, [imageKey]);

    const [formValues, setFormValues] = useState({
        scrapName: "",
        price: "",

        quantity: "",

    });
    const uploadData = async () => {


        const dataPayload = {

            scrapName: formValues.scrapName,
            price: parseInt(formValues.price),
            quantityType: quantityType,
            imageKey: imageKey,

        };


        try {
            const resp = await axiosInstance.post("/addScrap", dataPayload);
            const data = resp.data;
            if (data.statusCode === 200) {
                Swal.fire({
                    icon: "success",
                    position: "center",
                    showConfirmButton: false,
                    timer: 2500,
                    title: resp.data.message
                });
                setFormValues({
                    scrapName: "",
                    price: "",
                    quantityType: "",
                    quantity: "",
                });
                setImageKey("")
                setquantityType("")
                setPreview("")
            }
            return data;
        } catch (error) {

            console.error("Error fetching data:", error);
            if (error.response) {
                // If server responded with a status code for a request  
                Swal.fire({
                    icon: "error",
                    position: "center",
                    showConfirmButton: false,
                    timer: 2500,
                    title: "Something Went Wrong"
                });
            }
            else if (error.request) {
                // Client made a request but response is not received 
                console.log(error.request);
            }
            else {
                // Other case 
                console.log("Error", error.message);
            }
        }




    };

    return (
        <>
            <main>
                <DashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
                <Header
                    handleNavClick={handleVendorNav}
                    showNav={vendorNav}
                />
                <section className="lg:ml-[18%]  md:pt-[23%] lg:pt-[5%] bg-green-50 h-full ">
                    <div className="w-full flex justify-center  p-4 md:mt-[150px] sm:mt-[20px] ">


                        <div className="w-full md:w-[50%] mb-4 md:mb-0 bg-white shadow-lg p-[20px]">
                            <div className="w-[100%] p-[10px]">
                                <h1 className="text-[45px] font-bold text-black text-center">
                                    Upload Scrap
                                </h1>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <div>
                                    <label className="block py-3 text-black">Enter Scrap Name</label>
                                    <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                        <input
                                            value={formValues.scrapName}

                                            onChange={(e) =>
                                                setFormValues({ ...formValues, scrapName: e.target.value.replace(/[^\w\s]/gi, '') })
                                            }
                                            placeholder="Enter Scrap Name"
                                            className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-6 sm:col-span-3 mt-5">
                                <div >
                                    <label className="block py-3 text-black">
                                        Select quantity type
                                    </label>
                                    <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                        <div className="w-full">
                                            <select className="w-full border-slate-50" value={quantityType} onChange={(e) => setquantityType(e.target.value)}>
                                                <option value="">Select Quantity Type</option>
                                                {options.map((option) => (
                                                    <option value={option.value}>{option.label}</option>
                                                ))}

                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="grid grid-cols-1 gap-4">
                                    
                                    <div >
                                        <label className="block py-3 text-black">
                                            Enter  Quantity
                                        </label>
                                        <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                            <input
                                                type="number" inputMode="number"
                                                value={formValues.quantity}
                                                onChange={(e) =>
                                                    setFormValues({ ...formValues, quantity: e.target.value })
                                                }
                                                placeholder="Enter Available Quantity"
                                                className="w-full pr-3 p-1 ml-3 text-black outline-none bg-transparent"
                                            />
                                        </div>
                                    </div>
                                </div> */}

                            </div>
                            <div className="col-span-6 sm:col-span-3 mt-5">
                                <div>
                                    <label className="block py-3 text-black">Enter Price</label>
                                    <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                        <input
                                            type="number" inputMode="number"
                                            value={formValues.price}
                                            onChange={(e) =>
                                                setFormValues({ ...formValues, price: e.target.value })
                                            }
                                            placeholder="Enter Price"
                                            className="w-full pr-3 p-1 ml-3 text-black outline-none bg-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 col-span-6 sm:col-span-3 ">
                                <label className="" htmlFor="">
                                    Upload Scrap image
                                </label>
                                <div className="relative">
                                    <label
                                        htmlFor="pix"
                                        className="mt-5 cursor-pointer block bg-[#80d7421c] border border-gray-300 hover:border-gray-400 rounded-md p-4 text-center"
                                    >

                                        {preview ? (

                                            <img
                                                src={preview}
                                                alt="scrap"
                                                className="mx-auto h-32 object-cover rounded-md mb-4"
                                            />
                                        ) : (
                                            <span className="text-gray-500 mb-4">Upload Scrap Image</span>
                                        )}
                                    </label>
                                    <input
                                        id="pix"
                                        type="file"
                                        className="hidden "
                                        onChange={handleImage}
                                    />
                                </div>
                            </div>
                            <br />

                            <br />
                            <div className="col-span-6 sm:col-span-3 mt-5">
                                <button
                                    onClick={uploadData}
                                    className="w-full h-[50px] text-white font-extrabold bg-[#81D742] rounded-[30px]"
                                >
                                    {loader ? "Image Uploading Wait ..." : "Confirm"}
                                </button>
                            </div>


                        </div>
                    </div>

                </section>
            </main>
        </>

    );
};

export default AddScrap;
