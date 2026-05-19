import { apiFetch } from "../../api";

export async function Login(user:{email:string,otp:string}){
    return await apiFetch("/admin/login",{
        method:'POST',
        body:JSON.stringify(user),
        headers:{
          "Content-Type": "application/json",
        }
    })
}

export async function OTP(userEmail:{email:string,org:string | null}){
  return await apiFetch("/admin/otp",{
    method:'POST',
    body:JSON.stringify(userEmail),
    headers:{
      "Content-Type": "application/json",
    }
  });
}