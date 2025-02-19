import { useState, useEffect } from "react";
import axios from "axios";
import { SelectPicker, Stack } from "rsuite";
import { ToastContainer } from "react-toastify";

interface IProp{
    org:string | null,
    setOrg:(value:string | null)=>void
    user:string |null,
    setUser:(value:string | null)=>void
}

function CustomDropdown(props:IProp) {
  const [data, SetData] = useState([]);

  const handleOpen = () => {
    const config = {
      headers: {
        "Custom-Header": "Custom Value",
      },
    };
    const response = axios
      .get("http://localhost:8555/admin/organizations", config)
      .then((res) => {
        const activeData = res.data.allOrg.filter(
          (item: any) => item.is_active == true
        );
        const mappedData = activeData.map((item: any) => item.name);
        const mappedData2 = mappedData.map((item: any) => ({
          label: item,
          value: item,
        }));
        SetData(mappedData2);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleOpen();
  }, []);

  return (
    <>
      <div>
        <Stack spacing={10} direction="column" alignItems="flex-start">
          <SelectPicker
            data={data}
            value={props.org}
            onClean={()=>props.setOrg(null)}
            onChange={(value)=>{
                 props.setOrg(value);
            }}
            style={{ width: 224 }}
          />
        </Stack>
      </div>
      <ToastContainer/>
    </>
  );
}
export default CustomDropdown;
