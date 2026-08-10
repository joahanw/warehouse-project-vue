<template>
  <LayoutMerchant pageTitle="My Merchant">
    <main class="flex flex-col gap-6 flex-1">
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="flex items-center gap-3">
          <img
            src="@/assets/images/icons/loading.svg"
            class="size-6 animate-spin"
            alt="loading"
          />
          <span class="font-semibold text-lg">Loading merchants...</span>
        </div>
      </div>
      <section
        v-else-if="selectedMerchant"
        class="flex items-center justify-between rounded-3xl p-[18px] gap-3 bg-white"
      >
        <div
          class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
        >
          <img
            :src="selectedMerchant.photo"
            class="size-full object-contain"
            alt="icon"
          />
        </div>
        <div class="flex flex-col gap-2 flex-1">
          <p class="font-semibold text-xl">{{ selectedMerchant.name }}</p>
          <p
            class="flex items-center gap-1 font-medium text-lg text-monday-gray"
          >
            <img
              src="@/assets/images/icons/call-grey.svg"
              class="size-6 flex shrink-0"
              alt="icon"
            />
            <span>{{ selectedMerchant.phone }}</span>
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
            {{ selectedMerchant.keeperName }} (You)
          </p>
        </div>
      </section>
      <section
        v-if="merchants"
        class="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white"
      >
        <div id="Header" class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-[18px]">
          <div class="flex flex-col gap-[6px]">
            <p class="flex items-center gap-[6px]">
              <img
                src="@/assets/images/icons/buildings-2-black.svg"
                class="size-6 flex shrink-0"
                alt="icon"
              />
              <span class="font-semibold text-2xl"
                >{{ merchantProducts?.length }} Total Products</span
              >
            </p>
            <p class="font-semibold text-lg text-monday-gray">
              View and update your Product Warehouses list here.
            </p>
            <button
              @click="refreshProducts"
              :disabled="loadingProducts"
              class="btn btn-primary-opacity font-semibold flex items-center gap-2"
            >
              <span>{{ loadingProducts ? "Refreshing..." : "Refresh" }}</span>
            </button>
          </div>
        </div>
        <hr class="border-monday-border" />
        <div id="Product-List" class="flex flex-col px-4 gap-5 flex-1">
          <div class="flex items-center justify-between">
            <p class="font-semibold text-xl">All Products</p>
          </div>

          <div
            v-if="loadingProducts"
            class="flex items-center justify-center py-12"
          >
            <div class="flex items-center gap-3">
              <img
                src="@/assets/images/icons/loading.svg"
                class="size-6 animate-spin"
                alt="loading"
              />
              <span class="font-semibold text-lg">Loading products...</span>
            </div>
          </div>

          <div v-else class="flex flex-col gap-5">
            <template
              v-for="(product, index) in merchantProducts"
              :key="product.id"
            >
              <div
                class="card flex flex-col xl:flex-row gap-4 xl:gap-6 xl:items-center xl:justify-between"
              >
                <div class="flex items-center gap-3 w-full xl:w-[340px] xl:shrink-0">
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
                    <p class="font-semibold text-lg xl:text-xl text-monday-blue">
                      Rp {{ formatPrice(product.product.price) }}
                    </p>
                  </div>
                </div>
                <div class="flex flex-wrap items-center gap-3 xl:contents">
                  <div class="flex items-center gap-[6px] xl:w-[187px] xl:shrink-0">
                    <img
                      src="@/assets/images/icons/box-black.svg"
                      class="size-6 flex shrink-0"
                      alt="icon"
                    />
                    <p class="font-semibold text-base xl:text-lg text-nowrap">
                      {{ product.stock }} Stock
                    </p>
                  </div>
                  <div class="flex items-center gap-[6px] xl:w-[187px] xl:shrink-0">
                    <img
                      :src="product.product.category?.photo"
                      class="size-6 flex shrink-0"
                      alt="icon"
                    />
                    <p class="font-semibold text-base xl:text-lg text-nowrap">
                      {{ product.product.category?.name }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-4 w-full xl:w-auto">
                  <button
                    @click="showProductDetails(product)"
                    class="btn btn-primary-opacity w-full xl:w-auto xl:min-w-[130px] justify-center font-semibold"
                  >
                    Details
                  </button>
                </div>
              </div>
              <hr
                v-if="index < merchantProducts.length - 1"
                class="border-monday-border last:hidden"
              />
            </template>
          </div>
          <div
            v-if="
              !loadingProducts &&
              (!merchantProducts || merchantProducts.length === 0)
            "
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
          v-if="!loadingProducts && merchantProducts.length > 0"
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-[18px] py-4"
        >
          <p class="font-medium text-monday-gray">
            Showing {{ startIndex + 1 }}-{{ endIndex }} of
            {{ pagination.totalRecords }} products
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
      <div
        v-else-if="showEmptyState"
        class="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6"
      >
        <img
          src="@/assets/images/icons/document-text-grey.svg"
          class="size-[52px]"
          alt="icon"
        />
        <p class="font-semibold text-monday-gray">
          Oops, it looks like there's no merchant assigned to you yet.
        </p>
      </div>
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
                  :src="selectedProduct.product_category_photo"
                  class="size-6 flex shrink-0"
                  alt="icon"
                />
                {{ selectedProduct.product.category?.name }}
              </p>
              <p class="font-bold text-lg">
                {{ selectedProduct.product.name }}
              </p>
              <p class="font-semibold text-[17px] text-monday-blue">
                Rp {{ formatPrice(selectedProduct.product.price) }}
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
import { getMerchantProducts } from "@/js/api/merchants";
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted, ref } from "vue";

const authStore = useAuthStore();

const merchants = ref([]);
const selectedMerchant = ref(null);
const merchantProducts = ref([]);
const loading = ref(true);
const loadingProducts = ref(false);
const showModal = ref(false);
const showEmptyState = ref(false);
const selectedProduct = ref({});

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
  Math.min(startIndex.value + itemsPerPage.value, pagination.value.totalRecords),
);

const fetchMerchants = async () => {
  try {
    loading.value = true;

    const storedMerchantData = authStore.getMerchantData();

    if (storedMerchantData && storedMerchantData.length > 0) {
      merchants.value = storedMerchantData;
      showEmptyState.value = false;

      if (merchants.value.length > 0) {
        selectedMerchant.value = merchants.value[0];
        await fetchMerchantProducts(selectedMerchant.value.id);
      }
    } else {
      showEmptyState.value = true;
    }
  } catch (error) {
    console.error("Error fetching merchants:", error);
    showEmptyState.value = true;
  } finally {
    loading.value = false;
  }
};

const fetchMerchantProducts = async (merchantId) => {
  try {
    loadingProducts.value = true;

    const response = await getMerchantProducts(
      `?merchantId=${merchantId}&pageNumber=${currentPage.value - 1}&pageSize=${itemsPerPage.value}`,
    );
    merchantProducts.value = response.data ? response.data.content : [];
    pagination.value = {
      currentPage: (response.data?.page ?? 0) + 1,
      totalPages: response.data?.totalPages || 1,
      totalRecords: response.data?.totalElements || 0,
      limit: response.data?.size || itemsPerPage.value,
      hasNext: response.data?.hasNext || false,
      hasPrev: response.data?.hasPrev || false,
    };
  } catch (error) {
    console.error("Error fetching merchant products:", error);
    merchantProducts.value = [];
  } finally {
    loadingProducts.value = false;
  }
};

const selectMerchant = async (merchant) => {
  selectedMerchant.value = merchant;
  currentPage.value = 1;
  await fetchMerchantProducts(merchant.id);
};

const refreshProducts = async () => {
  if (selectedMerchant.value) {
    currentPage.value = 1;
    await fetchMerchantProducts(selectedMerchant.value.id);
  }
};

const goToPage = async (page) => {
  if (!selectedMerchant.value) return;
  currentPage.value = page;
  await fetchMerchantProducts(selectedMerchant.value.id);
};

const nextPage = async () => {
  if (currentPage.value < pagination.value.totalPages) {
    currentPage.value++;
    await fetchMerchantProducts(selectedMerchant.value.id);
  }
};

const previousPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    await fetchMerchantProducts(selectedMerchant.value.id);
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID").format(price);
};

const showProductDetails = (product) => {
  selectedProduct.value = product;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

onMounted(async () => {
  await fetchMerchants();
});
</script>
