import { useSelector } from "react-redux";
import CardForCart from "../components/CardForCart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((s) => s.cart);
  const navigateToHome = () => {
    navigate("/");
  };

  /* activeCheckbox */
  const [activeCheckbox, setActiveCheckbox] = useState("priceWesco");
  const handleCheckboxChange = (value) => {
    setActiveCheckbox(value);
  };

  // Calculate the total sum of the "totalPrice" property
  const totalSum = cart.reduce((sum, item) => {
    if (typeof item.totalPrice === "number") {
      return sum + item.totalPrice;
    }
    return sum;
  }, 0);

  const ver = () => {
    console.log();
  };

  return (
    <div>
      <button onClick={() => ver()}>VERCART</button>
      <button
        className="ml-2 p-2 px-4 rounded-md bg-[#073763] shadow-slate-600 text-slate-100 font-inter shadow-2xl box-border cursor-pointer"
        onClick={navigateToHome}
      >
        Go to Home
      </button>

      <div className="flex space-x-2 my-4">
        <button
          className={`p-2 px-4 rounded-md ${
            activeCheckbox === "costUSDMiami"
              ? "bg-[#073763] text-slate-100"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => handleCheckboxChange("costUSDMiami")}
        >
          Cost USD Miami
        </button>
        <button
          className={`p-2 px-4 rounded-md ${
            activeCheckbox === "fiveToTenPrice"
              ? "bg-[#073763] text-slate-100"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => handleCheckboxChange("fiveToTenPrice")}
        >
          Price Partner
        </button>
        <button
          className={`p-2 px-4 rounded-md ${
            activeCheckbox === "priceWesco"
              ? "bg-[#073763] text-slate-100"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => handleCheckboxChange("priceWesco")}
        >
          Price Wesco
        </button>
      
      
      </div>



      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Brand</th>
            <th>Clasification</th>
            <th className="w-1/3">Item & Description</th>
            <th>Product</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th
              onClick={() => handleSort("costUSDMiami")}
              className="cursor-pointer"
            >
              Cost USD Miami
            </th>
            <th
              onClick={() => handleSort("price5to10")}
              className="cursor-pointer"
            >
              Price Partner 5 - 10 sensors
            </th>
            <th
              onClick={() => handleSort("price11to25")}
              className="cursor-pointer"
            >
              Price Partner 11 - 25 sensors
            </th>
            <th
              onClick={() => handleSort("price26to50")}
              className="cursor-pointer"
            >
              Price Partner 26 - 50 sensors
            </th>
            <th
              onClick={() => handleSort("priceWesco")}
              className="cursor-pointer"
            >
              Price Wesco
            </th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart?.map((item, index) => {
            return (
              <CardForCart
                item={item}
                key={item?.id}
                index={index}
                activeCheckbox={activeCheckbox}
              />
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center ty-4">
        <h1 className="text-black font-bold text-md mr-2">Total Price:</h1>
        <span className="text-black">
          {totalSum !== null ? `$${totalSum.toFixed(2)}` : ""}
        </span>
      </div>
    </div>
  );
};

export default Cart;
