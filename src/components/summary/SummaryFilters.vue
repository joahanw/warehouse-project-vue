<template>
  <div
    id="Summary-Filters"
    class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
  >
    <label
      class="flex items-center gap-2 h-14 rounded-2xl border border-monday-border px-4 flex-1 min-w-0 lg:max-w-[280px]"
    >
      <img
        src="@/assets/images/icons/search-normal-black.svg"
        class="size-5 flex shrink-0 opacity-60"
        alt="icon"
      />
      <input
        v-model="search"
        type="text"
        placeholder="Find transactions by name or phone"
        class="w-full min-w-0 font-medium outline-none placeholder:text-monday-gray"
      />
    </label>

    <div class="flex flex-wrap items-center gap-3">
      <div
        v-if="merchants.length"
        class="flex items-center gap-2 h-14 rounded-2xl border border-monday-border pl-4 pr-2"
      >
        <svg
          class="size-5 shrink-0 opacity-60"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 21V7l9-4 9 4v14M9 21v-6h6v6M3 10h18"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <select v-model="merchantId" class="appearance-none font-semibold outline-none bg-transparent pr-2">
          <option value="">All Merchants</option>
          <option v-for="item in merchants" :key="item.id" :value="String(item.id)">
            {{ item.name }}
          </option>
        </select>
      </div>

      <div
        class="flex items-center gap-2 h-14 rounded-2xl border border-monday-border pl-4 pr-2"
      >
        <svg
          class="size-5 shrink-0 opacity-60"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 2v4M16 2v4M3.5 9h17M4 8h16a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a1 1 0 0 1 1-1Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <select v-model="month" class="appearance-none font-semibold outline-none bg-transparent pr-2">
          <option value="">All Months</option>
          <option v-for="item in months" :key="item.value" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </div>

      <div
        class="flex items-center gap-2 h-14 rounded-2xl border border-monday-border pl-4 pr-2"
      >
        <select v-model="year" class="appearance-none font-semibold outline-none bg-transparent pr-2">
          <option value="">All Years</option>
          <option v-for="item in years" :key="item" :value="String(item)">
            {{ item }}
          </option>
        </select>
      </div>

      <div
        class="flex items-center gap-2 h-14 rounded-2xl border border-monday-border pl-4 pr-2"
      >
        <svg
          class="size-5 shrink-0 opacity-60"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 4v16m0 0-3-3m3 3 3-3M17 20V4m0 0 3 3m-3-3-3 3"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <select v-model="sortDirection" class="appearance-none font-semibold outline-none bg-transparent pr-2">
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      <button
        type="button"
        @click="$emit('refresh')"
        :disabled="loading"
        class="flex size-14 shrink-0 rounded-2xl border border-monday-border items-center justify-center hover:bg-monday-gray-background transition-300 disabled:opacity-50"
        title="Refresh"
      >
        <img
          src="@/assets/images/icons/loading.svg"
          :class="['size-5', loading ? 'animate-spin' : 'hidden']"
          alt="loading"
        />
        <svg
          v-if="!loading"
          class="size-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2M20 19v-4h-4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <button
        type="button"
        @click="$emit('export')"
        :disabled="disableExport"
        class="btn btn-primary font-semibold disabled:opacity-50 disabled:pointer-events-none"
      >
        <svg
          class="size-5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3v12m0 0-4-4m4 4 4-4M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Download CSV
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  months: { type: Array, default: () => [] },
  years: { type: Array, default: () => [] },
  merchants: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  disableExport: { type: Boolean, default: false },
});

defineEmits(["export", "refresh"]);

const search = defineModel("search", { type: String, default: "" });
const month = defineModel("month", { type: String, default: "" });
const year = defineModel("year", { type: String, default: "" });
const merchantId = defineModel("merchantId", { type: String, default: "" });
const sortDirection = defineModel("sortDirection", { type: String, default: "desc" });
</script>
