import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import LoginPage from './Pages/LoginPage/loginPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import HomePage from './Pages/HomePage/HomePage';
import DashboardPage from './Pages/AdminDashboard/AdminDashboard';
import CreateOrganizationPage from './Pages/CreateOrganizationPage/CreateOrganizationPage'

function AppRoutes() {
    return (
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/admin/dashboard' element={<DashboardPage/>} />
          <Route path='/dashboard/create' element={<CreateOrganizationPage></CreateOrganizationPage>} />
        </Routes>
      </BrowserRouter>
    );
}

export default AppRoutes;