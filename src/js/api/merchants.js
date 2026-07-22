import apiService from "../api";

export const getMerchants = (query = "", options = {}) => {
  return apiService.get(`/api/merchants${query}`, options);
};

export const getMerchantById = (id, options = {}) => {
  return apiService.get(`/api/merchants/${id}`, options);
};

export const createMerchant = (data, options = {}) => {
  return apiService.post("/api/merchants", data, options);
};

export const updateMerchant = (id, data, options = {}) => {
  return apiService.put(`/api/merchants/${id}`, data, options);
};

export const deleteMerchant = (id, options = {}) => {
  return apiService.delete(`/api/merchants/${id}`, options);
};

export const uploadMerchantImage = (file, options = {}) => {
  const formData = new FormData();
  formData.append("photo", file);
  return apiService.request("/api/upload/merchant-image", {
    method: "POST",
    headers: {
      Authorization: apiService.createHeaders().Authorization,
    },
    body: formData,
    ...options,
  });
};

export const getMerchantProducts = (query = "", options = {}) => {
  return apiService.get(`/api/merchant-products${query}`, options);
};

export const assignProductToMerchant = (data, options = {}) => {
  return apiService.post("/api/merchant-products", data, options);
};

export const updateMerchantProductStock = (id, data, options = {}) => {
  return apiService.put(`/api/merchant-products/${id}`, data, options);
};

export const getMerchantProductByBarcode = (
  barcode,
  merchantId,
  options = {},
) => {
  return apiService.get(
    `/api/merchant-products/barcode/${barcode}/merchant/${merchantId}`,
    options,
  );
};

export default {
  getMerchants,
  getMerchantById,
  createMerchant,
  updateMerchant,
  deleteMerchant,
  uploadMerchantImage,
  getMerchantProducts,
  assignProductToMerchant,
};
