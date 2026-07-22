import apiService from "../api";

export const getKeepers = (options = {}) => {
  return apiService.get("/api/users/role?roleName=KEEPER", options);
};

export const getKeeperById = (id, options = {}) => {
  return apiService.get(`/api/users/${id}`, options);
};

export const getRoles = (options = {}) => {
  return apiService.get("/api/roles", options);
};

export const getRoleById = (id, options = {}) => {
  return apiService.get(`/api/roles/${id}`, options);
};

export const createRole = (data, options = {}) => {
  return apiService.post("/api/roles", data, options);
};

export const updateRole = (id, data, options = {}) => {
  return apiService.put(`/api/roles/${id}`, data, options);
};

export const deleteRole = (id, options = {}) => {
  return apiService.delete(`/api/roles/${id}`, options);
};

export const getUsers = (query = "", options = {}) => {
  return apiService.get(`/api/users${query}`, options);
};

export const getUserById = (id, options = {}) => {
  return apiService.get(`/api/users/${id}`, options);
};

export const createUser = (data, options = {}) => {
  return apiService.post("/api/users", data, options);
};

export const updateUser = (id, data, options = {}) => {
  return apiService.put(`/api/users/${id}`, data, options);
};

export const deleteUser = (id, options = {}) => {
  return apiService.delete(`/api/users/${id}`, options);
};

export const uploadUserImage = (file, options = {}) => {
  const fromData = new FormData();
  fromData.append("photo", file);
  return apiService.request(`/api/upload/photo`, {
    method: "POST",
    headers: {
      Authorization: apiService.createHeaders().Authorization,
    },
    body: fromData,
    ...options,
  });
};

export const getUserRoles = (query = "", options = {}) => {
  return apiService.get(`/api/assign-role${query}`, options);
};

export const createUserRole = (query = "", options = {}) => {
  return apiService.post(`/api/assign-role${query}`, options);
};

export const updateUserRole = (query = "", options = {}) => {
  return apiService.put(`/api/assign-role${query}`, options);
};

export const removeAuthToken = () => apiService.removeAuthToken();

export default {
  getKeepers,
  getKeeperById,
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  getUserRoles,
  createUserRole,
  updateUserRole,
  removeAuthToken,
};
