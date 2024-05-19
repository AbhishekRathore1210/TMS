import CreateModal from '../../molecules/CreateModal/CreateModal';
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { Button } from 'rsuite';
import { Link } from "react-router-dom";
import './UserDashboard.scss';
import NavBar from '../../molecules/NavBar/NavBar';
import UserTicket from '../../molecules/Table/TicketTable'; 

function UserDashboard() {

  const [ticket,SetTicket] = useState([]);

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

     const response =  axios.get("http://localhost:8555/users/getAllTicketsInOrg",config).then((res)=>{
      console.log(res.data,"Tickets");
      SetTicket(res.data.tickets);
    }).catch((err)=>console.log(err));

  }, []);

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
      <Button appearance='primary' color='red' onClick={logout}>Log Out</Button>
      </Link></div>
      <div className='create-ticket'>
      <CreateModal/></div>
     
          <h2>Tickets</h2>
      <div className='ticket'>
        <UserTicket ticket={ticket}/>
      </div>
      
    </div>
  )

}
export default UserDashboard;
