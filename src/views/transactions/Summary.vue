<template>
  <LayoutMerchant
    pageTitle="Summary"
    breadcrumb-text="Manage Transactions"
    breadcrumb-link="/transactions"
  >
    <main class="flex flex-col gap-6 flex-1">
      <section
        id="Summary-Header"
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl p-[18px] bg-white"
      >
        <div class="flex flex-col gap-[6px]">
          <p class="font-semibold text-2xl">Transactions Summary</p>
          <p class="font-semibold text-lg text-monday-gray">
            Filter, sort, and export every transaction for
            {{ merchantInfo?.name || "your store" }}.
          </p>
        </div>
      </section>

      <SummaryStats
        :total-count="stats.totalCount"
        :total-amount="stats.totalAmount"
        :success-count="stats.successCount"
        :pending-count="stats.pendingCount"
        :failed-count="stats.failedCount"
        :loading="loading"
      />

      <section
        id="Summary-List"
        class="flex flex-col gap-5 rounded-3xl p-[18px] bg-white flex-1"
      >
        <SummaryFilters
          v-model:search="search"
          v-model:month="selectedMonth"
          v-model:year="selectedYear"
          v-model:sort-direction="sortDirection"
          :months="months"
          :years="availableYears"
          :loading="loading"
          :disable-export="loading || sortedTransactions.length === 0"
          @refresh="fetchTransactions"
          @export="exportCsv"
        />

        <p class="font-medium text-monday-gray">
          Showing {{ sortedTransactions.length }} of {{ transactions.length }} transactions
        </p>

        <p v-if="error" class="font-medium text-monday-red">{{ error }}</p>

        <SummaryTransactionsTable :transactions="sortedTransactions" :loading="loading" />
      </section>
    </main>
  </LayoutMerchant>
</template>

<script setup>
import { computed, onMounted } from "vue";
import LayoutMerchant from "@/components/LayoutMerchant.vue";
import SummaryStats from "@/components/summary/SummaryStats.vue";
import SummaryFilters from "@/components/summary/SummaryFilters.vue";
import SummaryTransactionsTable from "@/components/summary/SummaryTransactionsTable.vue";
import { useTransactionsSummary } from "@/composables/useTransactionsSummary";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const merchantData = computed(() => authStore.getMerchantData());
const merchantInfo = computed(() => merchantData.value?.[0] || null);
const merchantId = computed(() => merchantInfo.value?.id);

const {
  transactions,
  loading,
  error,
  search,
  selectedMonth,
  selectedYear,
  sortDirection,
  months,
  availableYears,
  sortedTransactions,
  stats,
  fetchTransactions,
  exportCsv,
} = useTransactionsSummary(merchantId);

onMounted(async () => {
  const roles = authStore.userRole?.toLowerCase().split(",");
  if (!merchantData.value && roles?.includes("keeper")) {
    await authStore.refreshMerchantData();
  }

  await new Promise((resolve) => setTimeout(resolve, 100));
  fetchTransactions();
});
</script>
