import { Button, Input } from 'rsuite'
import './RegisterForm.scss'
import { useNavigate  } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import CustomDropdown from '../DropDown/DropDown'
import { Cookies } from 'react-cookie'

function RegisterForm() {
  const [user, setUser] = useState<string | null>("Organization");
  const [firstName, setFirstname] = useState("")
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState<string | null>("");
  const [dob, setDOB] = useState("");
  const [doj, setDOJ] = useState("");
  const [error, setError] = useState("");

  const cookies = new Cookies();

  const navigate = useNavigate();
  const token:string | undefined = cookies.get('accessToken');

  useEffect(()=>{
    if(!token){
      navigate('/login');
      return;
  }
  })

  const validateOrgUser = ()=>{
    if(!email || !firstName || !lastName){
      toast.error("Fill All the Details");
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
        Authorization:`BEARER ${token}`
      }
    })
    const result = await response.json();

    if(response.status == 400){
      setError("");
      setFirstname("");
      setLastname("");
      setEmail("");
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
    }
  }
  const handleOrganization = async(e:FormSubmit)=>{
    e.preventDefault();
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
    const result = await response.json();
    console.log(result);

    if(!response.ok){
      setError("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setOrg("");
      setDOB("");
      setDOJ("");
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
      navigate("/admin/dashboard");
    }
  }

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMinDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 120);
    return today.toISOString().split('T')[0];
  };

  return (
    <>
    <div className="errorContainer">
        </div>
    <div className={'RegisterContainer ' + user}>
        <h4 className='heading'>REGISTER</h4>
        <form onSubmit={user=='System'?handleSystem :handleOrganization}>
          <div className='name-div'>
            <span className='name-span'>First Name</span>
          <Input type="text" placeholder='First Name' value={firstName} onChange={(e: string)=>{setFirstname((e))}}></Input></div>
          <div className='name-div'>
            <span className='name-span'>Last Name</span>
          <Input type='text' placeholder='Last Name' value={lastName} onChange={(e: string)=>{setLastname((e))}}></Input></div>
          <div className='name-div'>
            <span className='name-span'>Email</span>
          <Input type="email" value={email} placeholder='E-mail' onChange={(e: string)=>{setEmail((e))}}></Input></div>

          <div className='name-div'>
            <span className='name-span'>Organization</span>
          <CustomDropdown user = {user} setUser = {setUser} org={org} setOrg={setOrg}/>
            </div>
          <div className="dateContainer">
            <label className="form-label">Date of Birth</label>
            <Input type='date' disabled={user=="System"?true:false} value={dob} onChange={(e:string)=>{setDOB((e))}}  max={getCurrentDate()} min={getMinDate()}></Input>
          </div>
          <div className="dateContainer">
            <label className="form-label">Date of Joining</label>
            <Input disabled={user=="System"?true:false} value={doj} type='date' onChange={(e: string)=>{setDOJ(e)}}></Input>
          </div>
          <Button className='sub-btn' type='submit' color='red' appearance='primary' size='lg' >Submit</Button>
        </form>
    </div>
    <ToastContainer/>
    </>
  )
}
export default RegisterForm