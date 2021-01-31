import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './ui/Header';
import Table from './ui/Table';

function App() {
  const [data, setData] = useState( []);
  const [models, setModels] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://demo-iot-device-management.azurewebsites.net/api/devices',
    })
    .then(function (response) {
      setData(response.data)
    })
    .catch(err => console.log(err))

    axios({
      method: 'get',
      url: 'https://demo-iot-device-management.azurewebsites.net/api/models',
    })
    .then(function (response) {
      setModels(response.data)
    })
    .catch(err => console.log(err))
  }, []);

  const handleAdd =  (name, modelId, serialNumber) => {
    axios.post('https://demo-iot-device-management.azurewebsites.net/api/devices/', {
      name,
      modelId,
      serialNumber
    })
    .then((response) => {
      if(response.data !== {}){

        const newData = data.concat({
          name,
          modelId,
          serialNumber
        });
     
        setData(newData);
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
        <Header />
        <Table data={data} setData={setData} models={models} onAdd={handleAdd}/>
    </div>
  );
}

export default App;
