// import NavBar from "../../molecules/NavBar/NavBar";
import LoginForm from '../../organisms/LoginForm/LoginForm'
import './LoginPage.scss'

function LoginPage() {
    
  return (
    <>
        {/* <NavBar/> */}
        <div className="LoginPageBody">
            <LoginForm/>
        </div>
    </>
  )
}

export default LoginPage