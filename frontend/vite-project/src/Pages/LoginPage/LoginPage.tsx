// import NavBar from "../../molecules/NavBar/NavBar";
import LoginForm from '../../organisms/LoginForm/LoginForm'
import { Button, Input } from 'rsuite'
import './LoginPage.scss'

function LoginPage() {
    
  return (
    <>
        {/* <NavBar/> */}
        <Button block appearance="primary" color='violet' className='heading-btn-login'>Login User!</Button>
        <div className="LoginPageBody">
            <LoginForm/>
        </div>
    </>
  )
}

export default LoginPage