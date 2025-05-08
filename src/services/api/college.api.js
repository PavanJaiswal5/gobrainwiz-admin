import { API_ENDPOINTS, ERROR } from "../../../utils/constants/api";

export const userApi = {
    addCollege: async (formData) => {
        try {
        //   const token = localStorage.getItem("token"); // optional, if auth needed
    
          const response = await fetch(API_ENDPOINTS.college.add, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error("Failed to add college");
          }
    
          return await response.json();
        } catch (error) {
          throw error;
        }
      },
      getCollegs : async()=>{
        try {
          const response = await fetch(API_ENDPOINTS.college.get, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (!response.ok) {
            throw new Error("Failed to fetch colleges");
          }
    
          return await response.json();
        } catch (error) {
          throw error;
        }
      }  ,
      deleteCollege: async (collegeId) => {
        try {
          const response = await fetch(`${API_ENDPOINTS.college.delete}/${collegeId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to delete college");
          }

          return await response.json();
        } catch (error) {
          throw error;
        }
      }

};
