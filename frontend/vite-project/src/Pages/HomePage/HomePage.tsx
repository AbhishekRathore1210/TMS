
import Welcome from "../../atoms/Heading/Welcome"
import RegisterCard from "../../molecules/RegisterCard/RegisterCard"
import LoginCard from "../../molecules/LoginCard/LoginCard"
import "./HomePage.scss"
import {Button} from 'rsuite';

function HomePage() {
  return (
    <>
    <Button block appearance="primary" color='yellow'>Welcome User!</Button>
      <Welcome/>
      <div className="HomeBody">

        <div className="Left">
          <RegisterCard/>
        </div>
        <div className="Separator" ></div>

        <div className="Right">
          <LoginCard/>
        </div>
        
      </div>
    </>
  )
}

export default HomePage
