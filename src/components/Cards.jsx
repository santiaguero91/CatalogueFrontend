import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { sortSensorData } from "../redux/actions";
import Form from "./Form";

const Cards = ({ sensorData, isLoaded }) => {
  const dispatch = useDispatch();
  const seePrices = useSelector((s) => s.seePricesChecked);

  const [sortBy, setSortBy] = useState("");


  
  const handleSort = (sortBy) => {
    dispatch(sortSensorData(sortBy));
    setSortBy(sortBy);
  };

  const [data, setData] = useState(sensorData);

  //*******show/hide columns******/
  useEffect(() => {
    setData(sensorData);
  }, [sensorData]);
  
  return (
    <>
      {isLoaded && data ? (
        <div className="overflow-x-auto overflow-hidden scroll scroll-smooth px-4 py-8">
          <Form sensorData={sensorData}/>
          <table>
            <thead>
              <tr>
                <th>N°</th>
                <th>Brand</th>
                <th>Clasification</th>
                <th className="w-1/2">Item & Description</th>
                <th>Product</th>
                <th>SKU</th>
                <th>Use Case</th>
                <th>Outdoor / Indoor</th>
                <th className="w-1/2" >Measuring Range</th>
                <th>Accuracy</th>
                <th>Resolution</th>
                <th>Power Supply</th>
                <th>Operating Temperature</th>
                <th>Operating Humidity</th>


                {seePrices && (
                  <>
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
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                return <Card item={item} key={item?.id} index={index} />;
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Cards;
