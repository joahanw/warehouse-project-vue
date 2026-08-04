import apiService from "../api";

export const getDashboardData = (options = {}) => {
  return apiService.get("/api/transactions/dashboard", options);
};

export const getTransactions = (query = "", options = {}) => {
  return apiService.get(`/api/transactions${query}`, options);
};

export const getTransactionById = (id, options = {}) => {
  return apiService.get(`/api/transactions/${id}`, options);
};

export const createTransaction = (data, options = {}) => {
  return apiService.post("/api/transactions", data, options);
};

export const confirmPayment = (transactionId, status, options = {}) => {
  return apiService.post(
    `/api/transactions/${transactionId}/confirm-payment`,
    { status },
    options,
  );
};

export default {
  getDashboardData,
  getTransactions,
  getTransactionById,
  createTransaction,
  confirmPayment,
};
