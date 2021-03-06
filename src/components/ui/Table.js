import MaterialTable, { MTableToolbar} from "material-table";
import axios from 'axios';

import { tableIcons } from './tableIcons';
import FormDialog from './FormDialog';

export default function table({ data , models, setData, onAdd }) {

  const lookup = models.reduce(reducer,{});

  const columns = [
    { title: 'Name', field: 'name', filtering:false },
    { 
      title: 'Model', 
      field: 'modelId',
      lookup
    },
    { title: 'Serial Number', field: 'serialNumber', filtering:false }
  ];

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              axios.put(`https://demo-iot-device-management.azurewebsites.net/api/devices/${oldData.id}`, {
                name: newData.name,
                modelId: newData.modelId,
                serialNumber: newData.serialNumber
              })
              .then((response) => {
                if(response.data !== {}){
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);
                  resolve();
                }
              })
              .catch(err => {
                console.log(err)
                reject()
              })
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              axios({
                method: 'DELETE',
                url: `https://demo-iot-device-management.azurewebsites.net/api/devices/${oldData.id}`,
              })
              .then(function (response) {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve()
              })
              .catch(err => {
                console.log(err)
                reject()
              })
            }),
        }}
        components={{
          Toolbar: props => (
            <div>
              <MTableToolbar {...props} />
              <div style={{padding: '0px 10px', display: "flex", flexDirection: "row",  justifyContent: 'flex-end',}}>
                <FormDialog onAdd={onAdd} models={models}/>
              </div>
            </div>
          ),
        }}
        options={{
          filtering: true
        }}
    />
  </div>
  )
}

const reducer = (accumulator, currentValue) => {
  return {...accumulator, [currentValue.id]:currentValue.name};
}

  