import { Button, Input } from 'rsuite'
import './RegisterForm.scss'
import { useNavigate  } from 'react-router-dom'
import { useState } from 'react'
 
import "react-toastify/dist/ReactToastify.css";
 
// toast.configure();


function RegisterForm() {
  const [user, setUser] = useState("Organization");
  const [firstName, setFirstname] = useState("")
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [dob, setDOB] = useState("");
  const [doj, setDOJ] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateOrgUser = ()=>{

    if(!email || !firstName || !lastName){
      setError("Fill All the Details");
      return false;
    }

    let hasNumbers = /\d/.test(firstName);
    let hasNumbers2 = /\d/.test(lastName);
    if(hasNumbers){
      setError("Name field should not contains any Number inside it");
      return false;
    }

    if(hasNumbers2){
      setError("Name field should not contains any Number inside it");
      return false;
    }
    return true;
  }


  const validateUser = ()=>{
    if(!email || !firstName || !lastName){
      setError("Fill All the Details");
      return false;
    }

    let hasNumbers = /\d/.test(firstName);
    let hasNumbers2 = /\d/.test(lastName);
    if(hasNumbers){
      setError("Name field should not contains any Number inside it");
      return false;
    }

    if(hasNumbers2){
      setError("Name field should not contains any Number inside it");
      return false;
    }
    return true;
  }

  const handleSystem = async(e:FormSubmit)=>{
    e.preventDefault();

    //validations
    if(!validateUser()){
      return;
    }

    console.log("api is called");

    const adminUser = {firstName,lastName,email};
    const response = await fetch("http://localhost:8555/admin/register",{
      method:'POST',
      body:JSON.stringify(adminUser),
      headers:{
        "Content-Type": "application/json",
      }
    })

    if(response.status == 400){
      setError("");
      setFirstname("");
      setLastname("");
      setEmail("");
      console.log("User is Already Registered!");
      navigate("/register");
    }

    const result = await response.json();

    if(!response.ok){
      setError(result.error);
    }

    if(response.ok){
      setError("");
      setFirstname("");
      setLastname("");
      setEmail("");
      navigate("/login")
    }
  }


  const handleOrganization = async(e:FormSubmit)=>{
    e.preventDefault();
    // console.log('chal rha h ');
    const addOrgUser = {firstName, lastName, email, org, dob, doj};

    if(!validateOrgUser()){
      return;
    }

    const response = await fetch("http://localhost:8555/users/register", {
      method: 'POST',
      body : JSON.stringify(addOrgUser),
      headers: {
        "Content-Type": "application/json",
      }
    })
    console.log(response);
    if(response.status == 400){
      setError("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setOrg("");
      setDOB("");
      setDOJ("");
      console.log("User is Already Registered!");
      navigate("/login");
    }

    const result = await response.json();

    if(!response.ok){
      console.log(result.error);
      setError(result.error);
    }

    if(response.ok){
      setError("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setOrg("");
      setDOB("");
      setDOJ("");
      navigate("/login")
    }

  }

  return (
    <div className={'RegisterContainer ' + user}>
        <div className="errorContainer">
          {error && <div className="alert alert-danger" >{error}</div>}
        </div>
        <h3 className='heading'>Register</h3>
        <div className="underline"></div>
        <div className="userSelection">
          
          <span className='btn'>
            <Button size='lg' color='cyan' onClick={()=>{setUser("System")}}  appearance='subtle'>System</Button></span><span>
            <Button size='lg' color='cyan' onClick={()=>{setUser("Organization")}} appearance={user == "Organization"? "primary" : "default"}>Organization</Button></span>
        </div>

        <form onSubmit={user=='System'?handleSystem :handleOrganization}>
          <Input type="text" placeholder='First Name' value={firstName} onChange={(e: string)=>{setFirstname((e))}}></Input>
          <Input type='text' placeholder='Last Name' value={lastName} onChange={(e: string)=>{setLastname((e))}}></Input>
          <Input type="email" value={email} placeholder='E-mail' onChange={(e: string)=>{setEmail((e))}}></Input>
          <Input type="text" value={org} disabled={user == "System"? true : false} placeholder='Organization' onChange={(e: string)=>{setOrg((e))}}></Input>

          <div className="dateContainer">
            <label className="form-label">Date of Birth</label>
            <Input type='date' disabled={user == "System"? true:false} value={dob} onChange={(e:string)=>{setDOB((e))}}></Input>
          </div>

          <div className="dateContainer">
            <label className="form-label">Date of Joining</label>
            <Input disabled={user == "System"? true : false} value={doj} type='date' onChange={(e: string)=>{setDOJ(e)}}></Input>
          </div>

          <Button type='submit' color='red' appearance='primary' size='lg' >Submit</Button>
        </form>
    </div>
    
  )
}

export default RegisterForm