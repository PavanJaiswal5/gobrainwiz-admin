import { Navigate, Route, Routes } from "react-router"
import AuthLayout from "./layouts/AuthLayout"
import Colleges from "./views/Colleges"
import Dashboard from "./views/Dashboard"
import Login from "./views/Login"
import Students from "./views/Students"
import AdminLayout from "./layouts/AdminLayout"
import Attendance from "./views/Attendance"
import Representatives from "./views/Representatives"
import Courses from "./views/Courses"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} /> 
        </Route>
        <Route path="account" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} /> 
          <Route path="colleges" element={<Colleges />} /> 
          <Route path="courses" element={<Courses />} /> 
          <Route path="students" element={<Students />} /> 
          <Route path="attendance" element={<Attendance />} /> 
          <Route path="representatives" element={<Representatives />} /> 
        </Route>
      </Routes>
    </>
  )
}

export default App
