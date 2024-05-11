import { Button } from 'rsuite';
import './RegisterCard.scss'
import { Link } from 'react-router-dom'

function RegisterCard() {
  return (
    <div className="CardContainer">
        <h3>New User!</h3>
        <h5>Welcome to our Application Ticket Management System . Register here to avail our services!!</h5>
        <Link to='/register'>
            <Button size='lg' appearance='ghost' color='red'>Register</Button>
        </Link>
    </div>
  )
}

export default RegisterCard;