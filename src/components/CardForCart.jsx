import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/actions/addCart";
import { modifieItemInCart } from "../redux/actions/modifyItem";

const CardForCart = ({ item, index }) => {
  const dispatch = useDispatch();
  const cart = useSelector((s) => s.cart);

  //storing properties into variables
  const { id, brand, sku } = item;
  const description = item?.description;
  const product = item?.productName;
  const Clasification = item?.clasification;

  //**prices**
  const costUSDMiami = item?.costUSDMiami;
  const fiveToTenPrice = item?.price5to10;
  const elevenToTwentyFivePrice = item?.price11to25;
  const twentySixToFiftyPrice = item?.price26to50;
  const priceWesco = item?.priceWesco;
  const quantity = item?.quantity;

  //** truncate with .. */

  const [truncate, setTruncate] = useState(true);
  const changeTruncate = () => {
    setTruncate(!truncate);
  };

  const truncatedProduct =
    product && product.length > 20 && truncate ? (
      <div onClick={changeTruncate}>
        {product.slice(0, 20)}
        <span>...</span>
      </div>
    ) : (
      product
    );

  const truncateDescription =
    description && description.length > 20 && truncate ? (
      <div onClick={changeTruncate}>
        {description.slice(0, 20)}
        <span>...</span>
      </div>
    ) : (
      description
    );

  const truncateSku =
    sku && sku.length > 20 && truncate ? (
      <div onClick={changeTruncate}>
        {sku.slice(0, 20)}
        <span>...</span>
      </div>
    ) : (
      sku
    );


  const [inputQuantity, setInputQuantity] = useState(quantity);
  const isItemInCart = cart.some((cartItem) => cartItem.id === item.id);
  const handleQuantityChange = (event) => {
    const value = Math.min(Math.max(parseInt(event.target.value) || 1, 1), 500);
    setInputQuantity(value);
  };
  const toggleSelected = () => {
    dispatch(modifieItemInCart({ ...item, quantity: inputQuantity }));
  };



  const ver = () => {
   toggleSelected()
  };


  return (
    <>
      <button onClick={() => ver()}>VER</button>
      <tr key={id} className={isItemInCart ? "bg-yellow-100" : ""}>
        <td>
          {" "}
          <button onClick={toggleSelected}>{index + 1} </button>
        </td>

        <td>{brand}</td>
        <td className="col-description cursor-pointer">{Clasification}</td>
        <td className="col-description cursor-pointer">
          {truncateDescription}
        </td>

        {/* quantity */}
        <td className="col-model cursor-pointer">
          <input
            type="number"
            min="1"
            max="500"
            value={inputQuantity}
            onChange={handleQuantityChange}
            className="custom-number-input"
          />
        </td>

        <td className="col-model cursor-pointer">{truncatedProduct}</td>
        <td className="col-model cursor-pointer">{truncateSku}</td>
        <td>{costUSDMiami && "$" + costUSDMiami}</td>
        <td>{fiveToTenPrice && "$" + fiveToTenPrice}</td>
        <td>{elevenToTwentyFivePrice && "$" + elevenToTwentyFivePrice}</td>
        <td>{twentySixToFiftyPrice && "$" + twentySixToFiftyPrice}</td>
        <td>{priceWesco && "$" + priceWesco}</td>
      </tr>
    </>
  );
};

export default CardForCart;
