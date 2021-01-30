import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

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
      console.log(response.data)
      setData(response.data)
    })
    .catch(err => console.log(err))
  }, []);

  return (
    <div>
        <Header />
        <Table data={data} setData={setData}/>
    </div>
  );
}

export default App;
