import { Button, Input } from 'rsuite'
import './LoginForm.scss'
import {  useEffect, useState } from 'react'
import { SelectPicker } from 'rsuite';
 
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import Cookies from 'js-cookie';
import LoginAPI from '../../services/LoginServices';
import { apiFetch } from '../../api';
import axiosRequest from '../../axios';

const LoginForm = () => {
  const [user, setUser] = useState("System");

  const [org, setOrg] = useState<string | null>("");
  const [orgName,setOrgName] = useState([]);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [toggle,setToggle] = useState(false);

  const navigate = useNavigate();

  const userType = Cookies.get('userType');

  const validateUser = ()=>{
    if(!otp){
      toast.error("Please Write OTP for login");
      return false;
    }
    return true;
  }
  useEffect(()=>{
    if(userType == 'user'){
      navigate('/users/dashboard');
      return;
    }
    if(userType == 'admin'){
      navigate('/admin/dashboard');
      return;
    }

    allOrganizationName();
  },[navigate, userType])

  const allOrganizationName = async()=>{
    const response = await axiosRequest.get('/org')
      console.log(response.data,'data');
      if(response.data.data.success){
        setOrgName(response.data.data.allOrg);
        console.log(response.data.data.allOrg);
      }
      else{
        console.log("error");
      }
    }

  const validateEmail = (email:string)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const validateOrg = ()=>{
    if(!otp){
      toast.error("Please Write OTP for login");
      return false;
    }
    if(!org){
      toast.error("Enter Organization Name");
      return false;
    }
    return true;
  }

  const handleSystem = async(e:FormSubmit) => {
    console.log('handleSystem <>>>>>>>>>');
    e.preventDefault();

    if(!validateUser()){
      return;
    }
    const user = {email,otp};
    const result = await LoginAPI.Login(user);
    console.log(result,">>> result");

    if(!result.success){
      console.log("Cannot Login");
      toast.error("Login Failed!");
      navigate('/login');
    }

    if(result.success){
      console.log('Login Success');
      const token = result.accessToken;
      Cookies.set("accessToken",token);
      Cookies.set('userType','admin');
      setOrg("");
      setEmail("");
      setOtp("");
      navigate('/admin/dashboard');
    }
  }
  const sendOTP = async()=>{
    
    if(!validateEmail(email)){
      toast.error("Enter valid Email!");
      return;
    }
    setToggle(true);

    const userEmail = {email,org};

    const result = await LoginAPI.OTP(userEmail);

    if(!result.success){
      toast.error("User Not Exists!");
      console.log("OTP NOT SENT");
    }
    else{
      toast.success("OTP sent successfully!");
      console.log("OTP has been sent!");
    }
    setTimeout(()=>setToggle(false),10000);
  }
  
  const handleOrganization =async (e:FormSubmit)=>{
    e.preventDefault();

    if(!validateOrg()){
      return;
    }

    const newUser = {email,org,otp};
    const result = await apiFetch("/users/login",{
        method:'POST',
        body:JSON.stringify(newUser),
        headers:{
          "Content-Type": "application/json",
        }
    });

    if(result){
      const token = result.accessToken;
      Cookies.set("accessToken",token);
      Cookies.set('userType','user');
    navigate('/users/dashboard');
    }
    else{
      toast.error(result.message);
      navigate('/login');
    }
  }


  return (
    <>
    <div className={'LoginContainer ' + user}>
        <div className='upperContainer'>
        <h4 >LOGIN</h4>
        <div className="userSelection">
            <span className='btn-sys'>
              <Button size='lg' color='blue' onClick={()=>setUser("System")} appearance={user=='System'?"primary":"default"} >System</Button>
            </span>
            <span className='btn-org'>
              <Button size='lg' color='blue' onClick={()=>setUser("Organization")} appearance={user=='Organization'?"primary":"default"} >Organization</Button>
            </span>
        </div>
        </div>

        <form onSubmit={user == 'System'? handleSystem : handleOrganization}>
          <SelectPicker searchable={false} data={orgName} labelKey='name' block valueKey='name' disabled={user =='System'?true:false} style={{ width: 224 }} onChange={(e:string | null)=>{setOrg((e))}} />

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