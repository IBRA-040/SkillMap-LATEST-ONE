// src/Data/Api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Your backend URL

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
  const response = await fetch(`http://localhost:5000/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update user");
  }

  return response.json();
};
