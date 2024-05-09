import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "rsuite";

function RegisterForm(){
const [org , setOrg] = useState("");
const [error,setError] = useState("");

const navigate = useNavigate();

const handleSubmit = async(e:FormSubmit)=>{
    e.preventDefault();

    const orgName = {org};
    const response = await fetch("http://localhost:8555/admin/createOrg",{

        method:'POST',
        body:JSON.stringify(orgName),
        headers:{
            "Content-Type": "application/json",
        }
    });
    
    const result = await response.json();
    console.log(response);
    console.log(result);

    if(result.success == false){
        console.log("Organization is alreaedy created");
        setOrg("");
        navigate('/dashboard/create')
    }

    if(!response.ok){
        setError("Organization can't be created");
        setOrg("");
        navigate('/dashboard');
    }
    if(response.ok){
        setError("");
        setOrg("");
        navigate('/dashboard');
    }
}

return(
    <div className="outer-div">
        <div className="errorContainer">
          {error && <div className="alert alert-danger" >{error}</div>}
        </div>
        <form onSubmit={handleSubmit}>
            <div className="org-field">
        <Input type="text" placeholder='Organization' onChange={(e: string)=>{setOrg((e))}}></Input>
        </div>
        <div className="sub-button">
        <Button type='submit' appearance='primary' size='lg'>Submit</Button>
        </div>
        </form>
    </div>
)

}
export default RegisterForm