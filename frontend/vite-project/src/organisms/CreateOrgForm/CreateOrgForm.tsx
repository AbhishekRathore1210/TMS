import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "rsuite";
import { ToastContainer,toast } from "react-toastify";
import './CreateOrgForm.scss';
import { Cookies } from "react-cookie";

function RegisterForm(){
const [org , setOrg] = useState("");
const [error,setError] = useState("");

const cookies = new Cookies();
const navigate = useNavigate();

const handleSubmit = async(e:FormSubmit)=>{
    e.preventDefault();

    const orgName = {org};  
    const token:string | undefined = cookies.get('accessToken');
    // console.log(token);
    if(!token){
        navigate('/login');
        return;
    }
    const response = await fetch("http://localhost:8555/admin/dashboard/createOrg",{

        method:'POST',
        body:JSON.stringify(orgName),
        headers:{
            "Content-Type": "application/json",
            "authorization": `BEARER ${token}`
        }
    });
    
    const result = await response.json();
    // console.log(response);
    // console.log(result);

    if(!result.success){
        console.log("Organization is alreaedy created");
        toast.error(result.message);
        setOrg("");
        navigate('/dashboard/createOrg')
    }

    if(!response.ok){
        setError("Organization can't be created");
        toast.error(result.message);
        setOrg("");
        navigate('/admin/dashboard');
    }
    if(response.ok){
        setError("");
        setOrg("");
        navigate('/admin/dashboard');
    }
}

return(
    <>
    <div className="outer-div">
        <div className="errorContainer">
          {error && <div className="alert alert-danger" >{error}</div>}
        </div>
        <form onSubmit={handleSubmit}>
            <div className="org-field">
        <Input className='input' type="text" placeholder='Organization' onChange={(e: string)=>{setOrg((e))}}></Input>
        </div>
        <div className="sub-button">
        <Button type='submit' appearance='primary' size='lg'>Submit</Button>
        </div>
        </form>
    </div>
    <ToastContainer/>
    </>
)

}
export default RegisterForm