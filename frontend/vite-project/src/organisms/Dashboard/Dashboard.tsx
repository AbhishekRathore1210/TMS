import "./Dashboard.scss";
import { Button , Pagination} from "rsuite";
import { Link } from "react-router-dom";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { Cookies } from "react-cookie";
import Cookies from "js-cookie";
import TableDemo from "../../molecules/Table/Table";
import logOut1 from '../../../public/logOut1.png';


interface IUserList{
  userId:string |null
  name:string
  email:string | null

}
interface IData{
  name:string,
  is_active:boolean,
  user_list:Array<IUserList>
}

function Dashboard() {

  const [org, setOrg] = useState([]);
  const [fil, setfil] = useState([]);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [t,setTotal] = useState(1);
  const [check,setCheck] = useState(false);

  const handleChangeLimit = (dataKey: SetStateAction<number>) => {
    setPage(1);
    setLimit(dataKey);
  };
  const toggle = ()=>{
    setCheck(!check);
  }

  const navigate = useNavigate();
  // const cookies = new Cookies();

  let response: any;
  const token:string | undefined = Cookies.get('accessToken');

  useEffect(() => {
    
  if(!token){
    navigate('/login');
    return;
  }
  // getAllTicket();

    const config = {
      headers: {
        Authorization: `BEARER ${token}`,
        'Custom-Header': 'Custom Value',
      },
    };

    response = axios
      .get(`http://localhost:8555/admin/organizations?page=${page}&&limit=${limit}`,config)
      .then((res) => {
        console.log("data",res.data);
        setTotal(res.data.totalPage);
      setOrg(res.data.allOrg);
      setfil(res.data.allOrg);
      // setUser(res.data.allOrg.user_list.name);
      })
      .catch((err) => console.log(err));
  }, [page,t,limit, check]);

    if(response){
    response.json();
    }

  const deliveOrganization = async(name:string) => {

    const token:string | undefined = Cookies.get('accessToken');
    if(!token){
        navigate('/login');
        return;
    }

    const organizationName = {"name":name};
    const response = await fetch("http://localhost:8555/admin/organization/delete",{
      method:'POST',
      body:JSON.stringify(organizationName),
      headers:{
        "Content-Type": "application/json",
      }
    });
    await response.json();
    if(response.ok){
      const activeData = org.filter((item:IData) => {
        return item.is_active == true;
      });
      setOrg(activeData);
      setfil(activeData);
      console.log("Organization Deleted Successfully!");
      toggle();
    }
    else{
      console.log("Cannot Delete");
    }
  }
  const logout = async()=>{
    Cookies.remove('accessToken');
    Cookies.remove('userType');
      console.log("LogOut SuccessFully");
      // navigate('/login');
  }

  return (
    <>
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
            <TableDemo fil={fil} deliveOrganization={deliveOrganization} p={page} l={limit}/>
            </div>
            <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="md"
          layout={['total', '-', 'limit', '|', 'pager', 'skip']}
          total={t*limit}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
           <Link to="/">
            <div>
              <Button className='log-out-btn' appearance="default" onClick={logout}>
                <img width={20} src={logOut1}/>
              </Button>
            </div></Link>
      <ToastContainer />
    </>
  );
}

export default Dashboard;
