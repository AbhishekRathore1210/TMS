// import React, { useState } from 'react';

// interface FormData {
//   type: string;
//   description: string;
//   email: string;
//   dueDate: string;
// }

// const initialFormData: FormData = {
//   type: '',
//   description: '',
//   email: '',
//   dueDate: ''
// };

// const TicketForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>(initialFormData);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // You can handle form submission here, for now just logging the data

//     const ticket = {...formData}; 
//     const response = await fetch("http://localhost:8555/users/dashboard/createTicket",{
//       method:'POST',
//       body:JSON.stringify(ticket),
//       headers:{
//         "Content-Type": "application/json",
//       }
//     });

//     const result = response.json();
//     console.log("Result",result);
//     if(response.ok){
//         console.log("Ticket genereated");
//     }

//     console.log(formData);
//     // Resetting the form after submission
//     setFormData(initialFormData);
//   };

//   return (
//     <div>
//       <h2>Create New Item</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="type">Type:</label>
//         <select id="type" name="type" value={formData.type} onChange={handleChange}>
//           <option value="">Select Type</option>
//           <option value="story">Story</option>
//           <option value="task">Task</option>
//           <option value="bug">Bug</option>
//         </select><br /><br />

//         <label htmlFor="description">Description:</label><br />
//         <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} cols={50}></textarea><br /><br />

//         <label htmlFor="email">Email:</label>
//         <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} /><br /><br />

//         <label htmlFor="dueDate">Due Date:</label>
//         <input type="date" id="dueDate" name="dueDate" value={formData.dueDate} onChange={handleChange} /><br /><br />

//         <input type="submit" value="Submit" />
//       </form>
//     </div>
//   );
// };

// export default TicketForm;


import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

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
      <h2>Create New Item</h2>
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
        

        <label htmlFor="email">Email:</label>
        <input type="email" id="assignee" name="assignee" value={formData.assignee} onChange={handleChange} /><br /><br />

        <label htmlFor="dueDate">Due Date:</label>
        <input type="date" id="dueDate" name="dueDate" value={formData.dueDate} onChange={handleChange} /><br /><br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default FormComponent;
