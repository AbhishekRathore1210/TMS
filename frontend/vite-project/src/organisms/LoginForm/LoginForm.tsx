import { Button, Input } from 'rsuite'
import './LoginForm.scss'
import {  useEffect, useState } from 'react'
import { SelectPicker, Stack } from 'rsuite';
import axios from 'axios'
 
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import { Cookies } from 'react-cookie';


function LoginForm() {
  const [user, setUser] = useState("System");


  const [error,setError] = useState("");
  const [org, setOrg] = useState<string | null>("");
  const [orgName,setOrgName] = useState([]);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [toggle,setToggle] = useState(false);


  let flag = false;

  const navigate = useNavigate();
  const cookies = new Cookies();

  const validateUser = ()=>{
    if(!otp){
      setError("Please Write OTP for login");
      toast.error("Please Write OTP for login");
      return false;
    }
    return true;
  }
  useEffect(()=>{
    allOrganizationName();
  },[])

  const allOrganizationName = async()=>{
    const response = await axios.get('http://localhost:8555/org')
      console.log(response.data,'data');
      if(response.data.data.success){
        // const formattedData = response.data.data.allOrg.map((e:any) => ({
        //   label: e.name,
        //   value: e.name// or any unique identifier
        // }));
        setOrgName(response.data.data.allOrg);
        console.log(response.data.data.allOrg);
      }
      else{
        console.log("error");
      }
    }

  const validateEmail = ()=>{
    if(!email){
      return false;
    }
    return true;
  }

  const validateOrg = ()=>{
    if(!otp){
      setError("Please Write OTP for login");
      toast.error("Please Write OTP for login");
      return false;
    }
    if(!org){
      setError("Please write name of the organization");
      toast.error("Enter Organization Name");
      return false;
    }
    return true;
  }

  const handleSystem = async(e:FormSubmit) => {
    e.preventDefault();

    if(!validateUser()){
      return;
    }
    const user = {email,otp};
    const response = await fetch("http://localhost:8555/admin/login",{
        method:'POST',
        body:JSON.stringify(user),
        headers:{
          "Content-Type": "application/json",
        }
    })
    const result = await response.json();

    if(!result.success){
      console.log("Cannot Login");
      toast.error("Login Failed!");
      navigate('/login');
    }

    if(!response.ok){
      setError(result.error);
      setError("");
      // setOrg("");
      // setEmail("");
      // setOtp("");
      navigate('/login');
    }

    if(response.ok){
      const token = result.accessToken;
      cookies.set("accessToken",token);
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
    setToggle(true);

    // console.log("otp api called");
    const userEmail = {email,org};
    const response = await fetch("http://localhost:8555/admin/otp",{
      method:'POST',
      body:JSON.stringify(userEmail),
      headers:{
        "Content-Type": "application/json",
      }
    });

    const result = await response.json();

    if(!result.success){
      toast.error("User Not Exists!");
      console.log("OTP NOT SENT");
    }
    else{
      toast.success("OTP sent successfully!");
      console.log("OTP has been sent!");
    }
    setTimeout(()=>setToggle(false),10000);
    // setToggle(false);
    // console.log(toggle,"after");
  }
  
  const handleOrganization =async (e:FormSubmit)=>{
    e.preventDefault();

    if(!validateOrg()){
      return;
    }

    const user = {email,org,otp};
    const response = await fetch("http://localhost:8555/users/login",{
        method:'POST',
        body:JSON.stringify(user),
        headers:{
          "Content-Type": "application/json",
        }
    });

    const result = await response.json();

    if(response.ok){
      const token = result.accessToken;
      cookies.set("accessToken",token);
    // toast.success(result.message);
    setTimeout(()=>navigate('/users/dashboard'),300);
    }
    else{
      console.log("Response is not ok");
      toast.error(result.message);
      navigate('/login');
    }
  }
  

  return (
    <>
    <div className={'LoginContainer ' + user}>
        <div className='upperContainer'>
        <h4 >LOGIN</h4>
        {/* <div className="underline"></div> */}
        <div className="userSelection">
            <span className='btn-sys'>
              <Button size='lg' color='blue' onClick={()=>setUser("System")} appearance={user=='System'?"primary":"default"} >System</Button>
            </span>
            <span className='btn-org'>
              <Button size='lg' color='blue' onClick={()=>setUser("Organization")} appearance={user=='Organization'?"subtle":"default"} >Organization</Button>
            </span>

        </div>
        </div>

        <form onSubmit={user == 'System'? handleSystem : handleOrganization}>


          <SelectPicker searchable={false} data={orgName} labelKey='name' block className='org-selectpicker' valueKey='name' disabled={user =='System'?true:false} style={{ width: 224 }} onChange={(e:string | null)=>{setOrg((e))}} />

          <Input type="email" value={email} placeholder='E-mail' onChange={(e: string)=>{setEmail((e))}}></Input>

          <div className="otpContainer">
            <Input type='number' value={otp} onChange={(e:string)=>{setOtp((e))}} placeholder='OTP'></Input>
            <Button size='md' appearance='default' disabled={toggle} onClick={sendOTP} >Get OTP</Button>
          </div>
        <span className='sub'><Button type='submit' color='red' appearance='primary' size='lg'>Submit</Button></span>
        </form>
    </div>
        <ToastContainer/>
        </>
  )
}

export default LoginForm