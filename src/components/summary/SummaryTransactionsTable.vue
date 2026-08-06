<template>
  <div
    id="Summary-Table"
    class="flex flex-col rounded-2xl border border-monday-border overflow-hidden"
  >
    <div class="overflow-x-auto">
      <table class="w-full min-w-[860px] border-collapse">
        <thead>
          <tr class="bg-monday-black text-white">
            <th class="text-left font-semibold text-sm px-5 py-4">Order ID</th>
            <th class="text-left font-semibold text-sm px-5 py-4">Customer</th>
            <th class="text-left font-semibold text-sm px-5 py-4">
              Payment Method
            </th>
            <th class="text-left font-semibold text-sm px-5 py-4">Products</th>
            <th class="text-right font-semibold text-sm px-5 py-4">Amount</th>
            <th class="text-left font-semibold text-sm px-5 py-4">Status</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="loading">
            <tr
              v-for="row in 5"
              :key="`skeleton-${row}`"
              class="border-b border-monday-border"
            >
              <td class="px-5 py-4" colspan="6">
                <div
                  class="h-6 rounded-lg bg-monday-gray-background animate-pulse"
                ></div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr
              v-for="transaction in transactions"
              :key="transaction.id"
              class="border-b border-monday-border last:border-b-0 hover:bg-monday-background/60 transition-300"
            >
              <td class="px-5 py-4 align-top font-semibold">
                {{ transaction.orderId || "-" }}
              </td>
              <td class="px-5 py-4 align-top">
                <p class="font-semibold">{{ transaction.name || "-" }}</p>
                <p class="text-sm text-monday-gray">
                  {{ transaction.phone || "-" }}
                </p>
              </td>
              <td class="px-5 py-4 align-top font-medium">
                {{ formatLabel(transaction.paymentMethod) }}
              </td>
              <td class="px-5 py-4 align-top font-medium">
                {{ transaction.transactionProducts?.length || 0 }} item(s)
              </td>
              <td
                class="px-5 py-4 align-top text-right font-semibold text-monday-blue"
              >
                {{ formatCurrency(transaction.grandTotal) }}
              </td>
              <td class="px-5 py-4 align-top">
                <span
                  :class="
                    getPaymentStatusBadge(transaction.paymentStatus).class
                  "
                  class="flex items-center gap-[6px] w-fit px-3 py-1 rounded-full font-semibold text-sm text-nowrap"
                >
                  <span
                    :class="
                      getPaymentStatusBadge(transaction.paymentStatus).dotClass
                    "
                    class="size-[6px] rounded-full shrink-0"
                  ></span>
                  {{ getPaymentStatusBadge(transaction.paymentStatus).label }}
                </span>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div
      v-if="!loading && transactions.length === 0"
      class="flex flex-col items-center justify-center gap-4 py-16"
    >
      <img
        src="@/assets/images/icons/document-text-grey.svg"
        class="size-[52px]"
        alt="icon"
      />
      <p class="font-semibold text-monday-gray">
        No transactions match your current filters.
      </p>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency, formatLabel } from "@/js/utils/format";
import { getPaymentStatusBadge } from "@/js/utils/paymentStatus";

defineProps({
  transactions: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
});
</script>
