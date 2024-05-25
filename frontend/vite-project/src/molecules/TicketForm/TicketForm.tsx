import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import {Button, Input} from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast} from 'react-toastify'
import './TicketForm.scss'

interface FormData {
  type: string;
  summary: string;
  description: string;
  assignee: string;
  dueDate: string;
}
interface IUsertickets{
  ticketId:string,
  status:string,
  assignee:string
}

interface IUser{
  firstName:string,
  lastName:string,
  email:string,
  org:string,
  is_admin:boolean,
  organization_list:string[],
  is_verified:boolean,
  otp?:string,
  dob?:Date,
  doj?:Date,
  ticketCount?:Number,
  tickets?:Array<IUsertickets>
}


const initialFormData: FormData = {
  type: '',
  description: '',
  assignee: '',
  dueDate: '',
  summary: ''
};

const FormComponent = ({fun}:any) => {
  
const cookies = new Cookies();
const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [user,SetUser] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const token:string | undefined = cookies.get('accessToken');
  if(!token){
    navigate('/login');
    return;
}

  useEffect(() => {
    if(!token){
      navigate('/login');
      return;
    }
    fetchEmailOptions();
  }, []);

  const fetchEmailOptions = async () => {
    const response = await fetch('http://localhost:8555/users/users-in-organization', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `BEARER ${token}`
      },
    });
    const result = await response.json();
    console.log("Response",result);

    const mapData = result.users.map((user:IUser)=>user.email);
    // console.log("mapData",mapData);
    SetUser(mapData);
  };

  

  const validateTicket = () =>{
    if(!formData.type || !formData.assignee || !formData.description || !formData.summary){
      toast.error("Fill All the fields");
      console.log('fill details');
      return false;
    }
    return true;
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTicket();

    if(!validateTicket()){
      return;
    }
  }
    const createTicket = async()=>{
    const ticket = {...formData}; 
    const response = await fetch("http://localhost:8555/users/dashboard/create-ticket",{
      method:'POST',
      body:JSON.stringify(ticket),
      headers:{
        "Content-Type": "application/json",
        "authorization": `BEARER ${token}`
      }
    });

    const result = await response.json();
    if(response.ok){
      fun();
      alert("Ticket Generated");
        console.log("Ticket genereated");
        
    }
    setFormData(initialFormData);
    
  };
  const today = new Date();

  const getMinDate = () =>{
    console.log(new Date());
    const today = new Date();
    today.setFullYear(today.getFullYear());
    console.log(today.toISOString());
    return today.toISOString()
  }

  return (
    <div>
      <h2>Generate New Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="type">Type:</label>
        <select id="type" name="type" value={formData.type} onChange={handleChange}>
          <option value="">Select Type</option>
          <option value="Story">Story</option>
          <option value="Task">Task</option>
          <option value="Bug">Bug</option>
        </select><br /><br />

        <label htmlFor="summary">Summary:</label><br />
        <textarea id="summary" name="summary" value={formData.summary} onChange={handleChange} rows={4} cols={50}></textarea><br /><br />

        <label htmlFor="description">Description:</label><br />
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} cols={50}></textarea><br /><br />
        

        <label htmlFor="assignee">Email:</label>
        <select id="assignee" name="assignee" value={formData.assignee} onChange={handleChange}>
          <option value="">Select Email</option>
          {user.map((email) => (
            <option key={email} value={email}>{email}</option>
          ))}
        </select><br /><br />

        <label htmlFor="dueDate">Due Date:</label>
        <input type="date" id="dueDate" name="dueDate" value={formData.dueDate} max='2025-05-20' onChange={handleChange} /><br /><br />

        {/* <input type="submit" value="Submit" /> */}
        <Button size='lg' type='submit' color='red' appearance='primary'>Submit</Button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default FormComponent;
