import RegisterCard from "../../molecules/RegisterCard/RegisterCard"
import LoginCard from "../../molecules/LoginCard/LoginCard"
import "./HomePage.scss"
import {Button} from 'rsuite';

function HomePage() {
  return (
    <>
      {/* <Welcome/> */}
      <div className="upperContainer">
      <div className="heading"> <h2>Welcome to TMS </h2></div>
        <div className="Right">
          <LoginCard/>
          </div>
        </div>
    </>
  )
}

export default HomePage
