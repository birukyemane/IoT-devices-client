import MaterialTable, { MTableToolbar} from "material-table";
import { tableIcons } from './tableIcons';
import axios from 'axios';
import FormDialog from './FormDialog';
import { Directions } from "@material-ui/icons";

export default function table({ data , setData}) {

  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Model', field: 'modelId' },
    { title: 'Serial', field: 'serialNumber' }
  ];

    return (
      <MaterialTable
      icons={tableIcons}
      columns={columns}
      data={data}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            axios.put(`https://demo-iot-device-management.azurewebsites.net/api/devices/${oldData.id}`, {
              name: oldData.name,
              modelId: oldData.modelId,
              serialNumber: oldData.serialNumber
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
              <FormDialog />
            </div>
          </div>
        ),
      }}
    />
    )
}

  