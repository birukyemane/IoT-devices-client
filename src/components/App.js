import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './ui/Header';
import Table from './ui/Table';

function App() {
  const [data, setData] = useState( []);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://demo-iot-device-management.azurewebsites.net/api/devices',
    })
    .then(function (response) {
      console.log('fetched',response.data)
      setData(response.data)
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
        <Table data={data} setData={setData} onAdd={handleAdd}/>
    </div>
  );
}

export default App;
