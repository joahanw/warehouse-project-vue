<template>
  <LayoutMerchant
    pageTitle="Manage Transactions"
    breadcrumb-text=""
    breadcrumb-link=""
  >
    <main class="flex flex-col gap-6 flex-1">
      <section
        id="Warehouse-Info"
        class="flex items-center justify-between rounded-3xl p-[18px] gap-3 bg-white"
      >
        <div
          class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
        >
          <img
            :src="
              merchantInfo?.photo || '@/assets/images/thumbnails/merchant-1.png'
            "
            class="size-full object-contain"
            alt="icon"
          />
        </div>
        <div class="flex flex-col gap-2 flex-1">
          <p class="font-semibold text-xl">{{ merchantInfo?.name }}</p>
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
        <div class="flex flex-col gap-2 flex-1">
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
        <div id="Header" class="flex items-center justify-between px-[18px]">
          <div class="flex flex-col gap-[6px]">
            <p class="flex items-center gap-[6px]">
              <img
                src="@/assets/images/icons/receipt-text-black.svg"
                class="size-6 flex shrink-0"
                alt="icon"
              />
              <span class="font-semibold text-2xl"
                >{{ transactions.length || 0 }} Total Transactions</span
              >
            </p>
            <p class="font-semibold text-lg text-monday-gray">
              View and update your transactions list here.
            </p>
          </div>
          <router-link
            to="/transaction/add-1"
            class="btn btn-primary font-semibold"
          >
            Add New
            <img
              src="@/assets/images/icons/add-square-white.svg"
              class="flex sixe-6 shrink-0"
              alt="icon"
            />
          </router-link>
        </div>
        <hr class="border-monday-border" />
        <div id="Product-List" class="flex flex-col px-4 gap-5 flex-1">
          <div class="flex items-center justify-between">
            <p class="font-semibold text-xl">All Transactions</p>
            <div class="flex items-center gap-2">
              <button
                @click="fetchTransactions"
                class="btn btn-primary-opacity font-semibold"
              >
                Refresh
              </button>
            </div>
          </div>

          <div
            v-for="(transaction, index) in transactions"
            :key="transaction.id"
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
              <div class="flex items-center justify-between gap-3">
                <div
                  class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                >
                  <img
                    src="@/assets/images/icons/user-thin-grey.svg"
                    class="flex size-[42px] shrink-0"
                    alt="icon"
                  />
                </div>
                <div class="flex flex-col gap-2 flex-1">
                  <p class="font-semibold text-xl">{{ transaction.name }}</p>
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
                  <div class="card flex items-center justify-between gap-3">
                    <div class="flex items-center gap-3 w-[420px] shrink-0">
                      <div
                        class="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                      >
                        <img
                          :src="product.product.thumbnail"
                          class="size-full object-contain"
                          alt="icon"
                        />
                      </div>
                      <div class="flex flex-col gap-2 flex-1">
                        <p class="font-semibold text-xl">
                          {{ product.product.name }}
                        </p>
                        <p class="font-semibold text-xl text-monday-blue">
                          Rp {{ formaterNumber(product.product.price) }}
                          <span class="text-monday-gray"
                            >({{ product.quantity }}x)</span
                          >
                        </p>
                      </div>
                    </div>
                    <div
                      class="flex items-center gap-[6px] w-full justify-center"
                    >
                      <img
                        :src="product.product.category?.photo"
                        class="size-6 flex shrink-0"
                        alt="icon"
                      />
                      <p class="font-semibold text-lg text-nowrap">
                        {{ product.product.category?.name }}
                      </p>
                    </div>
                    <button
                      @click="showProductDetails(product)"
                      class="btn btn-primary-opacity min-w-[130px] font-semibold"
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
            v-if="transactions.length === 0"
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
      </section>
    </main>
    <div
      v-if="showModal"
      class="modal flex flex-1 items-center justify-center h-full fixed top w-full z-50 left-0"
    >
      <div
        @click="closeModal"
        class="backdrop absolute w-full h-full bg-[#292D32B2]"
      ></div>
      <div
        class="relative flex flex-col w-[406px] shrink-0 rounded-3xl p-[18px] gap-5 bg-white"
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
  </LayoutMerchant>
</template>

<script setup>
import LayoutMerchant from "@/components/LayoutMerchant.vue";
import { getTransactions } from "@/js/api/transaction";
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted, ref } from "vue";
import arrowCircleDownIcon from "@/assets/images/icons/arrow-circle-down.svg";
import arrowCircleUpIcon from "@/assets/images/icons/arrow-circle-up.svg";

const authStore = useAuthStore();

const transactions = ref([]);

const expandedSections = ref([]);
const showModal = ref(false);
const selectedProduct = ref({});

const merchantData = computed(() => {
  return authStore.getMerchantData();
});

const merchantInfo = computed(() => {
  if (merchantData.value && merchantData.value.length > 0) {
    return merchantData.value[0];
  }
  return null;
});

const fetchTransactions = async () => {
  try {
    const merchantId = merchantInfo.value?.id;
    const response = await getTransactions(
      `?merchantId=${merchantId}&sortDirection=desc&sortBy=id`,
    );
    transactions.value = response.data.content || [];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    transactions.value = [];
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

onMounted(async () => {
  const roles = authStore.userRole?.toLowerCase().split(",");
  if (!merchantData.value && roles.includes("keeper")) {
    await authStore.refreshMerchantData();
  }

  await new Promise((resolve) => setTimeout(resolve, 100));
  fetchTransactions();
});
</script>
