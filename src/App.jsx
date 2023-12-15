import "/src/index.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchData } from "./redux/actions";
import Cards from "./components/Cards";
import { Route, Routes } from "react-router-dom";
import Cart from "./Views/Cart";

axios.defaults.baseURL = "http://localhost:3001";
//   axios.defaults.baseURL = "https://cataloguebackend-3om3035ke-santiaguero91.vercel.app"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sensorData = useSelector((s) => s.filteredSensors);
  const searchedData = useSelector((s) => s.searchedSensors);
  const cart = useSelector((s) => s.cart);

  useEffect(() => {
    dispatch(fetchData()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <div className="mainContainer">      
      <Routes>
        <Route
          path="/"
          element={<Cards sensorData={sensorData} isLoaded={isLoaded} />}
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
