import { Button } from 'rsuite';
import './RegisterCard.scss'
import { Link } from 'react-router-dom'

function RegisterCard() {
  return (
    <div className="CardContainer">
        <h3>New User!</h3>
        <p><b>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde soluta atque dolor inventore dolores odio quod quam omnis eos, architecto deserunt ipsa neque ipsam. Voluptate perspiciatis cum quod enim cumque officia beatae laborum facilis provident </b>.</p>
        <Link to='/register'>
            <Button size='lg' appearance='ghost' color='red'>Register</Button>
        </Link>
    </div>
  )
}

export default RegisterCard;