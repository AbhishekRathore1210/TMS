import { Button } from 'rsuite'
import './LoginCard.scss'
import { Link } from 'react-router-dom'

function LoginCard() {
  return (
    <div className="CardContainer">
        <h3>Already a User?</h3>
        <p><b>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis reiciendis veritatis cupiditate asperiores odio illum unde mollitia ab delectus porro? Nam ipsam maxime quas architecto suscipit numquam hic sapiente et. Fuga, a? Sequi sit earum possimus maxime laudantium sunt asperiores molestias accusamus autem, exercitationem libero nulla amet ipsa at rerum.</b></p>
        <Link to="/login">
            <Button size='lg' appearance='ghost' color='yellow'>Login</Button>
        </Link>
    </div>
  )
}

export default LoginCard