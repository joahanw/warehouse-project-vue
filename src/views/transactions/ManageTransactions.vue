<template>
  <LayoutMerchant
    pageTitle="Manage Transactions"
    breadcrumb-text=""
    breadcrumb-link=""
  >
    <main class="flex flex-col gap-6 flex-1">
      <section
        id="Warehouse-Info"
        class="flex flex-col lg:flex-row gap-4 lg:gap-3 lg:items-center rounded-3xl p-[18px] bg-white"
      >
        <div class="flex items-center gap-3 min-w-0">
          <div
            class="flex size-16 shrink-0 rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
          >
            <img
              :src="
                merchantInfo?.photo ||
                '@/assets/images/thumbnails/merchant-1.png'
              "
              class="size-full object-contain"
              alt="icon"
            />
          </div>
          <div class="flex flex-col gap-2 min-w-0 lg:flex-1">
            <p class="font-semibold text-xl truncate">
              {{ merchantInfo?.name }}
            </p>
            <p
              class="flex items-center gap-1 font-medium text-lg text-monday-gray"
            >
              <img
                src="@/assets/images/icons/call-grey.svg"
                class="size-6 flex shrink-0"
                alt="icon"
              />
              <span>{{ merchantInfo?.phone }}</span>
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-2 lg:flex-1">
          <p class="flex items-center gap-1 font-medium text-monday-gray">
            <img
              src="@/assets/images/icons/user-grey.svg"
              class="size-4 flex shrink-0"
              alt="icon"
            />
            <span>Keeper Name:</span>
          </p>
          <p class="font-semibold text-lg">
            {{ merchantInfo?.keeperName }} (You)
          </p>
        </div>
      </section>
      <section
        id="Products"
        class="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white"
      >
        <div
          id="Header"
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-[18px]"
        >
          <div class="flex flex-col gap-[6px]">
            <p class="flex items-center gap-[6px]">
              <img
                src="@/assets/images/icons/receipt-text-black.svg"
                class="size-6 flex shrink-0"
                alt="icon"
              />
              <span class="font-semibold text-2xl"
                >{{ pagination.totalRecords }} Total Transactions</span
              >
            </p>
            <p class="font-semibold text-lg text-monday-gray">
              View and update your transactions list here.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <router-link
              to="/transactions/summary"
              class="btn btn-primary-opacity font-semibold w-full sm:w-auto justify-center"
            >
              View Summary
            </router-link>
            <router-link
              to="/transaction/add-1"
              class="btn btn-primary font-semibold w-full sm:w-auto justify-center"
            >
              Add New
              <img
                src="@/assets/images/icons/add-square-white.svg"
                class="flex sixe-6 shrink-0"
                alt="icon"
              />
            </router-link>
          </div>
        </div>
        <hr class="border-monday-border" />
        <div id="Product-List" class="flex flex-col px-4 gap-5 flex-1">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p class="font-semibold text-xl">All Transactions</p>
            <div class="flex items-center gap-2">
              <button
                @click="fetchTransactions(1)"
                class="btn btn-primary-opacity font-semibold"
              >
                Refresh
              </button>
            </div>
          </div>

          <div v-if="isLoading" class="flex items-center justify-center py-12">
            <div class="flex items-center gap-3">
              <img
                src="@/assets/images/icons/loading.svg"
                class="size-6 animate-spin"
                alt="loading"
              />
              <span class="font-semibold text-lg">Loading transactions...</span>
            </div>
          </div>

          <div
            v-for="(transaction, index) in transactions"
            :key="transaction.id"
            v-show="!isLoading"
            class="card-merchant flex flex-col rounded-2xl border border-monday-border"
          >
            <div class="flex flex-col gap-5 p-4 pb-5">
              <div class="flex items-center justify-between">
                <p class="font-semibold text-lg">Customer Details</p>
                <span
                  :class="
                    getPaymentStatusBadge(transaction.paymentStatus).class
                  "
                  class="flex items-center gap-[6px] px-3 py-1 rounded-full font-semibold text-sm text-nowrap"
                >
                  <span
                    :class="
                      getPaymentStatusBadge(transaction.paymentStatus).dotClass
                    "
                    class="size-[6px] rounded-full shrink-0"
                  ></span>
                  {{ getPaymentStatusBadge(transaction.paymentStatus).label }}
                </span>
              </div>
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
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
                      <span>{{ transaction.phone }}</span>
                    </p>
                  </div>
                </div>
                <div
                  v-if="canConfirmPayment(transaction)"
                  class="flex items-center gap-2 w-full sm:w-auto sm:shrink-0"
                >
                  <button
                    type="button"
                    @click="openConfirmDialog(transaction, 'failed')"
                    :disabled="confirmingId === transaction.id"
                    class="flex flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-full bg-monday-red/10 text-monday-red px-3.5 py-2 font-semibold text-sm text-nowrap ring-1 ring-inset ring-monday-red/20 transition-all duration-200 hover:bg-monday-red hover:text-white hover:ring-monday-red active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <svg
                      class="size-4 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Failed
                  </button>
                  <button
                    type="button"
                    @click="openConfirmDialog(transaction, 'success')"
                    :disabled="confirmingId === transaction.id"
                    class="flex flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-full bg-monday-blue/10 text-monday-blue px-3.5 py-2 font-semibold text-sm text-nowrap ring-1 ring-inset ring-monday-blue/20 transition-all duration-200 hover:bg-monday-blue hover:text-white hover:ring-monday-blue active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <svg
                      class="size-4 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Success
                  </button>
                </div>
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
                    transaction.transactionProducts?.length
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
                <template
                  v-for="(
                    product, productIndex
                  ) in transaction.transactionProducts"
                  :key="product.id"
                >
                  <div
                    class="card flex flex-col xl:flex-row gap-4 xl:gap-3 xl:items-center xl:justify-between"
                  >
                    <div
                      class="flex items-center gap-3 w-full xl:w-[420px] xl:shrink-0"
                    >
                      <div
                        class="flex size-16 xl:size-[86px] shrink-0 rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                      >
                        <img
                          :src="product.product.thumbnail"
                          class="size-full object-contain"
                          alt="icon"
                        />
                      </div>
                      <div class="flex flex-col gap-1 xl:gap-2 min-w-0 flex-1">
                        <p class="font-semibold text-lg xl:text-xl truncate">
                          {{ product.product.name }}
                        </p>
                        <p
                          class="font-semibold text-lg xl:text-xl text-monday-blue"
                        >
                          Rp {{ formaterNumber(product.product.price) }}
                          <span class="text-monday-gray"
                            >({{ product.quantity }}x)</span
                          >
                        </p>
                      </div>
                    </div>
                    <div
                      class="flex items-center gap-[6px] xl:flex-1 xl:justify-center"
                    >
                      <img
                        :src="product.product.category?.photo"
                        class="size-6 flex shrink-0"
                        alt="icon"
                      />
                      <p class="font-semibold text-base xl:text-lg text-nowrap">
                        {{ product.product.category?.name }}
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
                      productIndex < transaction.transactionProducts.length - 1
                    "
                    class="border-monday-border"
                  />
                </template>
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
                Rp {{ formaterNumber(transaction.grandTotal) }}
              </p>
            </div>
          </div>
          <div
            v-if="!isLoading && transactions.length === 0"
            class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6"
          >
            <img
              src="@/assets/images/icons/document-text-grey.svg"
              class="size-[52px]"
              alt="icon"
            />
            <p class="font-semibold text-monday-gray">
              Oops, it looks like there's no data yet.
            </p>
          </div>
        </div>
        <div
          v-if="!isLoading && transactions.length > 0"
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-[18px] py-4"
        >
          <p class="font-medium text-monday-gray">
            Showing {{ startIndex + 1 }}-{{ endIndex }} of
            {{ pagination.totalRecords }} transactions
          </p>
          <div class="flex flex-wrap items-center gap-2">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="btn btn-primary-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              v-for="page in pagination.totalPages"
              :key="page"
              @click="goToPage(page)"
              :disabled="page === currentPage"
              :class="[
                'px-4 py-2 rounded-2xl font-semibold transition-300',
                page === currentPage
                  ? 'bg-monday-blue text-white'
                  : 'bg-monday-gray-background text-monday-gray hover:bg-monday-border',
              ]"
            >
              {{ page }}
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === pagination.totalPages"
              class="btn btn-primary-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </main>
    <div
      v-if="showModal"
      class="modal flex flex-1 items-center justify-center h-full fixed top w-full z-50 left-0 p-4"
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
        >
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-2">
              <p class="flex items-center gap-[6px] font-semibold text-lg">
                <img
                  :src="selectedProduct.product.category?.photo"
                  class="size-6 flex shrink-0"
                  alt="icon"
                />
                {{ selectedProduct.product.category?.name }}
              </p>
              <p class="font-bold text-lg">
                {{ selectedProduct.product.name }}
              </p>
              <p class="font-semibold text-[17px] text-monday-blue">
                Rp {{ formaterNumber(selectedProduct.price) }}
              </p>
            </div>
            <div
              class="flex size-[100px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
            >
              <img
                :src="selectedProduct.product.thumbnail"
                class="size-full object-contain"
                alt="icon"
              />
            </div>
          </div>
          <hr class="border-monday-border" />
          <div>
            <p class="font-medium text-sm text-monday-gray">Product About</p>
            <p class="font-semibold leading-[160%]">
              {{ selectedProduct.product.about }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="confirmDialog.open"
        class="modal flex flex-1 items-center justify-center h-full fixed top w-full z-50 left-0 p-4"
      >
        <div
          @click="!isConfirming && closeConfirmDialog()"
          class="backdrop absolute w-full h-full bg-[#292D32B2]"
        ></div>
        <Transition name="pop" appear>
          <div
            class="relative flex flex-col w-full max-w-[380px] rounded-3xl p-6 gap-5 bg-white text-center items-center"
          >
            <div
              :class="
                confirmDialog.status === 'success'
                  ? 'bg-monday-blue/10 text-monday-blue'
                  : 'bg-monday-red/10 text-monday-red'
              "
              class="flex size-16 rounded-full items-center justify-center shrink-0"
            >
              <svg
                v-if="confirmDialog.status === 'success'"
                class="size-8"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <svg
                v-else
                class="size-8"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="flex flex-col gap-2">
              <p class="font-semibold text-xl">
                {{
                  confirmDialog.status === "success"
                    ? "Confirm Payment Success?"
                    : "Confirm Payment Failed?"
                }}
              </p>
              <p class="font-medium text-monday-gray leading-[150%]">
                Transaksi
                <span class="font-semibold text-monday-black">{{
                  confirmDialog.transaction?.name
                }}</span>
                senilai
                <span class="font-semibold text-monday-black"
                  >Rp
                  {{
                    formaterNumber(confirmDialog.transaction?.grandTotal)
                  }}</span
                >
                akan ditandai sebagai
                <span class="font-semibold">{{
                  confirmDialog.status === "success" ? "Success" : "Failed"
                }}</span
                >. Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div class="flex items-center gap-3 w-full">
              <button
                type="button"
                @click="closeConfirmDialog"
                :disabled="isConfirming"
                class="btn btn-primary-opacity font-semibold flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="button"
                @click="submitConfirmDialog"
                :disabled="isConfirming"
                :class="
                  confirmDialog.status === 'success' ? 'btn-primary' : 'btn-red'
                "
                class="btn font-semibold flex-1 justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <img
                  v-if="isConfirming"
                  src="@/assets/images/icons/loading.svg"
                  class="size-5 animate-spin"
                  alt="loading"
                />
                {{ isConfirming ? "Processing..." : "Yes, Confirm" }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </LayoutMerchant>
</template>

<script setup>
import LayoutMerchant from "@/components/LayoutMerchant.vue";
import { confirmPayment, getTransactions } from "@/js/api/transaction";
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted, ref } from "vue";
import arrowCircleDownIcon from "@/assets/images/icons/arrow-circle-down.svg";
import arrowCircleUpIcon from "@/assets/images/icons/arrow-circle-up.svg";

const authStore = useAuthStore();

const transactions = ref([]);
const isLoading = ref(false);

const currentPage = ref(1);
const itemsPerPage = ref(10);
const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  totalRecords: 0,
  limit: 10,
  hasNext: false,
  hasPrev: false,
});

const startIndex = computed(
  () => (pagination.value.currentPage - 1) * itemsPerPage.value,
);
const endIndex = computed(() =>
  Math.min(
    startIndex.value + itemsPerPage.value,
    pagination.value.totalRecords,
  ),
);

const expandedSections = ref([]);
const showModal = ref(false);
const selectedProduct = ref({});
const confirmingId = ref(null);
const confirmDialog = ref({ open: false, transaction: null, status: null });
const isConfirming = computed(() => confirmingId.value !== null);

const merchantData = computed(() => {
  return authStore.getMerchantData();
});

const merchantInfo = computed(() => {
  if (merchantData.value && merchantData.value.length > 0) {
    return merchantData.value[0];
  }
  return null;
});

const fetchTransactions = async (page = 1) => {
  try {
    isLoading.value = true;
    currentPage.value = page;

    const merchantId = merchantInfo.value?.id;
    const response = await getTransactions(
      `?merchantId=${merchantId}&sortBy=createdAt&sortDirection=desc&pageNumber=${page - 1}&pageSize=${itemsPerPage.value}`,
    );
    transactions.value = response.data.content || [];
    pagination.value = {
      currentPage: (response.data?.page ?? 0) + 1,
      totalPages: response.data?.totalPages || 1,
      totalRecords: response.data?.totalElements || 0,
      limit: response.data?.size || itemsPerPage.value,
      hasNext: response.data?.hasNext || false,
      hasPrev: response.data?.hasPrev || false,
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    transactions.value = [];
  } finally {
    isLoading.value = false;
  }
};

const goToPage = (page) => {
  fetchTransactions(page);
};

const nextPage = () => {
  if (currentPage.value < pagination.value.totalPages) {
    fetchTransactions(currentPage.value + 1);
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    fetchTransactions(currentPage.value - 1);
  }
};

const formaterNumber = (number) => {
  return new Intl.NumberFormat("id-ID").format(number);
};

const getPaymentStatusBadge = (status) => {
  const normalized = (status || "").toLowerCase();

  if (
    ["paid", "settlement", "capture", "success", "completed"].includes(
      normalized,
    )
  ) {
    return {
      label: "Success",
      class: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-200",
      dotClass: "bg-green-500",
    };
  }
  if (
    [
      "deny",
      "cancel",
      "cancelled",
      "expire",
      "expired",
      "failure",
      "failed",
    ].includes(normalized)
  ) {
    return {
      label: "Failed",
      class: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
      dotClass: "bg-red-500",
    };
  }
  if (["pending"].includes(normalized)) {
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
};

const canConfirmPayment = (transaction) => {
  return (
    transaction.paymentMethod === "bca_qris_static" &&
    getPaymentStatusBadge(transaction.paymentStatus).label === "Pending"
  );
};

const openConfirmDialog = (transaction, status) => {
  confirmDialog.value = { open: true, transaction, status };
};

const closeConfirmDialog = () => {
  confirmDialog.value = { open: false, transaction: null, status: null };
};

const submitConfirmDialog = async () => {
  const { transaction, status } = confirmDialog.value;
  if (!transaction || !status) return;

  try {
    confirmingId.value = transaction.id;
    await confirmPayment(transaction.id, status);
    transaction.paymentStatus = status;
    closeConfirmDialog();
  } catch (error) {
    console.error("Error confirming payment:", error);
    alert("Failed to confirm payment. Please try again.");
  } finally {
    confirmingId.value = null;
  }
};

onMounted(async () => {
  const roles = authStore.userRole?.toLowerCase().split(",");
  if (!merchantData.value && roles.includes("keeper")) {
    await authStore.refreshMerchantData();
  }

  await new Promise((resolve) => setTimeout(resolve, 100));
  fetchTransactions();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.pop-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(8px);
}
</style>
