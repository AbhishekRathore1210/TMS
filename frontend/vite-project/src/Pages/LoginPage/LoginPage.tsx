// import NavBar from "../../molecules/NavBar/NavBar";
import LoginForm from '../../organisms/LoginForm/LoginForm'
import './LoginPage.scss'

function LoginPage() {
    
  return (
    <>  
    <div className="heading-login">
        {/* <h3>Welcome To TMS</h3> */}
        </div>
        <div className="LoginPageBody">
            <LoginForm/>
        </div>
    </>
  )
}

export default LoginPage