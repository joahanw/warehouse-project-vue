const SUCCESS_STATUSES = [
  "paid",
  "settlement",
  "capture",
  "success",
  "completed",
];
const FAILED_STATUSES = [
  "deny",
  "cancel",
  "cancelled",
  "expire",
  "expired",
  "failure",
  "failed",
];
const PENDING_STATUSES = ["pending"];

const normalize = (status) => (status || "").toLowerCase();

export const isSuccessStatus = (status) =>
  SUCCESS_STATUSES.includes(normalize(status));

export const isFailedStatus = (status) =>
  FAILED_STATUSES.includes(normalize(status));

export const isPendingStatus = (status) =>
  PENDING_STATUSES.includes(normalize(status));

export const getPaymentStatusBadge = (status) => {
  if (isSuccessStatus(status)) {
    return {
      label: "Success",
      class: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-200",
      dotClass: "bg-green-500",
    };
  }
  if (isFailedStatus(status)) {
    return {
      label: "Failed",
      class: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
      dotClass: "bg-red-500",
    };
  }
  if (isPendingStatus(status)) {
    return {
      label: "Pending",
      class: "bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-200",
      dotClass: "bg-gray-400 animate-pulse",
    };
  }
  return {
    label: status || "Unknown",
    class: "bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-200",
    dotClass: "bg-gray-400",
  };
};
