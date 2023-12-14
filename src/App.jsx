import "/src/index.css"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchData } from './redux/actions';
import Cards from './components/Cards';
//   axios.defaults.baseURL = "http://localhost:3001"
axios.defaults.baseURL = "https://cataloguebackend-3om3035ke-santiaguero91.vercel.app"


function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const sensorData = useSelector(s=>s.filteredSensors)


  
  useEffect(()=>{
    dispatch(fetchData()).then(()=>{
      setIsLoaded(true)
    })
  }, [dispatch])

  
  return (
    <div className='mainContainer'>
      <div>
        <Cards sensorData={sensorData} isLoaded={isLoaded}/>
      </div>
    </div>
  )
}

export default App
