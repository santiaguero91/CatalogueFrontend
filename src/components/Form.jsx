import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { resetData, searchData } from "../redux/actions";
import { fillDropdowns } from "../redux/actions/fillDropdowns";
import { filterData } from "../redux/actions/filter";
import SelectComponent from "./SelectComponent";
import handleChange from "./handleFunctions";
import FiltersValues from "./FiltersValues";
import { useNavigate } from "react-router-dom";
import MeasuresFilter from "./MeasuresFilter";

const Form = () => {
  const dispatch = useDispatch();
  const [measuresChecked, setMeasuresChecked] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const navigateToCart = () => {
    navigate("/cart");
  };
  //********show/hide segments********************* */
  const [showOperatingRanges, setShowOperatingRanges] = useState(false);
  const [showMeasuringRanges, setShowMeasuringRanges] = useState(false);
  const [seePricesChecked, setSeePricesChecked] = useState(true);

  //********number inputs********************* */
  const [maxTempInput, setMaxTempInput] = useState(0);
  const [minTempInput, setMinTempInput] = useState(0);
  const [maxHumidity, setMaxHumidity] = useState(0);
  const [maxMeasureTempInput, setMaxMeasureTempInput] = useState(0);
  const [minMeasureTempInput, setMinMeasureTempInput] = useState(0);
  const [MaxTempAccuracyInput, setMaxTempAccuracyInput] = useState(0);
  const [maxMeasureHumidityInput, setMaxMeasureHumidityInput] = useState(0);
  const [MaxHumidityAccuracyInput, setMaxHumidityAccuracyInput] = useState(0);

  //********power Supply input********************* */
  const [powerSupplyInputOptions, setPowerSupplyInputOptions] = useState([
    "Battery",
    "Current",
    "Type-C Port",
    "Solar",
  ]);
  const [outdoorIndoorInputOptions, setOutdoorIndoorInputOptions] = useState([
    "Outdoor",
    "Indoor",
  ]);
  const [measuresArrList, setMeasuresArrList] = useState([
    "Temperature",
    "Humidity",
    "CO2",
    "Light",
    "Pressure",
    "VOC",
    "motion",
    "Sound",
    "Leak",
    "Soil",
  ]);
  const [clasificationArrList, setClasificationArrList] = useState([]);
  useState(true);

  //******************************/
  const [useCaseArrList, setUseCaseArrList] = useState([]);
  const [brandsArrList, setBrandsArrList] = useState([]);
  const [measureArrList, setMeasureArrList] = useState([]);
  const [accuracyArrList, setAccuracyArrList] = useState([]);
  const [resolutionArrList, setResolutionArrList] = useState([]);
  const [outputArrList, setOutputArrList] = useState([]);
  const [powerSupplyArrList, setPowerSupplyArrList] = useState([]);
  const [operatingTempArrList, setOperatingTempArrList] = useState([]);
  const [operatingHumidityArrList, setOperatingHumidityArrList] = useState([]);
  const [outIndoorArrList, setOutIndoorArrList] = useState([]);

  useEffect(() => {
    dispatch(fillDropdowns());
  }, []);

  const handleSearch = (searchBy) => {
    dispatch(
      filterData({
        Search: search ? search : searchBy,
        Brand: brandsArrList,
        ["Measuring Range"]: measureArrList,
        Accuracy: accuracyArrList,
        Resolution: resolutionArrList,
        Output: outputArrList,
        Power: powerSupplyArrList,
        Operating: operatingTempArrList,
        Humidity: operatingHumidityArrList,
        OutdoorIndoor: outIndoorArrList,
        clasification: clasificationArrList,
        Measures: measuresChecked,
        useCase: useCaseArrList,
        maxTempInput: maxTempInput,
        minTempInput: minTempInput,
        maxHumidity: maxHumidity,
        maxMeasureTempInput: maxMeasureTempInput,
        minMeasureTempInput: minMeasureTempInput,
        seePricesChecked: seePricesChecked,
        MaxTempAccuracyInput: MaxTempAccuracyInput,
        MaxHumidityAccuracyInput: MaxHumidityAccuracyInput,
        MaxMeasureHumidityInput: maxMeasureHumidityInput,
      })
    );
    dispatch(fillDropdowns());
  };

  //handle Measure
  const handleDeleteMeasure = (arr, setArr, item) => {
    const filteredArr = arr.filter((itemArr) => item !== itemArr);
    setArr(filteredArr);
  };

  //seeprices
  const handleSeePricesToggle = () => {
    setSeePricesChecked((prevSeePricesChecked) => !prevSeePricesChecked);
  };

  //reset
  const handleReset = () => {
    setSearch("");
    //***************************** */
    setUseCaseArrList([]);
    setBrandsArrList([]);
    setMeasureArrList([]);
    setAccuracyArrList([]);
    setResolutionArrList([]);
    setOutputArrList([]);
    setPowerSupplyArrList([]);
    setOperatingTempArrList([]);
    setOperatingHumidityArrList([]);
    setOutIndoorArrList([]);
    setMeasuresChecked([]);
    dispatch(resetData());
    dispatch(fillDropdowns());
    setMaxTempInput(0);
    setMinTempInput(0);
    setMinMeasureTempInput(0);
    setMaxMeasureTempInput(0);
    setMaxTempAccuracyInput(0);
    setMaxHumidityAccuracyInput(0);
    setMaxMeasureHumidityInput(0);
    setClasificationArrList([]);
  };

  //***************************** */

  const brandsOptions = useSelector((s) => s.dropdownData.brands);
  const useCaseOptions = useSelector((s) => s.useCaseFilter);
  const clasificationOptions = useSelector((s) => s.clasficationFilter);
  const sensorsData = useSelector((s) => s.filteredSensors);

  //***********EFFECT TO UPDATE THE FILTERS IN  *************/
  useEffect(() => {
    handleSearch();
  }, [
    useCaseArrList,
    brandsArrList,
    measureArrList,
    accuracyArrList,
    resolutionArrList,
    outputArrList,
    powerSupplyArrList,
    operatingTempArrList,
    operatingHumidityArrList,
    outIndoorArrList,
    measuresChecked,
    maxTempInput,
    minTempInput,
    maxHumidity,
    maxMeasureTempInput,
    minMeasureTempInput,
    seePricesChecked,
    MaxTempAccuracyInput,
    clasificationArrList,
    maxMeasureHumidityInput,
    MaxHumidityAccuracyInput,
  ]);

  //***************************** */

  const handleChangeSelectUseCase = (e) =>
    handleChange(e, useCaseArrList, setUseCaseArrList);
  const handleChangeSelectBrand = (e) =>
    handleChange(e, brandsArrList, setBrandsArrList);
  const handleChangeResolution = (e) =>
    handleChange(e, resolutionArrList, setResolutionArrList);
  const handleChangePowerSupply = (e) =>
    handleChange(e, powerSupplyArrList, setPowerSupplyArrList);
  const handleChangeOutdoorIndoor = (e) =>
    handleChange(e, outIndoorArrList, setOutIndoorArrList);
  const handleChangeMeasure = (e) =>
    handleChange(e, measureArrList, setMeasureArrList);

  const handleChangeClasfication = (e) =>
    handleChange(e, clasificationArrList, setClasificationArrList);

  const handleDeleteItem = (arr, setArr, item) => {
    const filteredArr = arr.filter((itemArr) => item !== itemArr);
    setArr(filteredArr);
  };

  const lastItemUseCase = useCaseArrList?.[useCaseArrList.length - 1];
  const lastItemClasification =
    clasificationArrList?.[clasificationArrList.length - 1];
  const lastItemPowerSupply =
    powerSupplyArrList?.[powerSupplyArrList.length - 1];
  const lastItemOutdoorIndoor = outIndoorArrList?.[outIndoorArrList.length - 1];

  // New state for the number input
  const handleMaxTemp = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= -100 && value <= 201) setMaxTempInput(value);
  };

  const handleMinTemp = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= -100 && value <= 201) setMinTempInput(value);
  };

  const handleMinMeasureTemp = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= -100 && value <= 201)
      setMinMeasureTempInput(value);
  };

  const handleMaxMeasureTemp = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= -100 && value <= 201)
      setMaxMeasureTempInput(value);
  };

  const handleMaxTempAccuracyInput = (event) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 1) {
      setMaxTempAccuracyInput(value);
    }
  };
  const handleMaxHumidity = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100)
      setMaxMeasureHumidityInput(value);
  };
  const handleHumidityAccuracyInput = (event) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setMaxHumidityAccuracyInput(value);
    }
  };
  //** filter away select options */
  const uniquePowerSupplies = [
    ...new Set(sensorsData.map((sensor) => sensor.powerSupply)),
  ];
  const filteredPowerSupplyOptions = powerSupplyInputOptions.filter(
    (option) =>
      !powerSupplyArrList.includes(option) &&
      uniquePowerSupplies.includes(option)
  );

  return (
    <>

      <div>
        <div className="">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search..."
            className="border border-black mb-4 pl-2"
          />
          <button
            className="ml-2 p-2 px-4 rounded-md bg-[#073763] 
					shadow-slate-600 text-slate-100 font-inter shadow-2xl box-border 
						cursor-pointer"
            onClick={() => handleSearch(search)}
          >
            Search
          </button>
          <button
            className="ml-2 p-2 px-4 rounded-md bg-[#073763] shadow-slate-600 text-slate-100 font-inter shadow-2xl box-border cursor-pointer"
            onClick={navigateToCart}
          >
            Go to Cart
          </button>
        </div>

        <div className="w-full flex flex-col flex-wrap md:flex-nowrap gap-2">
          <div className="flex flex-wrap gap-2 py-2 pb-4">
            <FiltersValues
              list={measuresChecked}
              label="Measures"
              handleDeleteItem={handleDeleteMeasure}
              setArrList={setMeasuresArrList}
            />
          </div>

          {/* dropdowns */}
          <div className="w-full flex flex-wrap md:flex-nowrap gap-2">
            <SelectComponent
              id="selected-Brand"
              options={
                brandsOptions &&
                brandsOptions.filter(
                  (option) => !brandsArrList.includes(option)
                )
              }
              handleChange={handleChangeSelectBrand}
              defaultText={"Select a Brand..."}
              label="Brands"
            />

            <SelectComponent
              id="selected-clasification"
              value={lastItemClasification ? lastItemClasification : ""}
              options={
                clasificationOptions &&
                clasificationOptions.filter(
                  (option) => !clasificationArrList.includes(option)
                )
              }
              handleChange={handleChangeClasfication}
              defaultText={"Select a Clasification..."}
              label="Clasification"
            />

            <SelectComponent
              id="selected-Measures"
              options={
                measuresArrList &&
                measuresArrList.filter(
                  (option) => !measureArrList.includes(option)
                )
              }
              handleChange={handleChangeMeasure}
              defaultText={"Select a Measure..."}
              label="Measures"
            />

            <SelectComponent
              id="selected-use-case"
              value={lastItemUseCase ? lastItemUseCase : ""}
              options={
                useCaseOptions &&
                useCaseOptions.filter(
                  (option) => !useCaseArrList.includes(option)
                )
              }
              handleChange={handleChangeSelectUseCase}
              defaultText={"Select a Use Case..."}
              label="Use Case"
            />

            <SelectComponent
              id="selected-outdoorindoor"
              value={lastItemOutdoorIndoor ? lastItemOutdoorIndoor : ""}
              options={
                outdoorIndoorInputOptions &&
                outdoorIndoorInputOptions.filter(
                  (option) => !outIndoorArrList.includes(option)
                )
              }
              handleChange={handleChangeOutdoorIndoor}
              defaultText={"Select Outdoor / Indoor..."}
              label="Outdoor/Indoor"
            />

            <SelectComponent
              id="selected-power-supply"
              value={lastItemPowerSupply ? lastItemPowerSupply : ""}
              options={filteredPowerSupplyOptions}
              handleChange={handleChangePowerSupply}
              defaultText={"Select a Supply..."}
              label="Power Supply"
            />
          </div>
        </div>

        {measureArrList.length !== 0 && (
          <MeasuresFilter
            measureArrList={measureArrList}
            showMeasuringRanges={showMeasuringRanges}
            handleShowMeasuringRanges={() =>
              setShowMeasuringRanges(!showMeasuringRanges)
            }
            handleMinMeasureTemp={handleMinMeasureTemp}
            handleMaxMeasureTemp={handleMaxMeasureTemp}
            handleMaxTempAccuracyInput={handleMaxTempAccuracyInput}
            minMeasureTempInput={minMeasureTempInput}
            maxMeasureTempInput={maxMeasureTempInput}
            MaxTempAccuracyInput={MaxTempAccuracyInput}
            handleMaxHumidity={handleMaxHumidity}
            handleHumidityAccuracyInput={handleHumidityAccuracyInput}
            maxMeasureHumidityInput={maxMeasureHumidityInput}
            maxHumidityAccuracyInput={MaxHumidityAccuracyInput}
          />
        )}
        {/* Opertaing temp and humidity filters */}
        <div>
          <button
            type="button"
            onClick={() => setShowOperatingRanges(!showOperatingRanges)}
            className="p-2 px-4 rounded-md bg-[#yourColor] text-slate-100 font-inter shadow-2xl box-border"
          >
            <h5 className="text-md text-gray-400 font-bold cursor-pointer flex items-center">
              Operating Ranges
              <img
                src="https://www.svgrepo.com/show/509905/dropdown-arrow.svg"
                alt="Dropdown Arrow"
                className="ml-2 w-6"
              />
            </h5>
          </button>

          {showOperatingRanges && (
            <div>
              <div className="flex gap-2">
                <div className="flex gap-2">
                  <label>Min temp:</label>
                  <input
                    type="number"
                    onChange={handleMinTemp}
                    value={minTempInput}
                    min="-100"
                    max="200"
                    className="border border-black mb-4 pl-2"
                  />
                  <label>Max temp:</label>
                  <input
                    type="number"
                    onChange={handleMaxTemp}
                    value={maxTempInput}
                    min="-100"
                    max="200"
                    className="border border-black mb-4 pl-2"
                  />
                  <label>Max Humidity:</label>
                  <input
                    type="number"
                    onChange={handleMaxHumidity}
                    value={maxHumidity}
                    min="0"
                    max="100"
                    className="border border-black mb-4 pl-2"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="py-2 flex gap-2">
          <button
            type="button"
            onClick={() => handleReset()}
            className="p-2 px-4 rounded-md bg-[#CE489A] 
						shadow-slate-600 text-slate-100 font-inter shadow-2xl box-border "
          >
            Reset
          </button>

          <button
            type="button"
            onClick={handleSeePricesToggle}
            className={`p-2 px-4 rounded-md font-inter shadow-2xl box-border ${
              seePricesChecked
                ? "bg-[#CE489A] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {seePricesChecked ? "Hide Prices" : "Show Prices"}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 py-2 pb-4">
          {/* brands */}
          <FiltersValues
            list={brandsArrList}
            label="Brands"
            handleDeleteItem={handleDeleteItem}
            setArrList={setBrandsArrList}
          />
          <FiltersValues
            list={clasificationArrList}
            label="Clasification"
            handleDeleteItem={handleDeleteItem}
            setArrList={setClasificationArrList}
          />
          {/*measure range list*/}
          <FiltersValues
            list={measureArrList}
            label="Measure"
            handleDeleteItem={handleDeleteItem}
            setArrList={setMeasureArrList}
          />

          {/*output*/}
          <FiltersValues
            list={outputArrList}
            label="Output"
            handleDeleteItem={handleDeleteItem}
            setArrList={setOutputArrList}
          />
          <FiltersValues
            list={useCaseArrList}
            label="Use Case"
            handleDeleteItem={handleDeleteItem}
            setArrList={setUseCaseArrList}
          />
          <FiltersValues
            list={outIndoorArrList}
            label="Outdoor/Indoor"
            handleDeleteItem={handleDeleteItem}
            setArrList={setOutIndoorArrList}
          />
          {/*power supply*/}
          <FiltersValues
            list={powerSupplyArrList}
            label="Power Supply"
            handleDeleteItem={handleDeleteItem}
            setArrList={setPowerSupplyArrList}
          />
        </div>
      </div>
    </>
  );
};

export default Form;
