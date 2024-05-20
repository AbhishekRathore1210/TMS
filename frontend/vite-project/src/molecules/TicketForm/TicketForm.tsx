
import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import CustomDropdown from '../../organisms/DropDown/DropDown';

interface FormData {
  type: string;
  summary: string;
  description: string;
  assignee: string;
  dueDate: string;
}


const initialFormData: FormData = {
  type: '',
  description: '',
  assignee: '',
  dueDate: '',
  summary: ''
};

const FormComponent: React.FC = () => {

  
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
  useEffect(() => {
    if(!token){
      navigate('/login');
      return;
    }
    const fetchEmailOptions = async () => {
      const response = await fetch('http://localhost:8555/users/showAllUsersInOrg', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `BEARER ${token}`
        },
      });
      const result = await response.json();
      console.log("Response",result);

      const mapData = result.users.map((user:any)=>user.email);
      console.log("mapData",mapData);
      SetUser(mapData);
    };
    fetchEmailOptions();
  }, []);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token:string | undefined = cookies.get('accessToken');
    console.log('**************************');
    console.log("Token",token);
    if(!token){
      navigate('/login');
      return;
  }

    console.log("inside handlesubmit");
    const ticket = {...formData}; 
    const response = await fetch("http://localhost:8555/users/dashboard/createTicket",{
      method:'POST',
      body:JSON.stringify(ticket),
      headers:{
        "Content-Type": "application/json",
        "authorization": `BEARER ${token}`
      }
    });

    console.log("outside handlesubmit");
    const result = await response.json();
    console.log("Result",result);
    if(response.ok){
        console.log("Ticket genereated");
    }

    console.log(formData);
    setFormData(initialFormData);
  };

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
        <input type="date" id="dueDate" name="dueDate" value={formData.dueDate} onChange={handleChange} /><br /><br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default FormComponent;
