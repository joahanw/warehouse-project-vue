<template>
  <LayoutMerchant
    pageTitle="Overview Merchant"
    breadcrumb-text=""
    breadcrumb-link=""
  >
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex justify-between mb-4">
        <button
          @click="refreshDashboard"
          class="btn btn-primary-opacity font-semibold"
          :disabled="dashboardLoading"
        >
          <img
            src="@/assets/images/icons/loading.svg"
            class="size-6 shrink-0"
            :class="{ 'animate-spin': dashboardLoading }"
            alt="refresh"
          />
          Refresh Dashboard
        </button>
      </div>

      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-if="dashboardLoading"
          class="col-span-3 flex items-center justify-center py-12"
        >
          <div class="text-center">
            <img
              src="@/assets/images/icons/loading.svg"
              class="size-12 animate-spin mx-auto mb-4"
              alt="loading"
            />
            <p class="text-monday-gray">Loading dashboard data...</p>
          </div>
        </div>

        <div
          v-else-if="!currentMerchant"
          class="col-span-3 flex items-center justify-center py-12"
        >
          <div class="text-center">
            <img
              src="@/assets/images/icons/shop-grey.svg"
              class="size-12 mx-auto mb-4"
              alt="no merchant"
            />
            <p class="text-monday-gray">
              No merchant data found. Please contact administrator.
            </p>
          </div>
        </div>

        <template v-else>
          <div
            id="Total-Revenue"
            class="flex flex-col rounded-3xl p-[18px] gap-5 bg-white"
          >
            <div
              class="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center"
            >
              <img
                src="@/assets/images/icons/wallet-blue-fill.svg"
                class="size-6"
                alt="icon"
              />
            </div>
            <div class="flex flex-col gap-[6px]">
              <p class="font-semibold text-[32px]">
                Rp {{ formatCurrency(dashboardData.totalRevenue) }}
              </p>
              <p class="font-medium text-lg text-monday-gray">Total Revenue</p>
            </div>
          </div>
          <div
            id="Total-Transactions"
            class="flex flex-col rounded-3xl p-[18px] gap-5 bg-white"
          >
            <div
              class="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center"
            >
              <img
                src="@/assets/images/icons/document-text-blue-fill.svg"
                class="size-6"
                alt="icon"
              />
            </div>
            <div class="flex flex-col gap-[6px]">
              <p class="font-semibold text-[32px]">
                {{ formatCurrency(dashboardData.totalTransactions) }}
              </p>
              <p class="font-medium text-lg text-monday-gray">
                Total Transactions
              </p>
            </div>
          </div>
          <div
            id="Products-Sold"
            class="sm:col-span-2 lg:col-span-1 flex flex-col rounded-3xl p-[18px] gap-5 bg-white"
          >
            <div
              class="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center"
            >
              <img
                src="@/assets/images/icons/bag-blue-fill.svg"
                class="size-6"
                alt="icon"
              />
            </div>
            <div class="flex flex-col gap-[6px]">
              <p class="font-semibold text-[32px]">
                {{ formatCurrency(dashboardData.productsSold) }}
              </p>
              <p class="font-medium text-lg text-monday-gray">Products Sold</p>
            </div>
          </div>
        </template>
      </section>
      <section
        id="Latest-Transaction"
        class="flex flex-col gap-5 flex-1 rounded-3xl p-[18px] bg-white"
      >
        <div class="flex items-center justify-between">
          <h2 class="font-bold text-xl">Lastest Transaction</h2>
          <div v-if="loading" class="flex items-center gap-2">
            <img
              src="@/assets/images/icons/loading.svg"
              class="size-5 animate-spin"
              alt="loading"
            />
            <span class="text-sm text-monday-gray">Loading...</span>
          </div>
        </div>

        <div
          v-if="loading && transactions.length === 0"
          class="flex flex-col items-center justify-center py-12"
        >
          <img
            src="@/assets/images/icons/loading.svg"
            class="size-12 animate-spin mb-4"
            alt="loading"
          />
          <p class="text-monday-gray">Loading transactions...</p>
        </div>

        <div v-else-if="transactions.length > 0" class="flex flex-col gap-5">
          <div
            v-for="(transaction, index) in transactions"
            :key="transaction.id"
            class="card-merchant flex flex-col rounded-2xl border border-monday-border"
          >
            <div class="flex flex-wrap items-center gap-3 p-4 pb-5">
              <div class="flex items-center gap-3 min-w-0 flex-1">
                <div
                  class="flex size-[86px] shrink-0 rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                >
                  <img
                    src="@/assets/images/icons/user-thin-grey.svg"
                    class="flex size-[42px] shrink-0"
                    alt="icon"
                  />
                </div>
                <div class="flex flex-col gap-2 min-w-0 flex-1">
                  <p class="font-semibold text-xl truncate">
                    {{ transaction.name }}
                  </p>
                  <p
                    class="flex items-center gap-1 font-medium text-lg text-monday-gray"
                  >
                    <img
                      src="@/assets/images/icons/call-grey.svg"
                      class="size-6 flex shrink-0"
                      alt="icon"
                    />
                    <span class="truncate">{{ transaction.phone }}</span>
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-[6px] max-w-full min-w-0">
                <img
                  src="@/assets/images/icons/shop-black.svg"
                  class="size-6 flex shrink-0"
                  alt="icon"
                />
                <p class="font-semibold text-lg truncate">
                  {{ transaction.merchantName }}
                </p>
              </div>
            </div>
            <hr class="border-monday-border" />
            <div class="flex flex-col px-4 gap-5 py-5">
              <button
                @click="toggleProductAssigned(index + 1)"
                class="flex items-center justify-between"
              >
                <p class="font-semibold text-lg">
                  Product Assigned ({{
                    transaction.transactionProducts?.length || 0
                  }})
                </p>
                <img
                  :src="
                    expandedSections.includes(index + 1)
                      ? arrowCircleDownIcon
                      : arrowCircleUpIcon
                  "
                  class="size-6 flex shrink-0 transition-300"
                  alt="icon"
                />
              </button>
              <div
                v-show="expandedSections.includes(index + 1)"
                class="flex flex-col gap-5"
              >
                <div
                  v-for="(
                    product, productIndex
                  ) in transaction.transactionProducts"
                  :key="product.id"
                  class="card flex flex-col xl:flex-row gap-4 xl:gap-3 xl:items-center xl:justify-between"
                >
                  <div class="flex items-center gap-3 min-w-0 xl:flex-1">
                    <div
                      class="flex size-16 xl:size-[86px] shrink-0 rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                    >
                      <img
                        :src="product.product.thumbnail"
                        class="size-full object-contain"
                        alt="product"
                      />
                    </div>
                    <div class="flex flex-col gap-1 xl:gap-2 min-w-0 flex-1">
                      <p class="font-semibold text-lg xl:text-xl line-clamp-1">
                        {{ product.product.name }}
                      </p>
                      <p class="font-semibold text-lg xl:text-xl text-monday-blue">
                        Rp {{ formatCurrency(product.product.price) }}
                        <span class="text-monday-gray"
                          >({{ product.quantity }}x)</span
                        >
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-[6px] xl:flex-1">
                    <img
                      :src="product.product.category?.photo"
                      class="size-6 flex shrink-0"
                      alt="icon"
                      @error="(e) => (e.target.src = boxGreyIcon)"
                    />
                    <p class="font-semibold text-base xl:text-lg text-nowrap">
                      {{ product.product.category?.name || "Uncategorized" }}
                    </p>
                  </div>
                  <button
                    @click="showProductDetails(product)"
                    class="btn btn-primary-opacity w-full xl:w-auto xl:min-w-[130px] justify-center font-semibold"
                  >
                    Details
                  </button>
                </div>
                <hr
                  v-if="
                    productIndex < transaction.transactionProducts?.length - 1
                  "
                  class="border-monday-border last:hidden"
                />
              </div>
            </div>
            <hr class="border-monday-border" />
            <div class="flex items-center justify-between px-4 py-5">
              <p
                class="flex items-center gap-1 font-semibold text-lg text-monday-gray"
              >
                <img
                  src="@/assets/images/icons/money-grey.svg"
                  class="size-6 flex shrink-0"
                  alt="icon"
                />
                Grandtotal:
              </p>
              <p class="font-semibold text-xl text-monday-blue">
                Rp {{ formatCurrency(transaction.grandTotal) }}
              </p>
            </div>
          </div>
        </div>
        <!-- Empty State -->
        <div
          v-else-if="!loading"
          class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6 py-12"
        >
          <img
            src="@/assets/images/icons/document-text-grey.svg"
            class="size-[52px]"
            alt="icon"
          />
          <p class="font-semibold text-monday-gray">
            Oops, it looks like there's no transaction data yet.
          </p>
        </div>
      </section>
    </main>
  </LayoutMerchant>

  <div
    v-if="showModal"
    class="modal flex flex-1 items-center justify-center h-full fixed top-0 w-full z-50 p-4"
  >
    <div
      @click="closeModal"
      class="backdrop absolute w-full h-full bg-[#292D32B2]"
    ></div>
    <div
      class="relative flex flex-col w-full max-w-[406px] max-h-[90vh] overflow-y-auto rounded-3xl p-[18px] gap-5 bg-white"
    >
      <div class="modal-header flex items-center justify-between">
        <p class="font-semibold text-xl">Product Details</p>
        <button
          @click="closeModal"
          class="flex size-14 rounded-full items-center justify-center bg-monday-gray-background"
        >
          <img
            src="@/assets/images/icons/close-circle-black.svg"
            class="size-6"
            alt="icon"
          />
        </button>
      </div>
      <div
        class="modal-content flex flex-col rounded-3xl border border-monday-border p-4 gap-5"
        v-if="selectedProduct"
      >
        <div class="flex items-center justify-between">
          <div class="flex flex-col gap-2">
            <p class="flex items-center gap-[6px] font-semibold text-lg">
              <img
                :src="selectedProduct.product.category?.photo"
                class="size-6 flex shrink-0"
                alt="icon"
                @error="(e) => (e.target.src = boxGreyIcon)"
              />
              {{ selectedProduct.product.category?.name || "Uncategorized" }}
            </p>
            <p class="font-bold text-lg">{{ selectedProduct.product.name }}</p>
            <p class="font-semibold text-[17px] text-monday-blue">
              Rp {{ formatCurrency(selectedProduct.price) }}
              <span class="text-monday-gray text-sm"
                >(Qty: {{ selectedProduct.quantity }})</span
              >
            </p>
          </div>
          <div
            class="flex size-[100px] rounded-2xl bg-monday-gray-background items-center justify-center overflow-hidden"
          >
            <img
              :src="selectedProduct.product.thumbnail"
              class="size-full object-contain"
              alt="product"
              @error="(e) => (e.target.src = galleryDefaultIcon)"
            />
          </div>
        </div>
        <hr class="border-monday-border" />
        <div>
          <p class="font-medium text-sm text-monday-gray">Product About</p>
          <p class="font-semibold leading-[160%]">
            {{
              selectedProduct.product.about ||
              "No description available for this product."
            }}
          </p>
        </div>
        <hr class="border-monday-border" />
        <div class="flex items-center justify-between">
          <p class="font-medium text-sm text-monday-gray">Subtotal</p>
          <p class="font-semibold text-lg text-monday-blue">
            Rp {{ formatCurrency(selectedProduct.subTotal) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import arrowCircleDownIcon from "@/assets/images/icons/arrow-circle-down.svg";
import arrowCircleUpIcon from "@/assets/images/icons/arrow-circle-up.svg";
import boxGreyIcon from "@/assets/images/icons/box-grey.svg";
import galleryDefaultIcon from "@/assets/images/icons/gallery-default.svg";
import LayoutMerchant from "@/components/LayoutMerchant.vue";
import { getFirstMerchantFromStorage } from "@/js/api";
import { getDashboardData, getTransactions } from "@/js/api/transaction";
import { onMounted, onUnmounted, ref } from "vue";

const transactions = ref([]);
const dashboardData = ref({
  totalRevenue: 0,
  totalTransactions: 0,
  productsSold: 0,
  merchant: null,
});
const expandedSections = ref([1, 2]);
const showModal = ref(false);
const loading = ref(false);
const dashboardLoading = ref(false);
const selectedProduct = ref(null);
const currentMerchant = ref(null);
const retryCount = ref(0);
const maxRetries = 3;
const dashboardError = ref("");
const refreshInterval = ref(null);

const loadDashboardData = async () => {
  try {
    dashboardLoading.value = true;

    const merchant = getFirstMerchantFromStorage();
    console.log("Ini data merchant", merchant);
    if (!merchant) {
      dashboardError.value = "No merchant found";
      window.location.href = "/";
      return;
    }

    currentMerchant.value = merchant;
    const userData = localStorage.getItem("user");
    let userId = 6;

    if (userData) {
      try {
        const user = JSON.parse(userData);
        userId = user.id || 6;
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }

    const response = await getDashboardData();

    if (response.data) {
      dashboardData.value = {
        totalRevenue: response.data.totalRevenue || 0,
        totalTransactions: response.data.totalTransaction || 0,
        productsSold: response.data.productSold || 0,
        merchant: merchant || null,
      };
    }

    retryCount.value = 0;
  } catch (error) {
    dashboardError.value = error.message || "Failed to load dashboard data";
    retryCount.value++;
    if (retryCount.value < maxRetries) {
      setTimeout(loadDashboardData, 2000);
    }

    const merchant = getFirstMerchantFromStorage();
    if (merchant) {
      dashboardData.value = {
        total_revenue: 0,
        total_transactions: 0,
        products_sold: 0,
        merchant: {
          id: merchant.id,
          name: merchant.name,
          address: merchant.address,
          photo: merchant.photo,
        },
      };
    } else {
      dashboardData.value = {
        total_revenue: 0,
        total_transactions: 0,
        products_sold: 0,
        merchant: null,
      };
    }
  } finally {
    dashboardLoading.value = false;
  }
};

const loadLatestTransactions = async () => {
  try {
    loading.value = true;

    const response = await getTransactions(
      `?pageSize=5&sortDirection=desc&sortBy=createdAt&merchantId=${currentMerchant.value.id}`,
    );

    if (response && response.data) {
      console.log("Setting transactions data:", response.data?.content);
      transactions.value = response.data.content || [];
    } else {
      transactions.value = [];
    }

    retryCount.value = 0;
  } catch (error) {
    console.error("Error loading latest transactions:", error);
    transactions.value = [];
  } finally {
    loading.value = false;
  }
};

const toggleProductAssigned = (sectionId) => {
  const index = expandedSections.value.indexOf(sectionId);
  if (index > -1) {
    expandedSections.value.splice(index, 1);
  } else {
    expandedSections.value.push(sectionId);
  }
};

const showProductDetails = (product) => {
  selectedProduct.value = product;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedProduct.value = null;
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID").format(amount);
};

const refreshDashboard = async () => {
  try {
    await loadDashboardData();
    await loadLatestTransactions();
  } catch (error) {
    console.error("Error refreshing dashboard:", error);
  }
};

onMounted(async () => {
  await loadDashboardData();
  await loadLatestTransactions();

  refreshInterval.value = setInterval(
    async () => {
      if (!dashboardLoading.value) {
        await loadDashboardData();
      }
    },
    5 * 60 * 1000,
  );
});

onUnmounted(() => {
  if (refreshInterval.value) {
    clearInterval(refreshInterval.value);
  }
});
</script>
