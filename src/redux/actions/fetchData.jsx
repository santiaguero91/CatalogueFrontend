import axios from "axios";

export const fetchData = () => async (dispatch) => {
  try {
    const response = await axios.get("/sensors/all");
    const dataWithQuantity = response.data.map((item) => ({
      ...item,
      quantity: 1, 
    }));

    return dispatch({ type: "FETCH_DATA", payload: dataWithQuantity });
  } catch (err) {
    console.log(err);
    return err;
  }
};