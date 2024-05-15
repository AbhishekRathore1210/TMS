import "./Dashboard.scss";
import { Button, Input, Modal } from "rsuite";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

function Dashboard() {
  const [org, setOrg] = useState([]);
  const [fil, setfil] = useState([]);

  const navigate = useNavigate();
  const cookies = new Cookies();

  let response: any;
  const token:string | undefined = cookies.get('accessToken');

  useEffect(() => {
    
  if(!token){
    navigate('/login');
    return;
  }
    const config = {
      headers: {
        Authorization: `BEARER ${token}`,
        'Custom-Header': 'Custom Value',
      },
    };

    response = axios
      .get("http://localhost:8555/admin/dashboard",config)
      .then((res) => {
        console.log(res.data);
        const activeData = res.data.filter((item:any) => item.is_active == true);
      setOrg(activeData);
      setfil(activeData);
      })
      .catch((err) => console.log(err));
  }, []);

    if(response){
    const result = response.json();
    }

  const deliveOrganization = async(name:string) => {
    console.log(name);

    const token:string | undefined = cookies.get('accessToken');
    console.log(token);
    if(!token){
        navigate('/login');
        return;
    }

    const organizationName = {"name":name};
    const response = await fetch("http://localhost:8555/admin/dashboard/deleteOrg",{
      method:'POST',
      body:JSON.stringify(organizationName),
      headers:{
        "Content-Type": "application/json",
      }
    });
    const result = await response.json();
    if(response.ok){
      const activeData = org.filter((item:any) => {
        return item.is_active == true;
      });
      setOrg(activeData);
      setfil(activeData);

      console.log("Organization Deleted Successfully!");
    }
    else{
      console.log("Cannot Delete");
    }
  }
  const handleInput = async(inp: any) => {

    const filterData = org.filter((temp: any) => {
      console.log(temp.is_active);
      return temp.is_active && temp.name.toLowerCase().includes(inp.toLowerCase());
    });
    setfil(filterData);
  };
  return (
    <>
      <div className="dashboard-container">
        <div className="sidebar">
          <h2>All Organizations</h2>
          <Input
            style={{ width: 300 }}
            type="text"
            placeholder="Search here"
            onChange={(e) => handleInput(e)}
          />
          <div>
          </div>
          <div className="org">
            {fil.map((e: any, i) => (
              <div className="orgNameDiv">
                <p className="orgName" key={i}>{e.name}</p>
                <button className="orgButton" onClick={()=>deliveOrganization(e.name)}>X</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="heading-btn">
          <h1>System User Dashboard</h1>
          <div className="btn">
            <Link to='/admin/dashboard/createOrg'>

            <span>
              <Button
                className="btn1"
                color="green"
                appearance="primary"
              >
                Create Organizations
              </Button>
            </span>
            </Link>
            <Link to="dashboard/createOrgUser">
              <span>
                <Button className="btn2" color="green" appearance="primary">
                  Create Organization User
                </Button>
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* </div> */}
      <ToastContainer />
    </>
  );
}

export default Dashboard;
