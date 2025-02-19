import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "rsuite";
import { ToastContainer,toast } from "react-toastify";
import './CreateOrgForm.scss';
// import { Cookies } from "react-cookie";
import Cookies from "js-cookie";

function RegisterForm(){
const [org , setOrg] = useState("");
const [error,setError] = useState("");

// const cookies = new Cookies();
const navigate = useNavigate();
const token:string | undefined = Cookies.get('accessToken');
useEffect(()=>{
    if(!token){
        navigate('/login');
        return;
    }
})

const handleSubmit = async(e:FormSubmit)=>{
    e.preventDefault();

    console.log("outside trim");
    if(!org.trim()){
        console.log("Inside trim");
        toast.error("Invalid Name")
        console.log("Organization cannot be created with empty Name");
        return;
    }
    
    const orgName = {org};  
    
    const response = await fetch("http://localhost:8555/admin/organization",{

        method:'POST',
        body:JSON.stringify(orgName),
        headers:{
            "Content-Type": "application/json",
            "authorization": `BEARER ${token}`
        }
    });
    
    const result = await response.json();

    // if(!result.success){
    //     console.log("Organization is alreaedy created");
    //     toast.error(result.message);
    //     setOrg("");
    //     navigate('/dashboard/create-org')
    // }

    if(!response.ok){
        // setError("Organization can't be created");
        toast.error(result.message);
        navigate('/admin/dashboard/createOrg');
    }
    if(response.ok){
        toast.success("New Organization Created!");
        setOrg("");
        setTimeout(()=>{navigate('/admin/dashboard')},1000);
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
        <Input className='input' type="text" placeholder='Organization' onChange={(e: string)=>{setOrg((e.trim()))}}></Input>
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