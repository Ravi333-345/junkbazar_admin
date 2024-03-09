/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React from "react";
import {
    useDispatch, useSelector 
} from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert2
// import Button from "./Button";
// import Input from "./Input";

import {
    serverUrl
} from "../../api-config/config";
import {
    addToCart, removeFromCart 
} from "../../redux/user/userSlice";
import {
    useParams 
} from "react-router-dom";

const PriceCardComponent = () => {
    const {
        id 
    } = useParams();
    const dispatch = useDispatch();
    const itemsInCart = useSelector((state) => state.cart);
    const singleItem = itemsInCart.filter((el) => el._id === id);

    const [ response,
        setResponse ] = React.useState(null);

    React.useEffect(() => {
        window.scrollTo(0, 0);
        (async () => {
            try {
                const result = await serverUrl.get("/item");
                const responseData = result?.data;

                setResponse(responseData);
            }
            catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
    
        // Show SweetAlert2 message
        Swal.fire({
            icon: "success",
            text: `${item.name} has been added to your cart.`,
            title: "Item Added to Cart!"
        });
    };

    const renderData = () => {
        return response?.map((item) => (
            <div className="">
                <div key={item?._id} className="">
                    <div className="pricing-card shadow-md relative shadow-black/20 w-full lg:w-[100px] h-[430px] lg:m-5 rounded-sm p-2  cursor-pointer">
                        <div className="flex flex-col">
                            <div className="flex justify-center items-center">
                                <img src={item?.image} alt="" className="w-44" />
                            </div>
                            <div className="flex flex-col justify-center items-center mt-3">
                                <p className="text-2xl text-zinc-500 mb-3">{item?.name}</p>
                                <div className="text-2xl text-zinc-500 flex flex-col justify-center items-center w-full ">
                                    <p> Address: {item?.address}</p>
                                    <p className="mt-2">kg: {item?.kilogram}</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-5 left-24">
                            {/* <Button
                label="Add"
                classname="pricing-btn"
                onClick={() => handleAddToCart(item)}
              /> */}
                            <button
                                onClick={() => handleAddToCart(item)}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-[30px]"
                            >
                Add To Cart
                            </button>
                            {/* {itemsInCart.some((cartItem) => cartItem._id === item._id) ? (
                <>
                  <Input classname="pricing-input" />
                  <p className="qty">qty</p>
                  <Button
                    label="Remove from Cart"
                    classname="pricing-btn"
                    onClick={() => handleRemoveFromCart(item)}
                  />
                </>
              ) : null} */}
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {renderData()}
        </div>
    );
};

export default PriceCardComponent;
