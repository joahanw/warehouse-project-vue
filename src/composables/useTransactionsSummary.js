import { computed, ref, unref, watch } from "vue";
import { getTransactions } from "@/js/api/transaction";
import {
  MONTH_OPTIONS,
  formatCurrency,
  formatDateTime,
  formatLabel,
} from "@/js/utils/format";
import {
  getPaymentStatusBadge,
  isFailedStatus,
  isPendingStatus,
  isSuccessStatus,
} from "@/js/utils/paymentStatus";
import { downloadCsv } from "@/js/utils/csv";

export const useTransactionsSummary = (merchantId) => {
  const transactions = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const search = ref("");
  const selectedMonth = ref("");
  const selectedYear = ref("");
  const sortDirection = ref("desc");

  const fetchTransactions = async () => {
    const merchantIdValue = unref(merchantId);
    if (!merchantIdValue) {
      transactions.value = [];
      return;
    }

    loading.value = true;
    error.value = null;
    try {
      let query = `?sortBy=createdAt&sortDirection=${sortDirection.value}&pageSize=1000`;
      if (selectedYear.value) query += `&year=${selectedYear.value}`;
      if (selectedMonth.value) query += `&month=${selectedMonth.value}`;
      query += `&merchantId=${merchantIdValue}`;

      const response = await getTransactions(query);
      transactions.value = response.data?.content || [];
    } catch (err) {
      console.error("Error fetching transactions summary:", err);
      error.value = "Failed to load transactions. Please try again.";
      transactions.value = [];
    } finally {
      loading.value = false;
    }
  };

  watch([selectedMonth, selectedYear], () => {
    fetchTransactions();
  });

  const availableYears = computed(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= currentYear - 5; year--) {
      years.push(year);
    }
    return years;
  });

  const filteredTransactions = computed(() => {
    const keyword = search.value.trim().toLowerCase();
    if (!keyword) return transactions.value;

    return transactions.value.filter((transaction) => {
      const haystack = `${transaction.name || ""} ${transaction.phone || ""}`.toLowerCase();
      return haystack.includes(keyword);
    });
  });

  const sortedTransactions = computed(() => {
    const list = [...filteredTransactions.value];
    return list.sort((a, b) => {
      const diff = new Date(a.createdAt) - new Date(b.createdAt);
      return sortDirection.value === "asc" ? diff : -diff;
    });
  });

  const stats = computed(() => {
    const list = filteredTransactions.value;
    return list.reduce(
      (acc, transaction) => {
        acc.totalCount += 1;
        if (isSuccessStatus(transaction.paymentStatus)) {
          acc.successCount += 1;
          acc.totalAmount += transaction.grandTotal || 0;
        } else if (isFailedStatus(transaction.paymentStatus)) {
          acc.failedCount += 1;
        } else if (isPendingStatus(transaction.paymentStatus)) {
          acc.pendingCount += 1;
        }
        return acc;
      },
      { totalCount: 0, totalAmount: 0, successCount: 0, failedCount: 0, pendingCount: 0 },
    );
  });

  const exportCsv = () => {
    const headers = [
      "No",
      "Date",
      "Time",
      "Customer Name",
      "Phone",
      "Payment Method",
      "Products",
      "Grand Total",
      "Status",
    ];

    const rows = sortedTransactions.value.map((transaction, index) => {
      const { date, time } = formatDateTime(transaction.createdAt);
      return [
        index + 1,
        date,
        time,
        transaction.name || "-",
        transaction.phone || "-",
        formatLabel(transaction.paymentMethod),
        transaction.transactionProducts?.length || 0,
        transaction.grandTotal || 0,
        getPaymentStatusBadge(transaction.paymentStatus).label,
      ];
    });

    const monthLabel = selectedMonth.value
      ? MONTH_OPTIONS.find((month) => month.value === selectedMonth.value)?.label
      : "all-months";
    const yearLabel = selectedYear.value || "all-years";
    const filename = `transactions-summary-${monthLabel}-${yearLabel}.csv`
      .toLowerCase()
      .replace(/\s+/g, "-");

    downloadCsv(filename, headers, rows);
  };

  return {
    transactions,
    loading,
    error,
    search,
    selectedMonth,
    selectedYear,
    sortDirection,
    months: MONTH_OPTIONS,
    availableYears,
    filteredTransactions,
    sortedTransactions,
    stats,
    fetchTransactions,
    exportCsv,
    formatCurrency,
  };
};
