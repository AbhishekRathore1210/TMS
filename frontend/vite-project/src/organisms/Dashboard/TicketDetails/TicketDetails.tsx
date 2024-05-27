import { useState} from 'react';
import {Button} from 'rsuite';
import './TicketDetails.scss'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// import { Cookies } from "react-cookie";
import Cookies from 'js-cookie';
import { ToastContainer,toast } from 'react-toastify';

interface Ihistory {
  userName: string;
  fieldName: string;
  oldValue: string;
  newValue: string;
}

function TicketDetails(props:any) {

    const oneTicketData = props.d;
    console.log(oneTicketData,'data');


    let upDate = props.d.updatedDate;
    // console.log(props.d.updatedDate);
    let dueDate = props.d.dueDate;
    upDate = upDate.split('T')[0];
    dueDate = dueDate.split('T')[0];

    const type = ['Story','Task','Bug'].map(
        item => ({ label: item, value: item })
      );

      const statuss = ['TOBEPICKED','INPROGRESS','INTESTING','COMPLETED'].map(
        item =>({label:item,value:item})
     );

      const [disableData,setDisableData] = useState(true);

      const EnableData = ()=>{
        setDisableData(!disableData);
      }

      const navigate = useNavigate();
      // const cookies = new Cookies();

      const token:string | undefined = Cookies.get('accessToken');

      const updateTicket = async() =>{
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

        const updatedTicket = props.d;
        console.log(updatedTicket,'********');
        const response = await axios.put("http://localhost:8555/users/ticket",updatedTicket,config)
        
        console.log("Response",response.data);

        if(response.data.data.success){
          toast.success(response.data.data.message);
          // console.log(response.data.data.message,'toast not working');
          props.getTicket();
        }
        props.funClose();
      }

      const handleChange = (e:any ) => {
        const name = e.target.name;
        const value = e.target.value;
        props.setD({
            ...props.d,
            [name]: value
          });
      };



  return (
    <>
    <div>
            <div className='parent-edit-btn'>
            <Button className='edit-btn' appearance='primary' color='red' disabled={!disableData} onClick={EnableData}>Edit</Button>
            <Button className='save-btn' disabled={disableData} color='green' appearance='primary' onClick={updateTicket}>Save</Button></div>
    <label>Type:{'  '}</label>
    <select name="type" onChange={handleChange} value={props.d.type} disabled={disableData} >
  <option value="Task">Task</option>
  <option value="Story">Story</option>
  <option value="Bug">Bug</option>
  </select>
    <br></br><br></br>
    
    {/* <SelectPicker
      data={type}
      searchable={false}
      disabled={disableData}
      value={props.d.type}
      style={{ width: 224 }}
      onChange={(e)=>{props.setD({...props.d,type:e})}}
    /> */}

    <label>Status: {'  '}</label>
    <select name="status" onChange={handleChange} value={props.d.status} disabled={disableData}>
  <option value="TOBEPICCKED">TOBEPICCKED</option>
  <option value="INTESTING">INTESTING</option>
  <option value="COMPLETED">COMPLETED</option>
  <option value="INTESTING">INPROGRESS</option>
  </select>
    <br></br><br></br>
  <label>Key :{'  '}</label>
  <input className='edit-ticket-input' type='text' name='key' value={props.d.key} disabled onChange={handleChange}></input><br></br>

  <label htmlFor="summary">Summary:{'  '}</label><br />
  <textarea rows={4} cols={70} name='summary' value={props.d.summary} disabled={disableData} onChange={handleChange}></textarea ><br></br><br></br>

  <label htmlFor="description">Description: {'  '}</label><br />
  <textarea rows={4} cols={70} name='description' value={props.d.description} disabled={disableData} onChange={handleChange}></textarea><br></br><br></br>


  <label>Assignee: {'  '} </label>
  <input className='edit-ticket-input' type='email' name='assignee' value={props.d.assignee} disabled onChange={handleChange}></input>
  <br></br>
  <label>Reporter: {'  '} </label>
  <input className='edit-ticket-input' type='email' name='reporter' value={props.d.reporter} disabled
  onChange={handleChange}></input><br></br>

  <label>Created Date: {'  '}</label>
  <input className='edit-ticket-input' type='date' name='createdDate' value={props.d.createdDate.split('T')[0]} disabled
  onChange={handleChange}></input><br></br>

<label>Updated Date: {'  '}</label>
  <input className='edit-ticket-input' type='date' name='updatedDate' value={props.d.updatedDate.split('T')[0]} disabled
  onChange={handleChange}></input>

<label>Due Date: {'  '}</label>
  <input className='edit-ticket-input' type='date' name='dueDate' value={props.d.dueDate.split('T')[0]} disabled
  onChange={handleChange}></input>
<br></br>
  <label>History: {'  '}</label>
    {
      props.d.history.map((e:Ihistory,i:any)=>(
        <div key={i}>
        <p>
          <strong>{e.userName}</strong> {' '} updated {" "} 
          <strong>{e.fieldName}</strong> from {" "}
          <strong>{e.oldValue}</strong> to{' '}
          <strong>{e.newValue}</strong>
        </p>
        </div>
      ))
    }

    </div>
    {/* <ToastContainer/> */}
    </>
  )
}

export default TicketDetails;
