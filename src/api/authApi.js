import api from "./axios";

export const loginUser = async (data) => {
  return await api.post("/login", data);
};

export const getProfile = async () => {
  return await api.get("/me");
};