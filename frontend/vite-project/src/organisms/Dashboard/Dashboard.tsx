import "./Dashboard.scss";
import { Button } from "rsuite";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import TableDemo from "../../molecules/Table/Table";
import logOut from '../../../public/logOut.png';


interface IUserList{
  userId:string |null
  name:string | null,
  email:string | null

}

interface IData{
  name:string | null,
  is_active:boolean,
  user_list:Array<IUserList>
}

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
        const activeData = res.data.filter((item:IData) => item.is_active == true);
      setOrg(activeData);
      setfil(activeData);
      })
      .catch((err) => console.log(err));
  }, []);

    if(response){
    response.json();
    }

  const deliveOrganization = async(name:string) => {

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
    await response.json();
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
          <Link to="/admin/dashboard/createOrgUser">
                <Button className="btn2" color="red" appearance="primary">
                  Create User
                </Button>
            </Link>
          <Link to='/admin/dashboard/createOrg'>
              <Button
                className="org-btn"
                color="red"
                appearance="primary"
              >
                Create Organization
              </Button>
            </Link>
            <h2>All Organizations</h2>
            <div className="upper-table">
            <TableDemo fil={fil} deliveOrganization={deliveOrganization}/>
            </div>
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
        <div className="heading-btn">*/} 
           <Link to="/">
            <div>
              <Button className='log-out-btn' appearance="primary" onClick={logout}>
                <img width={20} src={logOut}/>
              </Button>
            </div></Link>
        {/* </div>
      </div> */}
      {/* </div> */}
      <ToastContainer />

    </>
  );
}

export default Dashboard;
