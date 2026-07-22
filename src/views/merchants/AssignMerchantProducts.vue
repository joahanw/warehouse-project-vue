<template>
  <Layout
    pageTitle="Assign Merchant Products"
    breadcrumb-text="Assign Merchant Products"
    breadcrumb-link="/detail-merchants"
  >
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <div class="flex flex-col gap-6 w-full">
          <!-- Loading State for Merchant Details -->
          <div
            v-if="isLoadingMerchant"
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

          <div v-else class="flex flex-col rounded-3xl p-[18px] gap-5 bg-white">
            <p class="font-semibold text-xl">Merchant Details</p>
            <div class="flex items-center gap-3">
              <div
                class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
              >
                <img
                  :src="merchantDetails.photo || ''"
                  class="size-full object-cover"
                  alt="icon"
                />
              </div>
              <div class="flex flex-col gap-2 flex-1">
                <p class="font-semibold text-lg">{{ merchantDetails.name }}</p>
                <p
                  class="flex items-center gap-1 font-medium text-lg text-monday-gray"
                >
                  <img
                    src="../../assets/images/icons/user-thin-grey.svg"
                    class="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <span>{{ merchantDetails.keeper }}</span>
                </p>
              </div>
            </div>
          </div>
          <form
            @submit.prevent="handleSubmit"
            class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white"
          >
            <h2 class="font-semibold text-xl capitalize">Complete the form</h2>
            <FormSelect
              v-model="form.productId"
              label="Product Id"
              icon="../../src/assets/images/icons/profile-circle-grey.svg"
              required
              :disabled="isLoadingProducts"
            >
              <option
                v-for="product in products"
                :key="product.id"
                :value="product.id"
              >
                {{ product.name }}
              </option>
            </FormSelect>
            <FormSelect
              v-model="form.warehouseId"
              label="Warehouse Id"
              icon="../../src/assets/images/icons/profile-circle-grey.svg"
              required
              :disabled="isLoadingWarehouses || !form.productId"
            >
              <option
                v-for="warehouse in warehouses"
                :key="warehouse.id"
                :value="warehouse.id"
              >
                {{ warehouse.name }}
              </option>
            </FormSelect>
            <FormInput
              v-model="form.stock"
              label="Product Stock"
              icon="../../src/assets/images/icons/box-grey.svg"
              required="true"
              type="number"
              min="0"
              step="1"
            />
            <div class="flex items-center justify-end gap-4">
              <router-link
                :to="`/detail-merchants/${$route.params.id}`"
                class="btn btn-red font-semibold"
              >
                Cancel
              </router-link>
              <button
                type="submit"
                class="btn btn-primary font-semibold"
                :disabled="isLoading"
              >
                {{ isLoading ? "Assigning..." : "Assign Now" }}
              </button>
            </div>
          </form>
        </div>
        <div
          class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white"
        >
          <p class="font-semibold">Quick Guide to Assign New Product</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img
                src="../../assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Verify and confirm merchant Lorem information to ensure accuracy
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="../../assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Verify all details for accuracy before proceeding to prevent
                errors
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="../../assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Accurately enter the stock quantity to maintain precise
                inventory records
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="../../assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Carefully review warehouse and product details to ensure
                accuracy Ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="../../assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Click 'Create Now' to assign and finalize the process
                efficiently
              </p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import FormSelect from "@/components/FormSelect.vue";
import Layout from "@/components/Layout.vue";
import FormInput from "@/components/FormInput.vue";
import { getMerchantById, assignProductToMerchant } from "@/js/api/merchants";
import { getProducts } from "@/js/api/products";
import { getWarehousesForProduct } from "@/js/api/warehouse";

export default {
  name: "AssignMerchantProducts",
  components: {
    Layout,
    FormSelect,
    FormInput,
  },
  data() {
    return {
      merchantDetails: {
        name: "",
        photo: "",
        keeper: "",
      },
      form: {
        warehouseId: "",
        productId: "",
        stock: "",
      },
      warehouses: [],
      products: [],
      isLoading: false,
      isLoadingMerchant: false,
      isLoadingProducts: false,
      isLoadingWarehouses: false,
    };
  },
  async created() {
    await this.loadMerchantDetails();
    await this.loadProducts();
  },

  methods: {
    async loadMerchantDetails() {
      const merchantId = this.$route.params.id;

      if (!merchantId) {
        console.error("No merchant ID provided");
        this.$router.push(`/merchants/${merchantId}`);
        return;
      }

      this.isLoadingMerchant = true;

      try {
        const response = await getMerchantById(merchantId);
        this.merchantDetails = {
          name: response.data.name || "",
          photo: response.data.photo || "",
          keeper: response.data.keeperName || "Keeper tidak ditemukan",
        };
      } catch (error) {
        console.error("Error loading merchant details:", error); // Redirect to merchants list if merchant not found
        this.$router.push("/merchants");
      } finally {
        this.isLoadingMerchant = false;
      }
    },

    async loadProducts() {
      this.isLoadingProducts = true;

      try {
        const response = await getProducts();
        this.products = response.data.content || [];
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        this.isLoadingProducts = false;
      }
    },

    async loadWarehouseByProductId(productId) {
      if (!productId) {
        this.warehouses = [];
        return;
      }
      this.isLoadingWarehouses = true;
      try {
        const response = await getWarehousesForProduct(productId);
        console.log(response.data);
        this.warehouses = response.data || [];
      } catch (error) {
        console.error("Error loading warehouses:", error);
      } finally {
        this.isLoadingWarehouses = false;
      }
    },

    async handleSubmit() {
      if (!this.form.productId || !this.form.warehouseId || !this.form.stock) {
        alert("Mohon lengkapi semua data!");
        return;
      }

      if (this.form.stock <= 0) {
        alert("Stock harus lebih dari 0");
        return;
      }

      this.isLoading = true;

      const merchantId = this.$route.params.id;
      try {
        const requestData = {
          productId: this.form.productId,
          warehouseId: this.form.warehouseId,
          stock: parseInt(this.form.stock),
          merchantId: parseInt(merchantId),
        };

        const response = await assignProductToMerchant(requestData);
        alert("Produk berhasil ditugaskan ke merchant!");
        this.$router.push(`/detail-merchants/${merchantId}`);
      } catch (error) {
        console.error("Error assigning product to merchant:", error);
        alert(`Gagal menugaskan produk: ${error.message}`);
      } finally {
        this.isLoading = false;
      }
    },
  },
  watch: {
    "form.productId": {
      handler(newProductId) {
        if (newProductId) {
          this.loadWarehouseByProductId(newProductId);
          this.form.warehouseId = "";
        } else {
          this.warehouses = [];
          this.form.warehouseId = "";
        }
      },
      immediate: false,
    },
  },
};
</script>
