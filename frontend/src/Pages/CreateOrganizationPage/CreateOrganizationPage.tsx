import CreateOrgForm from '../../organisms/CreateOrgForm/CreateOrgForm'
function CreateOrgPage() {
    return (
      <>
          <h1>Enter the Name of Organization</h1>
          <div className="LoginPageBody">
              <CreateOrgForm/>
          </div>
      </>
    )
  }
  
  export default CreateOrgPage