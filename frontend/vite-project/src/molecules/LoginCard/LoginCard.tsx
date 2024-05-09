import { Button } from 'rsuite'
import './LoginCard.scss'
import { Link } from 'react-router-dom'

function LoginCard() {
  return (
    <div className="CardContainer">
        <h3>Already a User?</h3>
        <p><b>Welcome to our Application Ticket Management System . Register here to avail our services!!</b></p>
        <Link to="/login">
            <Button size='lg' appearance='ghost' color='yellow'>Login</Button>
        </Link>
    </div>
  )
}

export default LoginCard