import { API_ENDPOINTS, ERROR } from "../../../utils/constants/api";
import { fetchWithAuth } from "../../../utils/helpers/fetchWithAuth";

export const collegeApi = {
  addCollege: async (formData) => {
    try {
      const response = await fetchWithAuth(API_ENDPOINTS.college.add, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!response) return; 

      return response;
    } catch (error) {
      throw error;
    }
  },

  getCollegs: async () => {
    try {
      const response = await fetchWithAuth(API_ENDPOINTS.college.get, {
        method: "GET",
      });

      if (!response) return; 

      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteCollege: async (collegeId) => {
    try {
      const response = await fetchWithAuth(`${API_ENDPOINTS.college.delete}/${collegeId}`, {
        method: "DELETE",
      });

      if (!response) return;

      return response;
    } catch (error) {
      throw error;
    }
  },

  updateCollege: async (collegeId, formData) => {
    try {
      const response = await fetchWithAuth(`${API_ENDPOINTS.college.update}/${collegeId}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      if (!response) return; 

      return response;
    } catch (error) {
      throw error;
    }
  },

  addAttendance: async (collegeId, isOn) => {
    try {
      const response = await fetchWithAuth(API_ENDPOINTS.college.attandance, {
        method: "POST",
        body: JSON.stringify({ collegeId, isOn }),
      });

      if (!response) return; 

      return response;
    } catch (error) {
      throw error;
    }
  },
};
