import RegisterCard from "../../molecules/RegisterCard/RegisterCard"
import LoginCard from "../../molecules/LoginCard/LoginCard"
import "./HomePage.scss"
import {Button} from 'rsuite';

function HomePage() {
  return (
    <>
    <Button block color='violet' appearance="primary" style={{margin:0}} >Welcome User!</Button>
      {/* <Welcome/> */}
      <div className="upperContainer">
      <div className="heading"> <h2>Welcome to TMS </h2></div>
      <div className="HomeBody">

        <div className="Left">
          <RegisterCard/>
        </div>
        <div className="Separator" ></div>

        <div className="Right">
          <LoginCard/>
        </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
