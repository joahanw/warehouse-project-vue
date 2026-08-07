<template>
  <Layout pageTitle="Summary">
    <main class="flex flex-col gap-6 flex-1">
      <section
        id="Summary-Header"
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl p-[18px] bg-white"
      >
        <div class="flex flex-col gap-[6px]">
          <p class="font-semibold text-2xl">Transactions Summary</p>
          <p class="font-semibold text-lg text-monday-gray">
            Filter, sort, and export every transaction across
            {{ selectedMerchantName }}.
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
          v-model:merchant-id="selectedMerchantId"
          v-model:sort-direction="sortDirection"
          :months="months"
          :years="availableYears"
          :merchants="merchants"
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
  </Layout>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import Layout from "@/components/Layout.vue";
import SummaryStats from "@/components/summary/SummaryStats.vue";
import SummaryFilters from "@/components/summary/SummaryFilters.vue";
import SummaryTransactionsTable from "@/components/summary/SummaryTransactionsTable.vue";
import { useTransactionsSummary } from "@/composables/useTransactionsSummary";
import { getMerchants } from "@/js/api/merchants";

const merchants = ref([]);
const selectedMerchantId = ref("");

const selectedMerchantName = computed(() => {
  if (!selectedMerchantId.value) return "all merchants";
  const merchant = merchants.value.find(
    (item) => String(item.id) === selectedMerchantId.value,
  );
  return merchant?.name || "the selected merchant";
});

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
} = useTransactionsSummary(selectedMerchantId, { requireMerchant: false });

const fetchMerchants = async () => {
  try {
    const response = await getMerchants("?pageSize=200");
    merchants.value = response.data?.content || [];
  } catch (err) {
    console.error("Error fetching merchants:", err);
    merchants.value = [];
  }
};

onMounted(async () => {
  await fetchMerchants();
  fetchTransactions();
});
</script>
