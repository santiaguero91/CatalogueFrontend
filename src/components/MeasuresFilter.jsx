import React from "react";

const MeasuresFilter = ({
  showMeasuringRanges,
  handleShowMeasuringRanges,
  handleMinMeasureTemp,
  handleMaxMeasureTemp,
  handleMaxTempAccuracyInput,
  minMeasureTempInput,
  maxMeasureTempInput,
  MaxTempAccuracyInput,
  handleMaxHumidity,
  handleHumidityAccuracyInput,
  maxMeasureHumidityInput,
  maxHumidityAccuracyInput,
  measureArrList,
}) => {
  const isTemperatureSelected = measureArrList.includes("Temperature");
  const isHumiditySelected = measureArrList.includes("Humidity");


  return (
    <div>
      <button
        type="button"
        onClick={handleShowMeasuringRanges}
        className="p-2 px-4 rounded-md bg-[#yourColor] text-slate-100 font-inter shadow-2xl box-border"
      >
        <h5 className="text-md text-gray-400 font-bold cursor-pointer flex items-center">
          Measures Filter
          <img
            src="https://www.svgrepo.com/show/509905/dropdown-arrow.svg"
            alt="Dropdown Arrow"
            className="ml-2 w-6"
          />
        </h5>
      </button>
      {showMeasuringRanges && isTemperatureSelected && (
        <div>
          <label>Min temp:</label>
          <input
            type="number"
            onChange={handleMinMeasureTemp}
            value={minMeasureTempInput}
            min="-100"
            max="200"
            className="border border-black mb-4 pl-2"
          />
          <label>Max temp:</label>
          <input
            type="number"
            onChange={handleMaxMeasureTemp}
            value={maxMeasureTempInput}
            min="-100"
            max="200"
            className="border border-black mb-4 pl-2"
          />
          <label>Temp accuracy:</label>
          <input
            type="number"
            onChange={handleMaxTempAccuracyInput}
            value={MaxTempAccuracyInput}
            min="0"
            max="1"
            step="0.01"
            className="border border-black mb-4 pl-2"
          />
        </div>
      )}
      {showMeasuringRanges && isHumiditySelected && (
        <div>
          <label>Max Humidity:</label>
          <input
            type="number"
            onChange={handleMaxHumidity}
            value={maxMeasureHumidityInput}
            min="0"
            max="101"
            className="border border-black mb-4 pl-2"
          />
          <label>Humidity accuracy:</label>
          <input
            type="number"
            onChange={handleHumidityAccuracyInput}
            value={maxHumidityAccuracyInput}
            min="0"
            max="101"
            className="border border-black mb-4 pl-2"
          />
        </div>
      )}
    </div>
  );
};

export default MeasuresFilter;