<template>
  <Layout
    pageTitle="Assign Warehouse Products"
    breadcrumb-text="Assign Warehouse Products"
    :breadcrumb-link="`/detail-warehouses/${warehouse.id}`"
  >
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <div class="flex flex-col gap-6 w-full">
          <div class="flex flex-col rounded-3xl p-[18px] gap-5 bg-white">
            <p class="font-semibold text-xl">Warehouse Details</p>
            <div class="flex items-center gap-3">
              <div
                class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
              >
                <img
                  src="@/assets/images/thumbnails/warehouse-1.png"
                  class="size-full object-cover"
                  alt="icon"
                />
              </div>
              <div class="flex flex-col gap-2 flex-1">
                <p class="font-semibold text-lg">{{ warehouse.name }}</p>
                <p
                  class="flex items-center gap-1 font-medium text-lg text-monday-gray"
                >
                  <img
                    src="@/assets/images/icons/call-grey.svg"
                    class="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <span>{{ warehouse.phone }}</span>
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
              label="Product ID"
              :icon="barcodeIcon"
              required="true"
            >
              <option
                v-for="product in availableProducts"
                :key="product.id"
                :value="product.id"
              >
                {{ product.name }}
              </option>
            </FormSelect>
            <FormInput
              v-model="form.stock"
              label="Product Stock"
              :icon="boxIcon"
              required="true"
              type="number"
              min="0"
              step="1"
            />
            <div class="flex items-center justify-end gap-4">
              <router-link
                :to="`/detail-warehouses/${warehouse.id}`"
                class="btn btn-red font-semibold"
              >
                Cancel
              </router-link>
              <button
                type="submit"
                class="btn btn-primary font-semibold"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? "Assigning..." : "Assign Now" }}
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
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Make Sure the Warehouse Details Are Correct Lorem Ipsum is
                Simply Text
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Enter the Product Details Correctly and Accurately Lorem Ipsum
                Color amet
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Specify the Stock Quantity to Be Added Accurately is dummy text
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Review the Entered Information for Accuracy Lorem Ipsum Dummy
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Click "Create Now" to complete the process Lorem Ipsum
              </p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </Layout>
</template>
<script>
import barcodeIcon from "@/assets/images/icons/barcode-black.svg";
import boxIcon from "@/assets/images/icons/box-grey.svg";
import FormInput from "@/components/FormInput.vue";
import FormSelect from "@/components/FormSelect.vue";
import Layout from "@/components/Layout.vue";
import { getProducts } from "@/js/api/products";
import { getWarehouseById, assignProductToWarehouse } from "@/js/api/warehouse";

export default {
  name: "AssignWarehouseProducts",
  components: {
    Layout,
    FormInput,
    FormSelect,
  },
  data() {
    return {
      barcodeIcon,
      boxIcon,
      warehouse: {
        id: null,
        name: "",
        phone: "",
        photo: "",
      },
      availableProducts: [],
      form: {
        productId: null,
        stock: 0,
      },
      isSubmitting: false,
    };
  },
  async created() {
    await this.loadAvailableProducts();
    await this.loadWarehouseDetails();
  },
  methods: {
    async loadAvailableProducts() {
      try {
        const response = await getProducts();
        this.availableProducts = response.data?.content || response || [];
      } catch (error) {
        console.error("Error loading available products:", error);
        this.availableProducts = [];
      }
    },

    async loadWarehouseDetails() {
      try {
        const warehouseId = this.$route.params.id;
        if (!warehouseId) {
          console.error("Warehouse ID is required");
          this.$router.push("/warehouses");
          return;
        }
        const response = await getWarehouseById(warehouseId);
        this.warehouse = response.data;
      } catch (error) {
        console.error("Error loading warehouse details:", error);
        this.warehouse = {
          id: null,
          name: "",
          phone: "",
          photo: "",
        };
        this.$router.push("/warehouses");
      }
    },

    async handleSubmit() {
      if (!this.form.productId || !this.form.stock) {
        alert("Please fill in all required fields");
        return;
      }

      if (this.form.stock <= 0) {
        alert("Stock must be greater than 0");
        return;
      }

      this.isSubmitting = true;
      try {
        const requestData = {
          warehouseId: parseInt(this.warehouse.id),
          productId: parseInt(this.form.productId),
          stock: parseInt(this.form.stock),
        };
        const response = await assignProductToWarehouse(requestData);
        alert(
          `Product successfully assigned to ${this.warehouse.name} with ${this.form.stock} stock`,
        );
        this.$router.push(`/detail-warehouses/${this.warehouse.id}`);
      } catch (error) {
        console.error("Error assigning product to warehouse:", error);
        alert(`Failed to assign product: ${error.message}`);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>
