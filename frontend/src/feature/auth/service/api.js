import axios from "axios";

const api_Instance = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export const register = async ({
  userName,
  email,
  password,
  phone,
  isSeller,
}) => {
  try {
    const response = await api_Instance.post("/register", {
      userName,
      email,
      password,
      phone,
      isSeller,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network error" };
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await api_Instance.post("/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network error" };
  }
};
