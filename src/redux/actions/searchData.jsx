export function searchData (searchBy){
  return {
    type: "SEARCH_DATA",
    payload: searchBy,
  }
}