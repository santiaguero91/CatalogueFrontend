import axios from "axios"

export const fetchData = () => async (dispatch) => {
  try{
    const response = await axios.get("/sensors/all")
    return dispatch({ type: "FETCH_DATA",  payload: response.data})
  }
  catch(err){
    console.log(err)
    return err
  }
}