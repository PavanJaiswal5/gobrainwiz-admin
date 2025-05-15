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
import Unauthorized from "./views/Unauthorized"
import EmployeeAccess from "./views/employeeAccess"

import ProtectedRoute from "./components/ProtectedRoute"
function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />} />
      </Route>

      <Route path="account" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route
          path="dashboard"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "admin", "collegeadmin", "user","tech"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="colleges"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "admin", "collegeadmin"]}>
              <Colleges />
            </ProtectedRoute>
          }
        />

        <Route
          path="attendance"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="courses"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "admin"]}>
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path="students"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "admin", "collegeadmin"]}>
              <Students />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="Representatives"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "admin",]}>
              <Representatives />
            </ProtectedRoute>
          }
        />
       <Route
          path="EmployeeAcess"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "admin","tech"]}>
             <EmployeeAccess></EmployeeAccess>
            </ProtectedRoute>
          }
        />
      </Route>
      


      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;