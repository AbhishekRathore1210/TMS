import CreateOrgForm from '../../organisms/CreateOrgForm/CreateOrgForm'
function DashboardPage() {
    
    return (
      <>
          {/* <NavBar/> */}
          <h1>Enter the Name of Organization</h1>
          <div className="LoginPageBody">
              <CreateOrgForm/>
          </div>
      </>
    )
  }
  
  export default DashboardPage