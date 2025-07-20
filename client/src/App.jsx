import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
// import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import UserList from './pages/Users';
import RoleList from './pages/Roles';
import PrivilegeList from './pages/Privileges';
import AddUserForm from './pages/AddUserForm';
import EditUserForm from './pages/EditUser';


function AppRoutes() {
  return (
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <UserList/>
          </ProtectedRoute>
        }/>
        <Route path="/users" element={
          <ProtectedRoute>
            <UserList/>
          </ProtectedRoute>
        }/>
        <Route path="/roles" element={
          <ProtectedRoute>
            <RoleList/>
          </ProtectedRoute>
        }/>
        <Route path="/privileges" element={
          <ProtectedRoute>
            <PrivilegeList/>
          </ProtectedRoute>
        }/>
        <Route path="/add-user" element={
          <ProtectedRoute>
            <AddUserForm/>
          </ProtectedRoute>
        }/>
        <Route path="/edit-user/:id" element={
          <ProtectedRoute>
            <EditUserForm/>
          </ProtectedRoute>
        }/>
      </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* <NavBar/> */}
      <AppRoutes />
    </BrowserRouter>
  );
}
