import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import LoginPage from './Pages/LoginPage/loginPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import HomePage from './Pages/HomePage/HomePage';
import DashboardPage from './Pages/AdminDashboard/AdminDashboard';
import CreateOrganizationPage from './Pages/CreateOrganizationPage/CreateOrganizationPage'
import UserDashboard from './organisms/Dashboard/UserDashboard';
import CreateOrganizationUserPage from './Pages/CreateOrganizationUserPage/CreateOrganizationUserPage';

function AppRoutes() {
    return (
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/admin/dashboard' element={<DashboardPage/>} />
          <Route path='/admin/dashboard/createOrg' element={<CreateOrganizationPage/>} />
          <Route path='/admin/dashboard/createOrgUser' element={<CreateOrganizationUserPage/>} />
          <Route path='/users/dashboard' element={<UserDashboard/>} />
        </Routes>
      </BrowserRouter>
    );
}

export default AppRoutes;