import { useState, useEffect } from "react";
import axios from "axios";
import { SelectPicker, Stack } from "rsuite";

interface Prop{
    org:string | null,
    setOrg:(value:string | null)=>void
    user:string |null,
    setUser:(value:string | null)=>void
}

function CustomDropdown(props:Prop) {
  const [data, SetData] = useState([]);

  const handleOpen = () => {
    const config = {
      headers: {
        "Custom-Header": "Custom Value",
      },
    };
    // console.log(props.org, "*********");
    const response = axios
      .get("http://localhost:8555/admin/dashboard", config)
      .then((res) => {
        // console.log(res.data);
        const activeData = res.data.filter(
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
            disabled={props.user == 'System'?true:false}
            onChange={(value)=>{
                //  console.log(value, '>>>>>>');
                 props.setOrg(value);
            }}
            style={{ width: 224 }}
          />
        </Stack>
      </div>
    </>
  );
}
export default CustomDropdown;
