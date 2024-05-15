import { Button } from 'rsuite'
import './LoginCard.scss'
import { Link } from 'react-router-dom'

function LoginCard() {
  return (
    <div className="CardContainer">
        <h3>Already a User?</h3>
        <h5>Welcome to our Application TMS. Login here to avail our services</h5>
        <Link to="/login">
            <Button size='lg' appearance='primary' color='green'>Login</Button>
        </Link>
    </div>
  )
}

export default LoginCard