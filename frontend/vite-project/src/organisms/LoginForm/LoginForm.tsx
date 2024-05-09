import { Button, Input } from 'rsuite'
import './LoginForm.scss'
import { useState } from 'react'
import './types.d.ts'
import { useNavigate } from 'react-router-dom';


function RegisterForm() {
  const [user, setUser] = useState("System");
  const [error,setError] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const validateUser = ()=>{
    if(!otp){
      setError("Please Write OTP for login");
      return false;
    }
    return true;
  }

  const validateEmail = ()=>{
    if(!email){
      setError("Please Write your Email");
      return false;
    }
    return true;
  }

  const validateOrg = ()=>{
    if(!otp){
      setError("Please Write OTP for login");
      return false;
    }
    if(!org){
      setError("Please write name of the organization");
      return false;
    }
    return true;
  }

  const handleSystem = async(e:FormSubmit) => {
    e.preventDefault();

    if(!validateUser()){
      return;
    }
    console.log("api called");
    const user = {email,otp};
    const response = await fetch("http://localhost:8555/admin/login",{
        method:'POST',
        body:JSON.stringify(user),
        headers:{
          "Content-Type": "application/json",
        }
    })
    const result = await response.json();

    console.log(result);

    if(result.success == false){
      console.log("Cannot Login");
      navigate('/admin/login');
    }

    if(!response.ok){
      setError(result.error);
      setError("");
      setOrg("");
      setEmail("");
      setOtp("");
      navigate('/login');
    }

    if(response.ok){
      setError("");
      setOrg("");
      setEmail("");
      setOtp("");
      navigate('/dashboard');
    }
  }


  const sendOTP = async()=>{
    
    if(!validateEmail()){
      return;
    }

    console.log("otp api called");
    const userEmail = {email};
    const response = await fetch("http://localhost:8555/admin/otp",{
      method:'POST',
      body:JSON.stringify(userEmail),
      headers:{
        "Content-Type": "application/json",
      }
    });

    const result = await response.json();

    console.log(response);
    console.log(result);

    if(!result.success){
      console.log("OTP NOT SENT");
    }
    else{
      console.log("OTP has been sent!");
    }
  }
  
  const handleOrganization =async (e:FormSubmit)=>{
    e.preventDefault();

    if(!validateOrg()){
      return;
    }
    
  }

  return (
    <div className={'LoginContainer ' + user}>
        <div className='upperContainer'>
        <div className="errorContainer">
          {error && <div className="alert alert-danger" >{error}</div>}
        </div>
        <h3>Login</h3>
        <div className="underline"></div>
        <div className="userSelection">
            <Button size='lg' onClick={()=>{setUser("System")}}  appearance={user == "System"? "ghost" : "default"}>System</Button>
            <Button size='lg' onClick={()=>{setUser("Organization")}} appearance={user == "Organization"? "ghost" : "default"}>Organization</Button>
        </div>
        </div>

        <form onSubmit={user == 'System'? handleSystem : handleOrganization}>
          <Input disabled={user == 'System'? true : false} value={org} type="text" placeholder='Organization' onChange={(e: string)=>{setOrg((e))}}></Input>
          <Input type="email" value={email} placeholder='E-mail' onChange={(e: string)=>{setEmail((e))}}></Input>

          <div className="otpContainer">
            <Input type='text' value={otp} onChange={(e:string)=>{setOtp((e))}} placeholder='OTP'></Input>
            <Button appearance='default' onClick={sendOTP}>Get OTP</Button>
          </div>

          <Button type='submit' appearance='primary' size='lg'>Submit</Button>
        </form>
    </div>
    
  )
}

export default RegisterForm