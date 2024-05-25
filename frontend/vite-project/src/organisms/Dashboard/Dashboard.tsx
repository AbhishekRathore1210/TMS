import "./Dashboard.scss";
import { Button , Pagination,Input} from "rsuite";
import { Link } from "react-router-dom";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
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
  // const [user,setUser] = useState([]);

  const [allTicket,setAllTicket] = useState([]);
  const [limit2,setLimit2] = useState(10);
  const [page2,setPage2] = useState(1);
  const [t2,setTotal2] = useState(1);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [t,setTotal] = useState(1);
  const [check,setCheck] = useState(false);

  const handleChangeLimit = (dataKey: SetStateAction<number>) => {
    setPage(1);
    setLimit(dataKey);
  };

  const handleChangeLimit2 = (dataKey:SetStateAction<number>)=>{
    setPage2(1);
    setLimit2(dataKey);
  }

  const toggle = ()=>{
    setCheck(!check);
  }

  const navigate = useNavigate();
  const cookies = new Cookies();

  let response: any;
  const token:string | undefined = cookies.get('accessToken');

  useEffect(() => {
    
  if(!token){
    navigate('/login');
    return;
  }
  getAllTicket();

    const config = {
      headers: {
        Authorization: `BEARER ${token}`,
        'Custom-Header': 'Custom Value',
      },
    };

    response = axios
      .get(`http://localhost:8555/admin/dashboard?page=${page}&&limit=${limit}`,config)
      .then((res) => {
        console.log("data",res.data);
        setTotal(res.data.totalPage);
      setOrg(res.data.allOrg);
      setfil(res.data.allOrg);
      // setUser(res.data.allOrg.user_list.name);
      })
      .catch((err) => console.log(err));
  }, [page,t,limit, check,page2,t2,limit2]);

    if(response){
    response.json();
    }

    const getAllTicket = async()=>{
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

      const response = await axios.get(`http://localhost:8555/users/tickets?page=${page2}&&limit=${limit2}`,config)
      .then((res)=>{
        console.log("All tickets ",res.data.data.tickets);
        console.log(res.data.data);
        setTotal2(res.data.data.totalPage);
        setPage2(res.data.data.currentPage);
        setAllTicket(res.data.data.tickets)}).catch((err)=>console.log(err.message));

        }

  const deliveOrganization = async(name:string) => {

    const token:string | undefined = cookies.get('accessToken');
    if(!token){
        navigate('/login');
        return;
    }

    const organizationName = {"name":name};
    const response = await fetch("http://localhost:8555/admin/dashboard/delete-org",{
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
    // navigate(0);
  }
  const logout = async()=>{
      cookies.remove('accessToken');
      console.log("LogOut SuccessFully");
  }

  const handleInput = async(inp: any) => {

    const filterData = org.filter((item: IData) => {
      return item.is_active && item.name.toLowerCase().includes(inp.toLowerCase());
    });
    setfil(filterData);
  };

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
