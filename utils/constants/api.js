export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  user: {
    userLogin: `${API_URL}/api/v1/admin/Auth_Admin/login`,
    userSignup: `${API_URL}/api/v1/admin/Auth_Admin/signup`,
    editUser:`${API_URL}/api/v1/admin/Auth_Admin/editUser`,
    deleteUser:`${API_URL}/api/v1/admin/Auth_Admin/deleteUser`,
    userLogout: `${API_URL}/api/v1/admin/Auth_Admin/logout`,
    getUsers: `${API_URL}/api/v1/admin/Auth_Admin/getUsers`,

  },
  college: {
    add: `${API_URL}/api/v1/college/college/addcollege`,
    get: `${API_URL}/api/v1/college/college/getcolleges`,
    delete: `${API_URL}/api/v1/college/college/deletecollege`,
    update: `${API_URL}/api/v1/college/college/updatecollege`,
    attandance: `${API_URL}/api/v1/college/college/toggleAttendance`,
  },
};

export const ERROR = {
  LOGIN_FAILED: "Login failed. Please check your credentials.",
  SIGNUP_FAILED: "Signup failed. Please try again.",
};
