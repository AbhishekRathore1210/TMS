import "./Dashboard.scss";
import { Button, Input, Modal, Table } from "rsuite";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import TableDemo from "../../molecules/Table/Table";
import NavBar from "../../molecules/NavBar/NavBar";

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
    // console.log(name);

    const token:string | undefined = cookies.get('accessToken');
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
    navigate(0);
  }
  const logout = async()=>{
      cookies.remove('accessToken');
      console.log("LogOut SuccessFully");
  }

  const handleInput = async(inp: any) => {

    const filterData = org.filter((temp: any) => {
      return temp.is_active && temp.name.toLowerCase().includes(inp.toLowerCase());
    });
    setfil(filterData);
  };
  return (
    <>
    {/* <NavBar/> */}
          <h1>System User Dashboard</h1>
          {/* <Link to='/admin/dashboard/createOrg'>
              <Button
                className="org-btn"
                color="red"
                appearance="primary"
              >
                Create
              </Button>
            </Link> */}
            <div className="table">
            <TableDemo fil={fil} deliveOrganization={deliveOrganization}/>
            </div>
          {/* <div className="org-heading"><h2>All Organizaitons</h2></div>
      <div>
          { fil.map((e: any, i:number) => (
            <div>
              <div className="org" key={i}>
                <div className="org-name">{e.name}</div></div>
              </div>
        ))} */}
      {/* </div> */}
  {/* <div className="grid-item">2</div>
  <div className="grid-item">3</div>
  <div className="grid-item">4</div>
  <div className="grid-item">5</div>
  <div className="grid-item">6</div>
  <div className="grid-item">7</div>
  <div className="grid-item">8</div> */}
        {/* <TableDemo fil={fil} setfil={setfil}/> */}
        {/* <div className="sidebar"> */}
          {/* <h2>All Organizations</h2> */}
          {/* <div>
          </div> */}
          {/* <div className="org">
             {fil.map((e: any, i:number) => (
              <div className="orgNameDiv">
                <p className="orgName" key={i}>{e.name}</p> */}
                {/* <button className="orgButton" onClick={()=>deliveOrganization(e.name)}>Delete</button> */}
              {/* </div>
            ))}  */}
          {/* </div> */}
        {/* </div> */}
      {/* </div> */}
      {/* <div className="main-content">
        <div className="heading-btn">
          <div className="btn"> */}
            {/*<Link to="/admin/dashboard/createOrgUser">
              <span>
                <Button className="btn2" color="red" appearance="primary">
                  Create Organization User
                </Button>
              </span>
            </Link>
            <Link to="/">
            <span>
              <Button color='red' appearance="primary" onClick={logout}>LOG OUT</Button>
            </span></Link>
          </div>
        </div>
      </div> */}
      {/* </div> */}
      <ToastContainer />
    </>
  );
}

export default Dashboard;
