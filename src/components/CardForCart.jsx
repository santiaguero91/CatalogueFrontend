import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifieItemInCart } from "../redux/actions/modifyItem";
import deleteitem from "../../src/cross-svg.svg"
import { addItemToCart } from "../redux/actions/addCart";

const CardForCart = ({ item, index, activeCheckbox }) => {
  const dispatch = useDispatch();
  const cart = useSelector((s) => s.cart);

  //**storing properties into variables**
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

  /* calculateTotal */
  const [finalItemsPrice, setFinalItemsPrice] = useState(null);

  const calculateTotal = () => {
    switch (activeCheckbox) {
      case "costUSDMiami":
        return inputQuantity * costUSDMiami;
      case "pricePartner":
        if (inputQuantity < 5) {
          // aca cambiar si se calcula price wesco o price MIAMI
          return inputQuantity * priceWesco;
          // return inputQuantity * costUSDMiami;
        } else if (inputQuantity >= 5 && inputQuantity <= 10) {
          return inputQuantity * fiveToTenPrice;
        } else if (inputQuantity >= 11 && inputQuantity <= 25) {
          return inputQuantity * elevenToTwentyFivePrice;
        } else if (inputQuantity >= 26 && inputQuantity <= 50) {
          return inputQuantity * twentySixToFiftyPrice;
        } else {
          return 0;
        }
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

   const ver =()=>{
    console.log("");
    <button onClick={()=>ver()}>VER</button>
   }

   const toggleSelected = () => {
    dispatch(addItemToCart({ item }));
  };
  return (
    <>
      <tr key={id}>
      <td>
          <img
            src={deleteitem} 
            alt="Add to Cart"
            onClick={toggleSelected}
            style={{ cursor: "pointer" }}
            className="w-3 h-3"

          />
        </td>
        <td>{brand}</td>
        <td className="col-description cursor-pointer">{Clasification}</td>
        <td className="col-description cursor-pointer">
          {truncateDescription}
        </td>
        <td className="col-model cursor-pointer">{truncatedProduct}</td>
        <td className="col-model cursor-pointer">{truncateSku}</td>
        {/* quantity */}
        <td className="col-model cursor-pointer">
          <input
            type="number"
            min="1"
            max="500"
            value={inputQuantity}
            onChange={handleQuantityChange}
            className="custom-number-input border border-black p-1 rounded-md"
            />
        </td>


        {/* <td>{costUSDMiami !== null ? `$${costUSDMiami.toFixed(2)}` : ""}</td> 
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
        </td> */}
        <td>{priceWesco !== null ? `$${priceWesco.toFixed(2)}` : ""}</td>
        <td>
        {finalItemsPrice !== null ? `$${finalItemsPrice.toFixed(2)}` : ""}
      </td>      
      
      </tr>
    </>
  );
};

export default CardForCart;
