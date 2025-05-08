import { API_ENDPOINTS, ERROR } from "../../../utils/constants/api";

export const userApi = {
  login: async (email, password) => {
    try {
      const response = await fetch(API_ENDPOINTS.auth.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(ERROR.LOGIN_FAILED);
      }

      const data = await response.json();

      if (!data.token) {
        throw new Error("Login successful but token missing");
      }

      localStorage.setItem("token", data.token);

      return data; 
    } catch (error) {
      throw error;
    }
  },

  getUser: async (token) => {
    try {
      const response = await fetch(API_ENDPOINTS.user, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(ERROR.USER_FETCH_FAILED);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
