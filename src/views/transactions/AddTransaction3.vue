<template>
  <LayoutMerchant
    pageTitle="Add New Transaction"
    breadcrumb-text="Manage Transactions"
    breadcrumb-link="/transactions"
  >
    <main class="flex flex-col gap-6 flex-1">
      <div
        id="Steps"
        class="relative flex w-full h-auto sm:h-[127px] rounded-3xl p-[18px] bg-white"
      >
        <div
          class="relative flex flex-col w-full gap-3 items-center text-center"
        >
          <img
            src="@/assets/images/icons/tick-square-checked-blue.svg"
            class="size-8 flex shrink-0"
            alt="icon"
          />
          <div class="flex flex-col gap-1">
            <p class="font-medium text-monday-gray text-xs sm:text-base">Step 1</p>
            <p class="font-semibold text-xs sm:text-lg">Customer Detail</p>
          </div>
        </div>
        <div
          class="absolute transform -translate-y-1/2 top-[34px] left-[21.6%] h-[3px] overflow-hidden w-1/4"
        >
          <img
            src="@/assets/images/icons/Line-blue.svg"
            class="size-full object-cover object-center"
            alt="icon"
          />
        </div>
        <div
          class="relative flex flex-col w-full gap-3 items-center text-center"
        >
          <img
            src="@/assets/images/icons/tick-square-checked-blue.svg"
            class="size-8 flex shrink-0"
            alt="icon"
          />
          <div class="flex flex-col gap-1">
            <p class="font-medium text-monday-gray text-xs sm:text-base">Step 2</p>
            <p class="font-semibold text-xs sm:text-lg">Assign Products</p>
          </div>
        </div>
        <div
          class="absolute transform -translate-y-1/2 top-[34px] right-[21.6%] h-[3px] overflow-hidden w-1/4"
        >
          <img
            src="@/assets/images/icons/Line-blue.svg"
            class="size-full object-cover object-center"
            alt="icon"
          />
        </div>
        <div
          class="relative flex flex-col w-full gap-3 items-center text-center"
        >
          <img
            src="@/assets/images/icons/tick-square-blue.svg"
            class="size-8 flex shrink-0"
            alt="icon"
          />
          <div class="flex flex-col gap-1">
            <p class="font-medium text-monday-gray text-xs sm:text-base">Step 3</p>
            <p class="font-semibold text-xs sm:text-lg">Review Transaction</p>
          </div>
        </div>
      </div>
      <section
        id="Products"
        class="flex flex-col gap-6 rounded-3xl p-[18px] px-0"
      >
        <div class="flex flex-col lg:flex-row gap-6">
          <div
            class="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white"
          >
            <p class="font-semibold text-xl">Review Transaction</p>
            <div
              v-for="product in assignedProducts"
              :key="product.id"
              class="card flex flex-col w-full rounded-3xl border border-monday-border p-4 gap-5"
            >
              <div
                class="flex flex-col xl:flex-row gap-3 xl:gap-6 xl:items-center xl:justify-between"
              >
                <div class="flex items-center gap-3 w-full xl:w-[316px] xl:shrink-0">
                  <div
                    class="flex size-16 xl:size-[86px] shrink-0 rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                  >
                    <img
                      :src="product.image"
                      class="size-full object-contain"
                      alt="icon"
                    />
                  </div>
                  <div class="flex flex-col gap-1 xl:gap-2 min-w-0 flex-1">
                    <p class="font-semibold text-lg xl:text-xl truncate">
                      {{ product.name }}
                    </p>
                    <p class="price font-semibold text-lg xl:text-xl text-monday-blue">
                      {{ product.price }}
                      <span class="text-monday-gray"
                        >({{ product.quantity }}x)</span
                      >
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-[6px] w-fit shrink-0">
                  <img
                    :src="product.categoryIcon"
                    class="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <p class="font-semibold text-base xl:text-lg text-nowrap">
                    {{ product.category }}
                  </p>
                </div>
              </div>
              <hr class="border-monday-border" />
              <div class="flex w-full items-center justify-between">
                <p class="flex items-center gap-1 font-medium text-monday-gray">
                  <img
                    src="@/assets/images/icons/money-grey.svg"
                    class="size-6 flex shrink-0"
                    alt="icon"
                  />
                  Subtotal
                </p>
                <p class="subtotal font-semibold text-xl text-monday-blue">
                  {{ product.subtotal }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-6 w-full lg:w-[392px] lg:shrink-0">
            <div
              class="flex w-full h-fit rounded-3xl p-[18px] gap-3 bg-white"
            >
              <div
                class="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
              >
                <img
                  :src="customerInfo.merchant?.photo"
                  class="size-full object-contain"
                  alt="icon"
                />
              </div>
              <div class="flex flex-col gap-2 flex-1">
                <p class="font-semibold text-xl">
                  {{ customerInfo.merchant?.name }}
                </p>
                <p
                  class="flex items-center gap-1 font-medium text-lg text-monday-gray"
                >
                  <img
                    src="@/assets/images/icons/call-grey.svg"
                    class="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <span>{{ customerInfo.merchant?.phone }}</span>
                </p>
              </div>
            </div>
            <div
              class="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white"
            >
              <div class="flex flex-col gap-5">
                <p class="font-semibold text-lg">Customer Information</p>
                <div
                  class="flex items-center justify-between gap-3 rounded-2xl border border-monday-border p-4"
                >
                  <div class="flex flex-col gap-2 flex-1">
                    <p class="font-semibold text-lg">
                      {{ customerInfo.customerName }}
                    </p>
                    <p
                      class="flex items-center gap-1 font-medium text-lg text-monday-gray"
                    >
                      <img
                        src="@/assets/images/icons/call-grey.svg"
                        class="size-6 flex shrink-0"
                        alt="icon"
                      />
                      <span>{{ customerInfo.phoneNumber }}</span>
                    </p>
                  </div>
                  <div
                    class="flex size-[56px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden"
                  >
                    <img
                      src="@/assets/images/icons/user-thin-grey.svg"
                      class="flex size-6 shrink-0"
                      alt="icon"
                    />
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-5">
                <p class="font-semibold text-lg">Payment Information</p>
                <div
                  class="flex flex-col w-full items-center justify-between gap-5 rounded-2xl border border-monday-border p-4"
                >
                  <div class="flex w-full items-center justify-between">
                    <p
                      class="flex items-center gap-1 font-medium text-monday-gray"
                    >
                      <img
                        src="@/assets/images/icons/shopping-cart-grey.svg"
                        class="size-6 flex shrink-0"
                        alt="icon"
                      />
                      <span>Total Items</span>
                    </p>
                    <p class="font-semibold text-lg">
                      {{ paymentInfo.totalItems }} Item
                    </p>
                  </div>
                  <div class="flex w-full items-center justify-between">
                    <p
                      class="flex items-center gap-1 font-medium text-monday-gray"
                    >
                      <img
                        src="@/assets/images/icons/box-grey.svg"
                        class="size-6 flex shrink-0"
                        alt="icon"
                      />
                      <span>Total Quantity</span>
                    </p>
                    <p class="font-semibold text-lg">
                      {{ paymentInfo.totalQuantity }}x
                    </p>
                  </div>
                  <div class="flex w-full items-center justify-between">
                    <p
                      class="flex items-center gap-1 font-medium text-monday-gray"
                    >
                      <img
                        src="@/assets/images/icons/receipt-2-grey.svg"
                        class="size-6 flex shrink-0"
                        alt="icon"
                      />
                      <span>Subtotal</span>
                    </p>
                    <p class="font-semibold text-lg">
                      {{ paymentInfo.subtotal }}
                    </p>
                  </div>
                  <div class="flex w-full items-center justify-between">
                    <p
                      class="flex items-center gap-1 font-medium text-monday-gray"
                    >
                      <img
                        src="@/assets/images/icons/money-grey.svg"
                        class="size-6 flex shrink-0"
                        alt="icon"
                      />
                      <span>Shipping Cost</span>
                    </p>
                    <p class="font-semibold text-lg">
                      {{ paymentInfo.shippingCost }}
                    </p>
                  </div>
                  <hr class="border-monday-border w-full" />
                  <div class="flex w-full items-center justify-between">
                    <p
                      class="flex items-center gap-1 font-medium text-monday-gray"
                    >
                      <img
                        src="@/assets/images/icons/moneys-grey.svg"
                        class="size-6 flex shrink-0"
                        alt="icon"
                      />
                      <span>Grand Total</span>
                    </p>
                    <p class="font-semibold text-xl text-monday-blue">
                      {{ paymentInfo.grandTotal }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <button @click="handleBack" class="btn btn-red font-semibold">
                  Back
                </button>
                <button
                  @click="handleSaveData"
                  :disabled="isSaving"
                  :class="[
                    'btn font-semibold transition-all duration-300 flex items-center gap-2',
                    isSaving
                      ? 'btn-primary text-white cursor-not-allowed opacity-50'
                      : 'btn-primary hover:bg-monday-blue/90',
                  ]"
                >
                  <img
                    v-if="isSaving"
                    src="@/assets/images/icons/loading.svg"
                    class="size-5 animate-spin"
                    alt="loading"
                  />
                  {{ isSaving ? "Saving..." : "Save Data" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <div
      v-if="showQrModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div
        class="flex flex-col items-center gap-5 w-[400px] rounded-3xl bg-white p-6"
      >
        <p class="font-semibold text-xl">Scan QRIS to Pay</p>
        <p class="font-medium text-monday-gray">
          Order ID: {{ currentOrderId }}
        </p>
        <div
          class="flex size-64 items-center justify-center rounded-2xl bg-monday-background overflow-hidden"
        >
          <img
            :src="qrCodeUrl"
            class="size-full object-contain"
            alt="QRIS code"
          />
        </div>
        <div class="flex items-center gap-3 w-full">
          <button
            @click="downloadOrderDetails"
            class="btn btn-primary-opacity font-semibold flex-1"
          >
            Download Detail
          </button>
          <button
            @click="closeQrModal"
            class="btn btn-primary font-semibold flex-1"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  </LayoutMerchant>
</template>

<script setup>
import LayoutMerchant from "@/components/LayoutMerchant.vue";
import { createTransaction } from "@/js/api/transaction";
import { buildOrderInvoiceHtml } from "@/js/orderInvoiceTemplate";
import { useTransactionStore } from "@/stores/transaction";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const transactionStore = useTransactionStore();
const router = useRouter();

const isSaving = ref(false);
const showQrModal = ref(false);
const qrCodeUrl = ref("");
const currentOrderId = ref("");
const currentTransactionData = ref(null);

const customerInfo = computed(() => transactionStore.customerInfo);
const assignedProducts = computed(() => transactionStore.assignedProducts);

const paymentInfo = computed(() => {
  const totalItems = assignedProducts.value.length;
  const totalQuantity = assignedProducts.value.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );

  // Calculate subtotal
  const subtotalAmount = assignedProducts.value.reduce((sum, product) => {
    const price = parseInt(product.price.replace(/[^\d]/g, ""));
    return sum + price * product.quantity;
  }, 0);

  const subtotal = `Rp ${subtotalAmount.toLocaleString("id-ID")}`;
  const shipping = parseInt(customerInfo.value.shippingCost);
  const shippingCost = `Rp ${shipping.toLocaleString("id-ID")}`;
  const grandTotal = `Rp ${(subtotalAmount + shipping).toLocaleString("id-ID")}`;

  return {
    totalItems,
    totalQuantity,
    subtotal,
    shippingCost,
    grandTotal,
    subtotalAmount,
    grandTotalAmount: subtotalAmount + shippingCost,
  };
});

onMounted(() => {
  transactionStore.loadFromLocalStorage();

  if (!transactionStore.isStep1Complete) {
    router.push("/transaction/add-1");
    return;
  }

  if (!transactionStore.isStep2Complete) {
    router.push("/transaction/add-2");
    return;
  }
});

const prepareTransactionData = () => {
  const products = assignedProducts.value.map((product) => ({
    productId: product.product_id,
    productName: product.name,
    quantity: product.quantity,
    price: parseInt(product.price.replace(/[^\d]/g, "")),
  }));

  const currentDomain = window.location.origin;
  const callbackUrl = `${currentDomain}/payment/callback`;

  return {
    name: customerInfo.value.customerName,
    phone: customerInfo.value.phoneNumber,
    email: customerInfo.value.email,
    address: customerInfo.value.address,
    merchantId: customerInfo.value.merchantId,
    notes: customerInfo.value.notes,
    shippingCost: customerInfo.value.shippingCost,
    products: products,
    callback_url: callbackUrl, // Add callback URL for Midtrans
  };
};

const handleSaveData = async () => {
  try {
    isSaving.value = true;

    // Prepare transaction data
    const transactionData = prepareTransactionData();
    console.log("Transaction Data:", transactionData);

    // Call API to create transaction first — no client timeout, wait as long
    // as the backend needs (it may be slow generating the Midtrans QRIS token).
    const response = await createTransaction(transactionData, { timeout: 0 });

    if (response.data) {
      // Save transaction data for success page
      const fullTransactionData = {
        ...transactionData,
        order_id: response.data.orderId,
        payment_token: response.data.qrCodeUrl,
        timestamp: new Date().toISOString(),
        transactionId: generateTransactionId(),
      };
      console.log("Full Transaction Data:", fullTransactionData);

      localStorage.setItem(
        "lastTransaction",
        JSON.stringify(fullTransactionData),
      );

      // Clear transaction wizard data
      transactionStore.clearTransaction();

      // Tampilkan QR code QRIS untuk discan customer
      currentTransactionData.value = fullTransactionData;
      currentOrderId.value = fullTransactionData.order_id;
      qrCodeUrl.value = fullTransactionData.payment_token;
      showQrModal.value = true;
    } else {
      throw new Error("Order ID or Payment Token not found in response");
    }
  } catch (error) {
    console.error("❌ Error saving draft:", error);
    alert("Failed to save draft. Please try again.");
  } finally {
    isSaving.value = false;
  }
};

const closeQrModal = () => {
  showQrModal.value = false;
  router.push("/transactions");
};

const downloadOrderDetails = () => {
  const data = currentTransactionData.value;
  if (!data) return;

  const html = buildOrderInvoiceHtml(data);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `pesanan-${data.order_id}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const handleBack = () => {
  transactionStore.previousStep();
  router.push("/transaction/add-2");
};

const generateTransactionId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `TXN-${timestamp}-${random}`;
};
</script>
