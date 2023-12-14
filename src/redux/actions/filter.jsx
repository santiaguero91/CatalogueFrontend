export function filterData (property, values){
  return {
    type: "FILTER",
    payload: {property, values},
  }
}