import { API_ENDPOINTS, API_URL, ERROR } from "../../../utils/constants/api";
import { jwtDecode } from "jwt-decode";
import {fetchWithAuth} from "../../../utils/helpers/fetchWithAuth"
import {useAuth} from "../../context/AuthContext"


export const userAuthApi = {
  userSignup: async ({ username, password, phone, role }) => {
    return await fetchWithAuth(API_ENDPOINTS.user.userSignup, {
      method: "POST",
      body: JSON.stringify({ username, password, phone, role }),
    });
  },

userLogin: async (username, password) => {
    try {
      const response = await fetch(API_ENDPOINTS.user.userLogin, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (!data.token) throw new Error("Token missing in response");


      return data;
    } catch (error) {
      throw error;
    }
  },

  editUser: async (userId, updatedData) => {
    return await fetchWithAuth(API_ENDPOINTS.user.editUser, {
      method: "PUT",
      body: JSON.stringify({ ...updatedData, userId }),
    });
  },

  deleteUser: async (userId) => {
    return await fetchWithAuth(API_ENDPOINTS.user.deleteUser, {
      method: "DELETE",
      body: JSON.stringify({ userId }),
    });
  },

  getCurrentUser: async () => {
    try {
      const data = await fetchWithAuth(API_ENDPOINTS.user.getUsers, {
        method: "GET",
      });
      return data;
    } catch (error) {
      console.error("Error fetching current user:", error.message);
      return null;
    }
  },

  logout: async () => {
    try {
      const data = await fetchWithAuth(API_ENDPOINTS.user.userLogout, {
        method: "POST",
      });

      if (data?.status === 200) {
         const { logout: contextLogout } = useAuth();
        contextLogout();
        localStorage.clear();
        window.location.href = "/";
      } else {
        console.log("Logout failed:", data?.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  },

};
