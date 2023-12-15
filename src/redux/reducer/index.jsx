const initialState = {
  initialSensors: [],
  filteredSensors: [],
  searchedSensors: [],

  sortedby: "ListPriceUSDExWorkMiami",
  searchBy: null,
  searchBymeasure: null,
  brandFilter: "",
  modelFilter: "",
  typeFilter: "",
  maxTempAccuracyInput: "",
  measuringRangeFilter: "",
  accuracyFilter: "",
  resolutionFilter: "",
  sensorTypeFilter: "",
  useCaseFilter: "",
  clasficationFilter: "",
  outputFilter: "",
  supplyFilter: "",
  operatingTemperatureFilter: "",
  operatingHumidityFilter: "",
  outIndoorFilter: "",
  brandArray: "",
  modelArray: "",
  typeArray: "",
  measuringRangeArray: "",
  accuracyArray: "",
  sensorTypeArray: "",
  outputArray: "",
  supplyArray: "",
  operatingTemperatureArray: "",
  operatingHumidityArray: "",
  dropdownData: {},
  measuresArrList: [],
  seePricesChecked: true,

  cart: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        initialSensors: action.payload,
        filteredSensors: action.payload,
        searchedSensors: action.payload,
      };
    case "FILL_ARRAYS":
      break;
    case "SORT_DATA":
      var value = undefined;
      let sensorsWithPrice = state.filteredSensors.filter((sensor) => {
        if (
          sensor[state.sortedby] !== " " &&
          sensor[state.sortedby] !== undefined
        ) {
          value = parseFloat(sensor[state.sortedby]);
          return value;
        }
      });
      let sensorsBlankPrice = state.filteredSensors.filter((sensor) => {
        if (
          sensor[state.sortedby] === " " ||
          sensor[state.sortedby] === undefined
        ) {
          sensor[state.sortedby] = " ";
          return sensor;
        }
      });
      if (state.sortedby !== action.payload) {
        state.sortedby = action.payload;

        sensorsWithPrice.sort(function (a, b) {
          const priceA = parseFloat(a[action.payload]) || 0;
          const priceB = parseFloat(b[action.payload]) || 0;
          return priceB - priceA;
        });
      } else {
        sensorsWithPrice.reverse();
        let combinedSensors = [...sensorsWithPrice, ...sensorsBlankPrice];
        return {
          ...state,
          filteredSensors: combinedSensors,
        };
      }
      let combinedSensors = [...sensorsWithPrice, ...sensorsBlankPrice];
      return {
        ...state,
        sortedby: state.sortedby,
        filteredSensors: combinedSensors,
      };
    case "ADDCART":
      const isItemInCart = state.cart.some(
        (cartItem) => cartItem.id === action.payload.item.id
      );
      if (isItemInCart) {
        const updatedCart = state.cart.filter(
          (cartItem) => cartItem.id !== action.payload.item.id
        );
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload.item],
        };
      }
      case "MODIFYITEM":
        const updatedCart = state.cart.map((cartItem) => {
          if (cartItem.id === action.payload.item.id) {
            return action.payload.item;
          }
          return cartItem;
        });
        return {
          ...state,
          cart: updatedCart,
        };
    case "RESET_DATA":
      return {
        ...state,
        filteredSensors: state.initialSensors,
        searchBy: null,
      };
    case "FILL_DROPDOWNS":
      const currentAvailableBrands = [];
      const currentAvailableMeasureRange = [];
      const currentAvailableUseCase = [];
      const currentAvailableAccuracy = [];
      const currentAvailableResolution = [];
      const currentAvailableOutput = [];
      const currentAvailableSupply = [];
      const currentAvailableOperatingTemp = [];
      const currentAvailableOperatingHumidity = [];
      const currentAvailableOutIndoor = [];
      const currentAvailableClasification = [];
      
      state.initialSensors.map((el) => {
        if (el["brand"]) {
          currentAvailableBrands.push(el["brand"]);
        }
      });

      state?.filteredSensors.map((el) => {
        if (el["measuringRange"]) {
          currentAvailableMeasureRange.push(el["measuringRange"]);
        }
        if (el["useCase"]) {
          currentAvailableUseCase.push(el["useCase"]);
        }

        if (el["accuracy"]) {
          currentAvailableAccuracy.push(el["accuracy"]);
        }

        if (el["resolution"]) {
          currentAvailableResolution.push(el["resolution"]);
        }

        if (el["Output"]) {
          currentAvailableOutput.push(el["Output"]);
        }
        if (el["clasification"]) {
          currentAvailableClasification.push(el["clasification"]);
        }

        if (el["powerSupply"]) {
          currentAvailableSupply.push(el["powerSupply"]);
        }

        if (el["operatingTemperature"]) {
          currentAvailableOperatingTemp.push(el["operatingTemperature"]);
        }

        if (el["operatingHumidity"]) {
          currentAvailableOperatingHumidity.push(el["operatingHumidity"]);
        }
        if (el["outdoorIndoor"]) {
          currentAvailableOutIndoor.push(el["outdoorIndoor"]);
        }
      });

      const uniqueCurrentAvailableBrands = new Set(currentAvailableBrands);
      const uniqueCurrentAvailableMeasureRange = new Set(
        currentAvailableMeasureRange
      );
      const uniqueCurrentAvailableAccuracy = new Set(currentAvailableAccuracy);
      const uniqueCurrentAvailableResolution = new Set(
        currentAvailableResolution
      );
      const uniqueCurrentAvailableOutput = new Set(currentAvailableOutput);

      /* UseCase */
      const uniqueCurrentAvailableUseCase = new Set(currentAvailableUseCase);
     /*  let uniqueCurrentAvailableUseCase = state.useCaseFilter;
      if (state.useCaseFilter.length === 0) {
        uniqueCurrentAvailableUseCase = Array.from(
          new Set(currentAvailableUseCase)
        );
      } */

      /* Clasification */
      const uniqueCurrentAvailableClasification = new Set(currentAvailableClasification);
/*       let uniqueCurrentAvailableClasification = state.clasficationFilter;
      if (state.clasficationFilter.length === 0) {
        uniqueCurrentAvailableClasification = Array.from(
          new Set(currentAvailableClasification)
        );
      } */

      const uniqueCurrentAvailableSupply = new Set(currentAvailableSupply);
      const uniqueCurrentAvailableOperatingTemp = new Set(
        currentAvailableOperatingTemp
      );
      const uniqueCurrentAvailableOperatingHumidity = new Set(
        currentAvailableOperatingHumidity
      );
      const uniqueCurrentAvailableOutIndoor = new Set(
        currentAvailableOutIndoor
      );

      return {
        ...state,
        dropdownData: {
          ...state.dropdownData,
          brands: Array.from(uniqueCurrentAvailableBrands),
        },
        useCaseFilter: Array.from(uniqueCurrentAvailableUseCase),
        measuringRangeFilter: Array.from(uniqueCurrentAvailableMeasureRange),
        accuracyFilter: Array.from(uniqueCurrentAvailableAccuracy),
        resolutionFilter: Array.from(uniqueCurrentAvailableResolution),
        outputFilter: Array.from(uniqueCurrentAvailableOutput),
        clasficationFilter: Array.from(uniqueCurrentAvailableClasification),
        supplyFilter: Array.from(uniqueCurrentAvailableSupply),
        operatingTemperatureFilter: Array.from(
          uniqueCurrentAvailableOperatingTemp
        ),
        operatingHumidityFilter: Array.from(
          uniqueCurrentAvailableOperatingHumidity
        ),
        outIndoorFilter: Array.from(uniqueCurrentAvailableOutIndoor),
      };
    case "FILTER":
      let Search = action.payload.property.Search;
      let Brand = action.payload.property.Brand;
      let Measuring_range = action.payload.property["Measuring Range"];
      let Accuracy = action.payload.property.Accuracy;
      let Resolution = action.payload.property.Resolution;
      let Output = action.payload.property.Output;
      let Power = action.payload.property.Power;
      let Operating = action.payload.property.Operating;
      let Humidity = action.payload.property.Humidity;
      let OutdoorIndoor = action.payload.property.OutdoorIndoor;
      let UseCase = action.payload.property.useCase;

      let MaxTempInput = action.payload.property.maxTempInput;
      let MinTempInput = action.payload.property.minTempInput;
      let MaxHumidity = action.payload.property.maxHumidity;
      let MaxMeasureTempInput = action.payload.property.maxMeasureTempInput;
      let MinMeasureTempInput = action.payload.property.minMeasureTempInput;
      let MaxTempAccuracyInput = action.payload.property.MaxTempAccuracyInput;
      let Measures = action.payload.property.Measures;
      let Clasification = action.payload.property.clasification;
      let seePricesChecked = action.payload.property.seePricesChecked;
      let searchedWords = Search?.toLowerCase().trim();
      let splitWords = (searchedWords || "").split(" ");

      const measuresArray = Measures.map((word) => word.toLowerCase());
      splitWords = [...splitWords, ...measuresArray].filter(
        (word) => word.trim() !== ""
      );

      if (!searchedWords && !Brand.length && !Measures) {
        return {
          ...state,
          filteredSensors: state.initialSensors,
        };
      }
      let filteredData = state.initialSensors;

      if (splitWords.length > 0) {
        const searchdSensors = state.initialSensors.filter((el) => {
          const propertyIsIncluded = (property, searchWords) => {
            const lowerCasedProperty = property?.toLowerCase();
            return searchWords?.every((word) =>
              lowerCasedProperty?.includes(word)
            );
          };
          const boolBrand = propertyIsIncluded(el.brand, splitWords);
          const boolDescription = propertyIsIncluded(
            el.description,
            splitWords
          );
          const boolProductName = propertyIsIncluded(
            el.productName,
            splitWords
          );
          const boolSKU = propertyIsIncluded(el.sku, splitWords);
          const boolMeasureRange = propertyIsIncluded(
            el.measuringRange,
            splitWords
          );
          return (
            boolBrand ||
            boolDescription ||
            boolProductName ||
            boolSKU ||
            boolMeasureRange
          );
        });

        filteredData = searchdSensors;
      }

      //*****filtering data based on values
      filteredData = filteredData.filter((item) => {
        const includesBrand =
          Brand.length > 0 ? Brand.includes(item.brand) : true;
        const includesAccuracy =
          Accuracy.length > 0 ? Accuracy.includes(item.accuracy) : true;
        const includesResolution =
          Resolution.length > 0 ? Resolution.includes(item.resolution) : true;
        const includesOutput =
          Output.length > 0 ? Output.includes(item.Output) : true;
        const includesPower =
          Power.length > 0 ? Power.includes(item["powerSupply"]) : true;
        const includesOperating =
          Operating.length > 0
            ? Operating.includes(item["operatingTemperature"])
            : true;
        const includesHumidity =
          Humidity.length > 0
            ? Humidity.includes(item["operatingHumidity"])
            : true;

        const includesClasification =
          Clasification.length > 0
            ? Clasification.includes(item["clasification"])
            : true;

        const includesOutdoorIndoor =
          OutdoorIndoor.length > 0
            ? OutdoorIndoor.some((keyword) =>
                item["outdoorIndoor"]
                  ?.toLowerCase()
                  .includes(keyword.toLowerCase())
              )
            : true;

        const includesMeasuring =
          Measuring_range.length > 0
            ? Measuring_range.some(
                (rangeItem) =>
                  item["measuringRange"]
                    ?.toLowerCase()
                    .includes(rangeItem.toLowerCase()) ||
                  item["description"]
                    ?.toLowerCase()
                    .includes(rangeItem.toLowerCase())
              )
            : true;

        const includesuseCase =
          UseCase.length > 0 ? UseCase.includes(item["useCase"]) : true;
        const includesOperatingMaxTempInput =
          MaxTempInput !== 0
            ? item["maxOperatingTemperature"] !== null &&
              item["maxOperatingTemperature"] >= parseInt(MaxTempInput)
            : true;
        const includesOperatingMinTempInput =
          MinTempInput !== 0
            ? item["minOperatingTemperature"] !== null &&
              item["minOperatingTemperature"] <= parseInt(MinTempInput)
            : true;
        const includesOperatingMaxHumidityInput =
          MaxHumidity !== 0
            ? item["maxOperatingHumidity"] !== null &&
              item["maxOperatingHumidity"] >= parseInt(MaxHumidity)
            : true;
        const includesMaxMeasureTempInput =
          MaxMeasureTempInput !== 0
            ? item["maxMeasureTemperature"] !== null &&
              item["maxMeasureTemperature"] >= parseInt(MaxMeasureTempInput)
            : true;
        const includesMinMeasureTempInput =
          MinMeasureTempInput !== 0
            ? item["minMeasureTemperature"] !== null &&
              item["minMeasureTemperature"] <= parseInt(MinMeasureTempInput)
            : true;
        const includesMaxTempAccuracyInput =
          MaxTempAccuracyInput !== 0
            ? item["tempAccuracy"] !== null &&
              item["tempAccuracy"] >= parseFloat(MaxTempAccuracyInput)
            : true;

        if (
          includesBrand &&
          includesMeasuring &&
          includesAccuracy &&
          includesResolution &&
          includesOutput &&
          includesHumidity &&
          includesPower &&
          includesOperating &&
          includesOutdoorIndoor &&
          includesuseCase &&
          includesOperatingMaxTempInput &&
          includesOperatingMinTempInput &&
          includesOperatingMaxHumidityInput &&
          includesMinMeasureTempInput &&
          includesMaxMeasureTempInput &&
          includesMaxTempAccuracyInput &&
          includesClasification
        ) {
          return item;
        }
      });

      return {
        ...state,
      filteredSensors: filteredData,
      searchedSensors: filteredData,
      seePricesChecked: seePricesChecked,
      };

    default:
      return { ...state };
  }
};

export default reducer;
