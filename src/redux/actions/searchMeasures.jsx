export function searchMeasureData (searchBy){
    return {
      type: "SEARCH_MEASURES",
      payload: searchBy,
    }
  }