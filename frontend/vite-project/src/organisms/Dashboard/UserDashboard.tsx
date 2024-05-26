import CreateModal from '../../molecules/CreateModal/CreateModal';
import {useState,useEffect, SetStateAction} from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { Button } from 'rsuite';
import { Link } from "react-router-dom";
import './UserDashboard.scss';
import UserTicket from '../../molecules/Table/TicketTable'; 
import logOut1 from '../../../public/logOut1.png';
import { Modal } from 'rsuite';
import { SelectPicker, Stack,Input } from 'rsuite';

function UserDashboard() {

  const type = ['Story','Task','Bug'].map(
    item => ({ label: item, value: item })
  );

  const statuss = ['TOBEPICKED','INPROGRESS','INTESTING','COMPLETED'].map(
     item =>({label:item,value:item})
  );
  
  const [ty,setTy] = useState<string | null>("");
  const [st,setSt] = useState<string | null>("");
  const [cd,setCd] = useState<string | null>("");
  const [ud,setUd] = useState<string | null>("");
  const [dd,setDd] = useState<string | null>("");
  const [open2, setOpen2] = useState(false);

  const handleOpen = () => {
    setOpen2(true);
  };

  const handleClose = () => setOpen2(false);


  const [ticket,SetTicket] = useState([]);
  const [show,setShow] = useState(false);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total,setTotal] = useState(1);
  
    const handleChangeLimit = (dataKey: SetStateAction<number>) => {
      setPage(1);
      // console.log("Datakey",dataKey);
      setLimit(dataKey);
    };

    const handleSubmit = async(e:FormSubmit) =>{
      e.preventDefault();
      const filterValue = {ty, st, cd, ud, dd};
      // console.log(filterValue,'Filter **********');
    }
    // 

  const navigate = useNavigate();
  const cookies = new Cookies();

  const token:string | undefined = cookies.get('accessToken');

  useEffect(()=>{
    getAllTicketInOrg();
  },[limit,page,ty,st,cd,ud,dd])

    const getAllTicketInOrg = async()=>{
    if(!token){
      navigate('/login');
      return;
    }
    const config = {
      headers: {
        Authorization: `BEARER ${token}`,
        'Custom-Header': 'Custom Value',
      },
    }; // dd?"&dd=${dd}:'' "

  
     const response =  axios.get(`http://localhost:8555/users/tickets-in-org?page=${page}&&limit=${limit}&&type=${ty}&&status=${st}&&cd=${cd}&&ud=${ud}&&dd=${dd}`,config).then((res)=>{
      console.log(res.data,"Tickets");
      SetTicket(res.data.tickets);
      setTotal(res.data.totalPages);
      setPage(res.data.currentPage);
    }).catch((err)=>console.log(err));

  }

  const logout = async() =>{
    cookies.remove('accessToken');
    console.log("Log Out Successfully!");
  }

  const handleRemove = ()=>{
    setCd("");
    setDd("");
    setTy("");
    setUd("");
    setSt("");
  }


  return (
    <div className='main'>
      {/* <NavBar/> */}
      <div className='heading'><h1>User Dashboard</h1></div>
      <div className='log-out-btn'>
      <Link to='/'>
      <Button appearance='default' onClick={logout}>
        <img width={20} src={logOut1}/>
      </Button>
      </Link></div>
      <div className='create-ticket'>
      <CreateModal fun={getAllTicketInOrg}/></div>
     
          <h2>Tickets</h2>
          
          <div className='parent-filter-btn'>
            <h4 className='type-filter'>Type</h4>
    <SelectPicker className='type-filter-picker'
      data={type}
      searchable={false}
      style={{ width: 224 }}
      onChange={(value)=>{
        if(value){
          setTy(value)
        }
        else{
          setTy("");
        }
      }}
    />
      <h4 className='type-filter'>Status</h4>
    {/* <h4>Status</h4> */}
    <SelectPicker className='status-filter-picker'
      data={statuss}
      searchable={false}
      style={{ width: 224 }}
      onChange={(value)=>{
        if(value){
        setSt(value)}
        else{setSt("");}
      }}
    />
      {/* <Button className='filter-btn' onClick={handleRemove}>Clear</Button> */}
      </div>
          {/* <Button className='filter-btn' onClick={handleOpen}>Filter</Button> */}
      <div className='ticket'>
        <UserTicket ticket={ticket} SetTicket={SetTicket} lim={limit} p={page} setP={setPage} fun={handleChangeLimit} t={total} st={setTotal} getTicket={getAllTicketInOrg}  />
      </div>

            <Modal open={open2} onClose={handleClose} className="custom-modal">
        <Modal.Header>
          <Modal.Title>Apply Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
          <label>Type:</label>
        <Stack spacing={10} direction="column" alignItems="flex-start">
    <SelectPicker
      data={type}
      searchable={false}
      style={{ width: 224 }}
      onChange={(value)=>setTy(value)}
    />
  </Stack>
    <br></br>
    <label>Status:</label>
  <Stack spacing={10} direction="column" alignItems="flex-start">
    <SelectPicker
      data={statuss}
      searchable={false}
      style={{ width: 224 }}
      onChange={(value)=>setSt(value)}
    />
  </Stack>
  <br></br>
    <label>Created Date:</label> 
    <Input className="create-date" type='date' onChange={(e)=>setCd((e))}></Input>

    <br></br>
    <label>Updated Date:</label>
    <Input className="create-date" type='date' onChange={(e)=>setUd((e))}></Input>

    <br></br>
    <label>Due Date:</label>
    <Input className="create-date" type='date' onChange={(e)=>setDd((e))}></Input>
    <br></br>
    {/* <Button type='submit' onClick={handleClose}>Apply</Button><br></br> */}
    </form>
        </Modal.Body>
      </Modal>
    </div>
  )

}
export default UserDashboard;
