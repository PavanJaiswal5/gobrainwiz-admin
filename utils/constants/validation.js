export const ERROR = {
    /* General */
    WARNING: "404 error message",
    NOT_FOUND: "The page you are looking for could not be found.",
    PERMISSION: "You do not have permission to perform this action.",
    GENERAL: "An unexpected error occurred. Please try again later.",
    SERVER: "A server error occurred. Our technical support has been notified.",
    NETWORK: "Failed to connect to the server. Check your internet connection.",
    UNAUTHORIZED: "You are not authorized to access this resource.",
    BAD_REQUEST: "Invalid request. Please check your input and try again.",
    SERVER_ERROR: "Internal server error. Please try again later.",
  
    /* Auth */
    LOGIN: "Incorrect username or password",
    EMAIL: "Please enter a valid email address.",
    PASSWORD: "Password must be at least 6 characters long.",
    PASSWORD_CONFIRMATION: "Passwords do not match.",
    LOGIN_FAILED: "Failed to login",
    REGISTER_FAILED: "Failed to register",
  
    // User related errors
    USER_NOT_FOUND: "User not found",
    USER_FETCH_FAILED: "Failed to fetch user data",
    USER_UPDATE_FAILED: "Failed to update user data",
  
    /* Data */
    DATA_UPDATE: "Error updating data",
    DATA_EXPORT: "Failed to export data",
    DATA_LOAD: "Error loading saved data",
    DATA_FETCH: "Failed to fetch data. Please try again.",
    FILE_PARSE: "Error parsing JSON data",
    FILE_READ_ERROR: "Error reading file",
    FILE_NOT_SELECTED: "* No file selected",
    FILE_SIZE_EXCEEDED: "File size exceeds 10MB limit",
    CONTEXT_MISSING:
      "The Context must be used within the Specific ContextProvider",
    INVALID_DATA_STRUCTURE: "Invalid data structure in JSON",
    INVALID_FILE_FORMAT:
      "Invalid file format. Please upload a JSON file {0} is not valid.",
  
    /* Car Data */
    CAR_NOT_FOUND: "Car not found",
    CAR_FETCH_FAILED: "Failed to fetch cars",
    CAR_FILTER_FAILED: "Failed to filter cars",
  
    /* Storage */
    STORAGE_PARSE: "Error parsing stored data",
    STORAGE_SET: "Error setting data in localStorage",
    STORAGE_GET: "Error getting data from localStorage",
    STORAGE_STRINGIFY: "Error stringifying data for storage",
  }
  
  export const SUCCESS = {
    /* Data */
    DATA_LOAD: "Data loaded successfully!",
    DATA_EXPORT: "Data exported successfully",
    DATA_UPDATE: "Data updated successfully!",
    FILE_UPLOAD: "File uploaded successfully!",
    DELETE_SINGLE: "List item successfully deleted",
    DELETE_MULTIPLE: " list items successfully deleted",
  
    /* Storage */
    STORAGE_SET: "Data stored successfully",
    STORAGE_GET: "Data retrieved successfully",
  
    /* Auth */
    SIGNIN: "Successfully logged in!",
    SIGNUP: "Successfully signed up!",
    SIGNOUT: "Successfully logged out!",
    RESET_PASSWORD: "Successfully reset password!",
  }
  