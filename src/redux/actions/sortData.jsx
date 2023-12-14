export function sortSensorData (sortedBy){
  return {
    type: "SORT_DATA",
    payload: sortedBy,
  }
}