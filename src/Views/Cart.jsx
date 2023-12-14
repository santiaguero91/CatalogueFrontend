import { useSelector } from "react-redux";
import CardForCart from "../components/CardForCart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((s) => s.cart);
  const navigateToHome = () => {
    navigate("/"); // Navigate to the home page
  };
  return (
    <div>
      <button
        className="ml-2 p-2 px-4 rounded-md bg-[#073763] shadow-slate-600 text-slate-100 font-inter shadow-2xl box-border cursor-pointer"
        onClick={navigateToHome}
      >
        Go to Home
      </button>
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
                return <CardForCart item={item} key={item?.id} index={index} />;
              })} 
            </tbody>
          </table>
    </div> 
  );
};

export default Cart;