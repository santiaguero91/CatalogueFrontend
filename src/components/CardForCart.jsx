import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifieItemInCart } from "../redux/actions/modifyItem";

const CardForCart = ({ item, index, activeCheckbox }) => {
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
    dispatch(modifieItemInCart({ ...item, totalPrice: finalItemsPrice }));
  };


  /* calculateTotal */

  const [finalItemsPrice, setFinalItemsPrice] = useState(null);

  const calculateTotal = () => {
    switch (activeCheckbox) {
      case "costUSDMiami":
        return inputQuantity * costUSDMiami;
      case "fiveToTenPrice":
        return fiveToTenPrice;
      case "priceWesco":
      default:
        return inputQuantity * priceWesco;
    }
  };

  useEffect(() => {
    if (inputQuantity !== null && calculateTotal() !== null) {
      setFinalItemsPrice(calculateTotal());
    } else {
      setFinalItemsPrice(null);
    }
  }, [inputQuantity, calculateTotal]);

  useEffect(() => {
    dispatch(modifieItemInCart({ ...item, totalPrice: finalItemsPrice }));
  }, [finalItemsPrice]);

  return (
    <>
      <tr key={id}>
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
        <td>{costUSDMiami !== null ? `$${costUSDMiami.toFixed(2)}` : ""}</td>
        <td>
          {fiveToTenPrice !== null ? `$${fiveToTenPrice.toFixed(2)}` : ""}
        </td>
        <td>
          {elevenToTwentyFivePrice !== null
            ? `$${elevenToTwentyFivePrice.toFixed(2)}`
            : ""}
        </td>
        <td>
          {twentySixToFiftyPrice !== null
            ? `$${twentySixToFiftyPrice.toFixed(2)}`
            : ""}
        </td>
        <td>{priceWesco !== null ? `$${priceWesco.toFixed(2)}` : ""}</td>
        <td>
        {finalItemsPrice !== null ? `$${finalItemsPrice.toFixed(2)}` : ""}
      </td>      
      
      </tr>
    </>
  );
};

export default CardForCart;
