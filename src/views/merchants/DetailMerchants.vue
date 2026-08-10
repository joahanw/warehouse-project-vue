<template>
  <Layout
    pageTitle="Detail Merchants"
    breadcrumb-text="Detail Merchants"
    breadcrumb-link="/merchants"
  >
    <main class="flex flex-col gap-6 flex-1">
      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center rounded-3xl p-[18px] gap-6 bg-white"
      >
        <img
          src="@/assets/images/icons/loading.svg"
          class="size-[52px] animate-spin"
          alt="loading"
        />
        <p class="font-semibold text-monday-gray">
          Loading merchant details...
        </p>
      </div>

      <section
        id="Warehouse-Info"
        class="flex flex-col lg:flex-row gap-4 lg:gap-3 lg:items-center lg:justify-between rounded-3xl p-[18px] bg-white"
      >
        <div class="flex items-center gap-3 min-w-0">
          <div
            class="flex size-16 shrink-0 rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
          >
            <img
              :src="merchant.photo"
              class="size-full object-contain"
              alt="icon"
            />
          </div>
          <div class="flex flex-col gap-2 min-w-0 lg:flex-1">
            <p class="font-semibold text-xl truncate">{{ merchant.name }}</p>
            <p
              class="flex items-center gap-1 font-medium text-lg text-monday-gray"
            >
              <img
                src="@/assets/images/icons/call-grey.svg"
                class="size-6 flex shrink-0"
                alt="icon"
              />
              <span>{{ merchant.phone }}</span>
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
          <p class="font-semibold text-lg">{{ merchant.keeperName }}</p>
        </div>
        <router-link
          :to="`/edit-merchants/${merchant.id}`"
          class="btn btn-black w-full lg:w-[160px] justify-center font-semibold text-nowrap"
        >
          Edit Merchant
        </router-link>
      </section>
      <section
        id="Products"
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
                >{{ pagination.totalRecords }} Total Products</span
              >
            </p>
            <p class="font-semibold text-lg text-monday-gray">
              View and update your Product Warehouses list here.
            </p>
          </div>
          <router-link
            :to="`/assign-merchant-products/${merchant.id}`"
            class="btn btn-primary font-semibold w-full sm:w-auto"
          >
            Assign a Products
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
            <p class="font-semibold text-xl">All Products</p>
          </div>
          <!-- Loading State for Products -->
          <div
            v-if="isLoadingProducts"
            class="flex flex-col items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6"
          >
            <img
              src="@/assets/images/icons/loading.svg"
              class="size-[52px] animate-spin"
              alt="loading"
            />
            <p class="font-semibold text-monday-gray">Loading products...</p>
          </div>

          <div v-else-if="products.length > 0" class="flex flex-col gap-5">
            <template v-for="product in products" :key="product.id">
              <div
                class="card flex flex-col xl:flex-row gap-4 xl:gap-6 xl:items-center xl:justify-between"
              >
                <div class="flex items-center gap-3 w-full xl:w-[260px] xl:shrink-0">
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
                  <div class="flex items-center gap-[6px] xl:w-[154px] xl:shrink-0">
                    <img
                      src="@/assets/images/icons/box-black.svg"
                      class="size-6 flex shrink-0"
                      alt="icon"
                    />
                    <p class="font-semibold text-base xl:text-lg text-nowrap">
                      {{ product.stock }} Stock
                    </p>
                  </div>
                  <div class="flex items-center gap-[6px] xl:w-[154px] xl:shrink-0">
                    <img
                      :src="product.product.category.photo"
                      class="size-6 flex shrink-0"
                      alt="icon"
                    />
                    <p class="font-semibold text-base xl:text-lg text-nowrap">
                      {{ product.product.category.name }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-3 xl:gap-4 w-full xl:w-auto">
                  <button
                    @click="openModal(product.product, product.warehouse)"
                    type="button"
                    class="btn btn-primary-opacity flex-1 xl:flex-initial xl:min-w-[130px] justify-center font-semibold"
                  >
                    Details
                  </button>
                  <router-link
                    :to="{
                      path: `/update-stock-merchants/${merchant.id}/stock/${product.product.id}`,
                      query: {
                        merchant_product_id: product.id,
                        product_name: product.product.name,
                        product_price: product.product.price,
                        product_thumbnail: product.product.thumbnail,
                        product_category: product.product.category.name,
                        current_stock: product.stock,
                        warehouse_id: product.warehouse.id,
                        warehouse_name: product.warehouse.name,
                        warehouse_photo: product.warehouse.photo,
                        warehouse_phone: product.warehouse.phone,
                        merchant_name: merchant.name,
                        merchant_phone: merchant.phone,
                        merchant_address: merchant.address,
                        merchant_photo: merchant.photo,
                        keeper_name: merchant.keeperName,
                      },
                    }"
                    class="btn btn-black flex-1 xl:flex-initial xl:min-w-[130px] justify-center font-semibold"
                  >
                    Add Stock
                  </router-link>
                </div>
              </div>
              <hr class="border-monday-border last:hidden" />
            </template>
          </div>
          <div
            v-else-if="!isLoadingProducts"
            id="Empty-State"
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
          v-if="!isLoadingProducts && products.length > 0"
          class="flex items-center justify-between px-[18px] py-4"
        >
          <p class="font-medium text-monday-gray">
            Showing {{ startIndex + 1 }}-{{ endIndex }} of
            {{ pagination.totalRecords }} products
          </p>
          <div class="flex items-center gap-2">
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
  </Layout>
  <div
    v-if="showModal"
    class="modal flex flex-1 items-center justify-center h-full fixed top-0 left-0 w-full z-50 p-4"
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
        v-if="selectedProduct"
        class="modal-content flex flex-col rounded-3xl border border-monday-border p-4 gap-5"
      >
        <div class="flex items-center justify-between">
          <div class="flex flex-col gap-2">
            <p class="flex items-center gap-[6px] font-semibold text-lg">
              <img
                :src="selectedProduct.category.photo"
                class="size-6 flex shrink-0"
                alt="icon"
              />
              {{ selectedProduct.category.name }}
            </p>
            <p class="font-bold text-lg">{{ selectedProduct.name }}</p>
            <p class="font-semibold text-[17px] text-monday-blue">
              Rp {{ formatPrice(selectedProduct.price) }}
            </p>
          </div>
          <div
            class="flex size-[100px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
          >
            <img
              :src="selectedProduct.thumbnail"
              class="size-full object-contain"
              alt="product"
            />
          </div>
        </div>
        <hr class="border-monday-border" />
        <div>
          <p class="font-medium text-sm text-monday-gray">Product About</p>
          <p class="font-semibold leading-[160%]">
            {{ selectedProduct.about || "No description available." }}
          </p>
        </div>
        <hr class="border-monday-border" />
        <div>
          <p class="font-medium text-sm text-monday-gray">Warehouse Info</p>
          <div class="flex items-center gap-2 mt-2">
            <div
              class="flex size-8 rounded-full bg-monday-background items-center justify-center overflow-hidden"
            >
              <img
                :src="selectedWarehouse.photo"
                class="size-full object-cover"
                :alt="selectedWarehouse.name"
              />
            </div>
            <div class="flex flex-col">
              <p class="font-semibold text-sm">
                {{ selectedWarehouse.name }}
              </p>
              <p class="font-medium text-xs text-monday-gray">
                {{ selectedWarehouse.phone }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Layout from "@/components/Layout.vue";
import { getMerchantById, getMerchantProducts } from "@/js/api/merchants";
import { getKeeperById } from "@/js/api/users";

export default {
  name: "DetailMerchants",
  components: {
    Layout,
  },
  data() {
    return {
      merchant: {
        id: null,
        name: "",
        phone: "",
        address: "",
        photo: "",
        keeperId: null,
        keeperName: "",
      },
      products: [],
      showModal: false,
      selectedProduct: null,
      selectedWarehouse: null,
      isLoading: false,
      isLoadingKeeper: false,
      isLoadingProducts: false,
      currentPage: 1,
      itemsPerPage: 10,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0,
        limit: 10,
        hasNext: false,
        hasPrev: false,
      },
    };
  },
  computed: {
    startIndex() {
      return (this.pagination.currentPage - 1) * this.itemsPerPage;
    },
    endIndex() {
      return Math.min(
        this.startIndex + this.itemsPerPage,
        this.pagination.totalRecords,
      );
    },
  },
  async created() {
    await this.loadMerchantDetails();
  },
  methods: {
    async loadMerchantDetails() {
      const merchantId = this.$route.params.id;
      if (!merchantId) {
        console.error("Merchant ID is required");
        this.$router.push("/merchants");
        return;
      }
      this.isLoading = true;
      try {
        const response = await getMerchantById(merchantId);
        this.merchant = {
          id: response.data.id,
          name: response.data.name,
          phone: response.data.phone,
          address: response.data.address,
          photo: response.data.photo,
          keeperId: response.data.keeperId,
          keeperName: response.data.keeperName,
        };

        await this.loadMerchantProducts();
      } catch (error) {
        console.error("Error loading merchant details:", error);
        this.$router.push("/merchants");
        return;
      } finally {
        this.isLoading = false;
      }
    },

    async loadMerchantProducts(page = 1) {
      if (!this.merchant.id) return;

      this.currentPage = page;
      this.isLoadingProducts = true;
      try {
        const query = `?merchantId=${this.merchant.id}&pageNumber=${page - 1}&pageSize=${this.itemsPerPage}`;
        const response = await getMerchantProducts(query);
        this.products = response.data?.content || [];
        this.pagination = {
          currentPage: (response.data?.page ?? 0) + 1,
          totalPages: response.data?.totalPages || 1,
          totalRecords: response.data?.totalElements || 0,
          limit: response.data?.size || this.itemsPerPage,
          hasNext: response.data?.hasNext || false,
          hasPrev: response.data?.hasPrev || false,
        };
      } catch (error) {
        console.error("Error loading merchant products:", error);
      } finally {
        this.isLoadingProducts = false;
      }
    },

    goToPage(page) {
      this.loadMerchantProducts(page);
    },

    nextPage() {
      if (this.currentPage < this.pagination.totalPages) {
        this.loadMerchantProducts(this.currentPage + 1);
      }
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.loadMerchantProducts(this.currentPage - 1);
      }
    },

    openModal(product, warehouse) {
      this.selectedProduct = product;
      this.selectedWarehouse = warehouse;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.selectedProduct = null;
      this.selectedWarehouse = null;
    },

    formatPrice(price) {
      return new Intl.NumberFormat("id-ID").format(price);
    },
  },
};
</script>
