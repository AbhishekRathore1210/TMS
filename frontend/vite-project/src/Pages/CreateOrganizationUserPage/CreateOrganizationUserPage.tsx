import RegisterForm from "../../organisms/RegisterForm/RegisterForm"

function CreateOrganizationUserPage() {
    
    return (
      <>
          {/* <NavBar/> */}
          <h1>Register the User </h1>
          <div className="LoginPageBody">
              <RegisterForm/>
          </div>
      </>
    )
  }
  
  export default CreateOrganizationUserPage