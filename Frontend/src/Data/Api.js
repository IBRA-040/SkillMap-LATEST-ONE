import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Fetch User Error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateUserById = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Update User Error:", error.response?.data || error.message);
    throw error;
  }
};
