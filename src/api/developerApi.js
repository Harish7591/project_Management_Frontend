import api from "./axios";

export const getDevelopers = () => {
  return api.get("/developers");
};

export const createDeveloper = (data) => {
  return api.post("/developers", data);
};

export const updateDeveloper = (id, data) => {
  return api.put(`/developers/${id}`, data);
};

export const deleteDeveloper = (id) => {
  return api.delete(`/developers/${id}`);
};

export const developerLogin = (data) => {
  return api.post("/login", data);
};

export const getMyTasks = () => {
  return api.get("/my-tasks");
};

export const updateTaskStatus = (taskId, status) => {
  return api.put(`/tasks/${taskId}/status`, {
    status,
  });
};