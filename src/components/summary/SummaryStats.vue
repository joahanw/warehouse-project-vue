<template>
  <section
    id="Summary-Stats"
    :class="loading ? 'opacity-60' : 'opacity-100'"
    class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 transition-300"
  >
    <div class="flex flex-col gap-3 rounded-3xl p-[18px] bg-white">
      <p class="flex items-center gap-[6px] font-medium text-monday-gray">
        <img
          src="@/assets/images/icons/receipt-text-black.svg"
          class="size-5 flex shrink-0"
          alt="icon"
        />
        Total Transactions
      </p>
      <p class="font-bold text-3xl">{{ totalCount }}</p>
    </div>

    <div class="flex flex-col gap-3 rounded-3xl p-[18px] bg-white">
      <p class="flex items-center gap-[6px] font-medium text-monday-gray">
        <img
          src="@/assets/images/icons/moneys-grey.svg"
          class="size-5 flex shrink-0"
          alt="icon"
        />
        Total Revenue
      </p>
      <p class="font-bold text-3xl truncate">{{ formatCurrency(totalAmount) }}</p>
    </div>

    <div class="flex flex-col gap-3 rounded-3xl p-[18px] bg-white">
      <p class="flex items-center gap-[6px] font-medium text-monday-gray">
        <img
          src="@/assets/images/icons/Checklist-green-fill.svg"
          class="size-5 flex shrink-0"
          alt="icon"
        />
        Success
      </p>
      <p class="flex items-center gap-2 font-bold text-3xl text-green-600">
        {{ successCount }}
        <span
          class="text-sm font-semibold px-2 py-1 rounded-full bg-green-50 text-green-700 ring-1 ring-inset ring-green-200"
        >
          {{ successRate }}%
        </span>
      </p>
    </div>

    <div class="flex flex-col gap-3 rounded-3xl p-[18px] bg-white">
      <p class="font-medium text-monday-gray">Status Breakdown</p>
      <div class="flex h-2 w-full rounded-full overflow-hidden bg-monday-gray-background">
        <div
          class="bg-green-500 transition-300"
          :style="{ width: `${barWidth(successCount)}%` }"
        ></div>
        <div
          class="bg-amber-400 transition-300"
          :style="{ width: `${barWidth(pendingCount)}%` }"
        ></div>
        <div
          class="bg-monday-red transition-300"
          :style="{ width: `${barWidth(failedCount)}%` }"
        ></div>
      </div>
      <div class="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
        <span class="flex items-center gap-1.5">
          <span class="size-2 rounded-full bg-green-500 shrink-0"></span>
          Success: {{ successCount }}
        </span>
        <span class="flex items-center gap-1.5">
          <span class="size-2 rounded-full bg-amber-400 shrink-0"></span>
          Pending: {{ pendingCount }}
        </span>
        <span class="flex items-center gap-1.5">
          <span class="size-2 rounded-full bg-monday-red shrink-0"></span>
          Failed: {{ failedCount }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { formatCurrency } from "@/js/utils/format";

const props = defineProps({
  totalCount: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  successCount: { type: Number, default: 0 },
  pendingCount: { type: Number, default: 0 },
  failedCount: { type: Number, default: 0 },
  loading: { type: Boolean, default: false },
});

const successRate = computed(() => {
  if (!props.totalCount) return 0;
  return Math.round((props.successCount / props.totalCount) * 100);
});

const barWidth = (value) => {
  if (!props.totalCount) return 0;
  return (value / props.totalCount) * 100;
};
</script>
