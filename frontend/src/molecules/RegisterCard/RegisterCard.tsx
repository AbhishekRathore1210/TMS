import { Button } from 'rsuite';
import './RegisterCard.scss'
import { Link } from 'react-router-dom'

function RegisterCard() {
  return (
    <div className="CardContainer">
        <h3>New User!</h3>
        <h5>Welcome to our Application Ticket Management System . Register here to avail our services!!</h5>
        <div className='reg-btn'>
        <Link to='/register'>
            <Button size='lg' appearance='primary' color='red'>Register</Button>
        </Link>
        </div>
    </div>
  )
}

export default RegisterCard;