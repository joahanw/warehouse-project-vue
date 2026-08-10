import apiService from "../api";

export const getProducts = (query = "", options = {}) => {
  return apiService.get(`/api/products${query}`, options);
};

export const getProductById = (id, options = {}) => {
  return apiService.get(`/api/products/${id}`, options);
};

export const createProduct = (data, options = {}) => {
  return apiService.post("/api/products", data, options);
};

export const updateProduct = (id, data, options = {}) => {
  return apiService.put(`/api/products/${id}`, data, options);
};

export const deleteProduct = (id, options = {}) => {
  return apiService.delete(`/api/products/${id}`, options);
};

export const uploadProductImage = (file, options = {}) => {
  const fromData = new FormData();
  fromData.append("photo", file);
  return apiService.request(`/api/upload/product-image`, {
    method: "POST",
    headers: {
      Authorization: apiService.createHeaders().Authorization,
    },
    body: fromData,
    ...options,
  });
};

export const getCategories = (options = {}) => {
  return apiService.get("/api/categories", options);
};

export const getCategoryById = (id, options = {}) => {
  return apiService.get(`/api/categories/${id}`, options);
};

export const createCategory = (data, options = {}) => {
  return apiService.post("/api/categories", data, options);
};

export const updateCategory = (id, data, options = {}) => {
  return apiService.put(`/api/categories/${id}`, data, options);
};

export const deleteCategory = (id, options = {}) => {
  return apiService.delete(`/api/categories/${id}`, options);
};

export const uploadCategoryImage = (file, options = {}) => {
  const fromData = new FormData();
  fromData.append("photo", file);
  return apiService.request(`/api/upload/category-image`, {
    method: "POST",
    headers: {
      Authorization: apiService.createHeaders().Authorization,
    },
    body: fromData,
    ...options,
  });
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  deleteCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  getCategories,
};
