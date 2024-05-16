import { Button, Input } from 'rsuite'
import './RegisterForm.scss'
import { useNavigate  } from 'react-router-dom'
import { useState } from 'react'
import { ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
 import CustomDropdown from '../DropDown/DropDown'
// toast.configure();


function RegisterForm() {
  const [user, setUser] = useState("Organization");
  const [firstName, setFirstname] = useState("")
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState<string | null>("");
  const [dob, setDOB] = useState("");
  const [doj, setDOJ] = useState("");
  const [error, setError] = useState("");
  const [data,setData] =  useState([]);

  const navigate = useNavigate();

  const validateOrgUser = ()=>{
    if(!email || !firstName || !lastName){
      toast.error("Fill All the Details");
      // setError("Fill All the Details");
      return false;
    }

    let hasNumbers = /\d/.test(firstName);
    let hasNumbers2 = /\d/.test(lastName);
    if(hasNumbers){
      toast.error("Invalid Name");
      setError("Name field should not contains any Number inside it");
      return false;
    }

    if(hasNumbers2){
      toast.error("Invalid Name");
      setError("Name field should not contains any Number inside it");
      return false;
    }
    return true;
  }


  const validateUser = ()=>{

    if(!email || !firstName || !lastName){
      toast.error("Fill All the Details");
      setError("Fill All the Details");
      return false;
    }

    let hasNumbers = /\d/.test(firstName);
    let hasNumbers2 = /\d/.test(lastName);
    if(hasNumbers){
      toast.error("Invalid Name");
      setError("Name field should not contains any Number inside it");
      return false;
    }

    if(hasNumbers2){
      toast.error("Invalid Name");
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

    const result = await response.json();

    if(response.status == 400){
      setError("");
      setFirstname("");
      setLastname("");
      setEmail("");
      // console.log("User is Already Registered!");
      toast.error("User is Already Registered!");
      navigate("/register");
    }

    

    if(!response.ok){
      setError(result.error);
    }

    if(response.ok){
      setError("");
      setFirstname("");
      setLastname("");
      setEmail("");
      navigate('/login');
      // navigate("/login")
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
    // console.log(response);
    const result = await response.json();


    console.log(result);
    if(!result.success){
      setError("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setOrg("");
      setDOB("");
      setDOJ("");
      toast.error(result.message);
      navigate('/register');
    }
    else{
      setError("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setOrg("");
      setDOB("");
      setDOJ("");
      toast.success(result.message);
      navigate('/login');
    }
   

    if(!response.ok){
      console.log(result.error);
      setError(result.error);
      toast.error(result.message);
    }

    if(response.ok){
      setError("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setOrg("");
      setDOB("");
      setDOJ("");
      toast.success(result.message);
      navigate("/login");
    }

  }

  return (
    <>
    <div className="errorContainer">
          {/* {error && <div className="alert alert-danger" >{error}</div>} */}
        </div>
    <div className={'RegisterContainer ' + user}>
        
        <h3 className='heading' style={{color:'black'}}>REGISTER</h3>
        <div className="underline"></div>
        <div className="userSelection">
          <span>
            <Button className='btn' size='lg' color='orange' onClick={()=>{setUser("System")}}  appearance={user=='System'?'ghost':'default'}>System</Button></span>
            <span><Button className='btn2' size='lg' color='orange' onClick={()=>{setUser("Organization")}} appearance={user=='Organization'?'ghost':'default'}>Organization</Button></span>
        </div>

        <form onSubmit={user=='System'?handleSystem :handleOrganization}>
          <Input type="text" placeholder='First Name' value={firstName} onChange={(e: string)=>{setFirstname((e))}}></Input>
          <Input type='text' placeholder='Last Name' value={lastName} onChange={(e: string)=>{setLastname((e))}}></Input>
          <Input type="email" value={email} placeholder='E-mail' onChange={(e: string)=>{setEmail((e))}}></Input>

          <CustomDropdown org={org} setOrg={setOrg}/>

          <div className="dateContainer">
            <label className="form-label">Date of Birth</label>
            <Input type='date' disabled={user=="System"?true:false} value={dob} onChange={(e:string)=>{setDOB((e))}}></Input>
          </div>

          <div className="dateContainer">
            <label className="form-label">Date of Joining</label>
            <Input disabled={user=="System"?true:false} value={doj} type='date' onChange={(e: string)=>{setDOJ(e)}}></Input>
          </div>

          <Button className='sub-btn' type='submit' color='green' appearance='subtle' size='lg' >Submit</Button>
        </form>
    </div>
    <ToastContainer/>
    </>
  )
}

export default RegisterForm