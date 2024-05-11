import { Button, Input } from 'rsuite'
import './LoginForm.scss'
import { useEffect, useState } from 'react'
// import './types'
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';


function LoginForm() {
  const [user, setUser] = useState("System");
  const [error,setError] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    toast.success("Registerd Succesfully! Kindly Login");
  }, [])

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
    // console.log("api called");
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
    console.log(result.success);

    if(!result.success){
      console.log("Cannot Login");
      toast.error("Login Failed!");
      navigate('/login');
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
      navigate('/admin/dashboard');
    }
  }


  const sendOTP = async()=>{
    
    if(!validateEmail()){
      toast.error("Enter your Email first!");
      return;
    }

    // if(!otp){
    //   toast.error("Enter Your OTP");
    //   return;
    // }

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
    <>
    <div className={'LoginContainer ' + user}>
        <div className='upperContainer'>
        {/* <div className="errorContainer">
          {error && <div className="alert alert-danger" >{error}</div>}
        </div> */}
        <h3 >Login</h3>
        <div className="underline"></div>
        <div className="userSelection">
            <Button size='lg' color='blue' onClick={()=>{setUser("System")}}  appearance={user == "System"? "primary" : "default"}>System</Button>
            <Button size='lg'color='blue' onClick={()=>{setUser("Organization")}} appearance={user == "Organization"? "primary" : "default"}>Organization</Button>
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
        <ToastContainer/>
        </>
  )
}

export default LoginForm