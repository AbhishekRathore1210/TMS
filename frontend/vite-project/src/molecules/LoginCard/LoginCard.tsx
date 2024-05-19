// module
import { Button } from 'rsuite'
import { Link } from 'react-router-dom'

// css
import './LoginCard.scss'


function LoginCard() {
  return (
    <div className="CardContainer">
        <h3>Already a User?</h3>
        {/* <h5>Welcome to our Application TMS. Login here to avail our services</h5> */}
        <Link to="/login">
            <Button className='btn' size='lg' appearance='primary' color='red'>Login</Button>
        </Link>
    </div>
  )
}

export default LoginCard