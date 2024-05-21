import CreateModal from '../../molecules/CreateModal/CreateModal';
import {useState,useEffect, SetStateAction} from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { Button } from 'rsuite';
import { Link } from "react-router-dom";
import './UserDashboard.scss';
import UserTicket from '../../molecules/Table/TicketTable'; 
import logOut from '../../../public/logOut.png';

function UserDashboard() {

  const [ticket,SetTicket] = useState([]);
  const [show,setShow] = useState(false);

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [total,setTotal] = useState(1);
  
    const handleChangeLimit = (dataKey: SetStateAction<number>) => {
      setPage(1);
      // console.log("Datakey",dataKey);
      setLimit(dataKey);
    };


  const navigate = useNavigate();
  const cookies = new Cookies();

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

     const response =  axios.get(`http://localhost:8555/users/getAllTicketsInOrg?page=${page}&&limit=${limit}`,config).then((res)=>{
      // console.log(res.data,"Tickets");
      SetTicket(res.data.tickets);
      setTotal(res.data.totalPages);
      setPage(res.data.currentPage);
    }).catch((err)=>console.log(err));

  }, [limit,page]);

  const logout = async() =>{
    cookies.remove('accessToken');
    console.log("Log Out Successfully!");
  }


  return (
    <div className='main'>
      {/* <NavBar/> */}
      <div className='heading'><h1>User Dashboard</h1></div>
      <div className='log-out-btn'>
      <Link to='/'>
      <Button appearance='subtle' onClick={logout}>
        <img width={20} src={logOut}/>
      </Button>
      </Link></div>
      <div className='create-ticket'>
      <CreateModal/></div>
     
          <h2>Tickets</h2>
      <div className='ticket'>
        <UserTicket ticket={ticket} SetTicket={SetTicket} lim={limit} p={page} setP={setPage} fun={handleChangeLimit} t={total} st={setTotal}  />
      </div>
      
    </div>
  )

}
export default UserDashboard;
