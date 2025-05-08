export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: `${API_URL}/api/v1/auth/login`,
    logout: `${API_URL}/api/v1/auth/logout`,
  },

  // User endpoints
  user: `${API_URL}/user`,
  userProfile: `${API_URL}/user/profile`,
  userRequests: `${API_URL}/user/requests`,
  college:{
    add: `${API_URL}/api/v1/college/college/addcollege`,
    get: `${API_URL}/api/v1/college/college/getcolleges`,
    delete: `${API_URL}/api/v1/college/college/deletecollege`,
   
  }
};

// You can define common error messages too
export const ERROR = {
  LOGIN_FAILED: 'Login failed. Please check your credentials.',
  USER_FETCH_FAILED: 'Failed to fetch user details.',
};
