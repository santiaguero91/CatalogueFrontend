import { useState } from "react";
import { useSelector } from "react-redux";

const Card = ({ item, index }) => {
  const seePrices = useSelector((s) => s.seePricesChecked);


  //storing properties into variables
  const { id, brand, sku } = item;
  const description = item?.description;
  const product = item?.productName;
  const outdoorIndoor = item?.outdoorIndoor;
  const measuringRange = item?.measuringRange;
  const useCase = item?.useCase;
  const Clasification = item?.clasification;

  //**prices**
  const costUSDMiami = item?.costUSDMiami;
  const fiveToTenPrice = item?.price5to10;
  const elevenToTwentyFivePrice = item?.price11to25;
  const twentySixToFiftyPrice = item?.price26to50;
  const priceWesco = item?.priceWesco;

  const accuracy = item?.accuracy;
  const resolution = item?.resolution;
  const output = item?.["Output"];
  const powerSupply = item?.powerSupply;
  const operatingTemperature = item?.operatingTemperature;
  const operatingHumidity = item?.operatingHumidity;

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

  const truncateUseCase =
  useCase && useCase.length > 20 && truncate ? (
      <div onClick={changeTruncate}>
        {useCase.slice(0, 20)}
        <span>...</span>
      </div>
    ) : (
      useCase
    );


  const truncateType =
  outdoorIndoor && outdoorIndoor.length > 20 && truncate ? (
      <div onClick={changeTruncate}>
        {outdoorIndoor.slice(0, 17)}
        <span>...</span>
      </div>
    ) : (
      outdoorIndoor
    );

    const truncateRange =
    measuringRange && measuringRange.length > 20 && truncate ? (
      <div onClick={changeTruncate}>
        {measuringRange.slice(0, 20)}
        <span>...</span>
      </div>
    ) : (
      <div>
        { measuringRange && measuringRange.split('\n').map((word, index, arr) => (
          <div key={index}>
            {word}
            {index < arr.length - 1 && <br />}
          </div>
        ))}
      </div>
    );

    
  const truncateAccuracy =
    accuracy && accuracy.length > 20 && truncate ? (
      <div onClick={changeTruncate}>
        {accuracy.slice(0, 20)}
        <span>...</span>
      </div>
    ) : (
      accuracy
    );
  const truncateResolution =
    resolution && resolution.length > 20 && truncate ? (
      <div onClick={changeTruncate}>
        {resolution.slice(0, 20)}
        <span>...</span>
      </div>
    ) : (
      resolution
    );

  const truncatePowerSupply =
    powerSupply && powerSupply.length > 20 && truncate ? (
      <div onClick={changeTruncate}>
        {powerSupply.slice(0, 20)}
        <span>...</span>
      </div>
    ) : (
      powerSupply
    );

  const truncateOutput =
    output && output.length > 20 && truncate ? (
      <div onClick={changeTruncate}>
        {output.slice(0, 20)}
        <span>...</span>
      </div>
    ) : (
      output
    );


  return (
    <>
      <tr key={id}>
        <td>{index + 1}</td>
        <td>{brand}</td>

        <td className="col-description cursor-pointer">{Clasification}</td>
        <td className="col-description cursor-pointer">{truncateDescription}</td>
        
        <td className="col-model cursor-pointer">{truncatedProduct}</td>
        <td className="col-model cursor-pointer">{truncateSku}</td>
        <td className="col-model cursor-pointer">{truncateUseCase}</td>
        <td className="col-model cursor-pointer">{truncateType}</td>
        <td className="col-model cursor-pointer">{truncateRange}</td>
        <td className="col-model cursor-pointer">{truncateAccuracy}</td>
        <td className="col-model cursor-pointer">{truncateResolution}</td>
{/*     <td className="col-model cursor-pointer">{truncateOutput}</td>  */}
        <td className="col-model cursor-pointer">{truncatePowerSupply}</td>
        <td className="col-model">{operatingTemperature}</td>
        <td className="col-model">{operatingHumidity}</td>


        {seePrices && (
          <>
            <td>{costUSDMiami && "$" + costUSDMiami}</td>
            <td>{fiveToTenPrice && "$" + fiveToTenPrice}</td>
            <td>{elevenToTwentyFivePrice && "$" + elevenToTwentyFivePrice}</td>
            <td>{twentySixToFiftyPrice && "$" + twentySixToFiftyPrice}</td>
            <td>{priceWesco && "$" + priceWesco}</td>
          </>
        )}
      </tr>
    </>
  );
};

export default Card;