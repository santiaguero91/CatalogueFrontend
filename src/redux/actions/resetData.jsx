export function resetData (searchBy){
  return {
    type: "RESET_DATA",
    payload: searchBy,
  }
}