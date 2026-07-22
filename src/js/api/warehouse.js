import apiService from "../api";

export const getWarehouses = (query = "", options = {}) => {
  return apiService.get(`/api/warehouses${query}`, options);
};

export const getWarehouseById = (id, options = {}) => {
  return apiService.get(`/api/warehouses/${id}`, options);
};

export const createWarehouse = (data, options = {}) => {
  return apiService.post("/api/warehouses", data, options);
};

export const updateWarehouse = (id, data, options = {}) => {
  return apiService.put(`/api/warehouses/${id}`, data, options);
};

export const deleteWarehouse = (id, options = {}) => {
  return apiService.delete(`/api/warehouses/${id}`, options);
};

export const getWarehouseProductByWarehouseId = (warehouseId, options = {}) => {
  return apiService.get(`/api/warehouse-products/${warehouseId}`, options);
};

export const uploadWarehouseImage = (file, options = {}) => {
  const formData = new FormData();
  formData.append("photo", file);
  return apiService.request("/api/upload/warehouse-image", {
    method: "POST",
    headers: {
      Authorization: apiService.createHeaders().Authorization,
    },
    body: formData,
    ...options,
  });
};

export const assignProductToWarehouse = (data, options = {}) => {
  return apiService.post("/api/warehouse-products", data, options);
};

export const getWarehousesForProduct = (productId, options = {}) => {
  return apiService.get(
    `/api/warehouse-products/detail/products/${productId}`,
    options,
  );
};

export const getWarehouseProductByWarehouseIDAndProductID = (
  warehouseId,
  productId,
  options = {},
) => {
  return apiService.get(
    `/api/warehouse-products/${warehouseId}/detail/${productId}`,
    options,
  );
};

export const updateWarehouseProductStock = (
  warehouseProductId,
  data,
  options = {},
) => {
  return apiService.put(
    `/api/warehouse-products/${warehouseProductId}`,
    data,
    options,
  );
};

export default {
  getWarehouses,
  getWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getWarehouseProductByWarehouseId,
  uploadWarehouseImage,
  assignProductToWarehouse,
  getWarehouseProductByWarehouseIDAndProductID,
  updateWarehouseProductStock,
  getWarehousesForProduct,
};
