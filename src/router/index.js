import { createRouter, createWebHistory } from "vue-router";
import { authMiddleware } from "@/middleware/auth";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/auth/Login.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/overview",
    name: "Overview",
    component: () => import("@/views/Overview.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/products",
    name: "Products",
    component: () => import("@/views/products/ManageProducts.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/add-products",
    name: "AddProducts",
    component: () => import("@/views/products/AddProducts.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/edit-products/:id",
    name: "EditProducts",
    component: () => import("@/views/products/EditProducts.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/categories",
    name: "ManageCategories",
    component: () => import("@/views/categories/ManageCategories.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/add-categories",
    name: "AddCategories",
    component: () => import("@/views/categories/AddCategories.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/edit-categories/:id",
    name: "EditCategories",
    component: () => import("@/views/categories/EditCategories.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/warehouses",
    name: "ManageWarehouses",
    component: () => import("@/views/warehouses/ManageWarehouses.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/add-warehouses",
    name: "AddWarehouses",
    component: () => import("@/views/warehouses/AddWarehouses.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/edit-warehouses/:id",
    name: "EditWarehouses",
    component: () => import("@/views/warehouses/EditWarehouses.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/detail-warehouses/:id",
    name: "DetailWarehouses",
    component: () => import("@/views/warehouses/DetailWarehouses.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/assign-warehouse-products/:id",
    name: "AssignWarehouseProducts",
    component: () => import("@/views/warehouses/AssignWarehouseProducts.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/update-stock-warehouses/:warehouseId/stock/:productId",
    name: "UpdateStockWarehouses",
    component: () => import("@/views/warehouses/UpdateStockWarehouses.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/merchants",
    name: "ManageMerchants",
    component: () => import("@/views/merchants/ManageMerchants.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/summary",
    name: "TransactionsSummaryManager",
    component: () => import("@/views/Summary.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/add-merchants",
    name: "AddMerchants",
    component: () => import("@/views/merchants/AddMerchants.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/edit-merchants/:id",
    name: "EditMerchants",
    component: () => import("@/views/merchants/EditMerchants.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/detail-merchants/:id",
    name: "DetailMerchants",
    component: () => import("@/views/merchants/DetailMerchants.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/assign-merchant-products/:id",
    name: "AssignMerchantProducts",
    component: () => import("@/views/merchants/AssignMerchantProducts.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/update-stock-merchants/:merchantId/stock/:productId",
    name: "UpdateStockMerchants",
    component: () => import("@/views/merchants/UpdateStockMerchants.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/roles",
    name: "ManageRoles",
    component: () => import("@/views/roles/ManageRoles.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/add-roles",
    name: "AddRoles",
    component: () => import("@/views/roles/AddRoles.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/edit-roles/:id",
    name: "EditRoles",
    component: () => import("@/views/roles/EditRoles.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/users",
    name: "ManageUsers",
    component: () => import("@/views/users/ManageUsers.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/add-users",
    name: "AddUsers",
    component: () => import("@/views/users/AddUsers.vue"),
    meta: {
      requiresAuth: true,
      manager: ["manager"],
    },
  },
  {
    path: "/edit-users/:id",
    name: "EditUsers",
    component: () => import("@/views/users/EditUsers.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/user-roles",
    name: "ManageUserRoles",
    component: () => import("@/views/user-roles/ManageUserRoles.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/add-user-roles",
    name: "AddUserRoles",
    component: () => import("@/views/user-roles/AddUserRoles.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/edit-user-roles/:userId/details/:roleId",
    name: "EditUserRoles",
    component: () => import("@/views/user-roles/EditUserRoles.vue"),
    meta: {
      requiresAuth: true,
      roles: ["manager"],
    },
  },
  {
    path: "/overview-merchant",
    name: "OverviewMerchant",
    component: () => import("@/views/OverviewMerchant.vue"),
    meta: {
      requiresAuth: true,
      roles: ["keeper"],
    },
  },
  {
    path: "/my-merchant",
    name: "MyMerchant",
    component: () => import("@/views/merchants/MyMerchant.vue"),
    meta: {
      requiresAuth: true,
      roles: ["keeper"],
    },
  },
  {
    path: "/transactions",
    name: "ManageTransaction",
    component: () => import("@/views/transactions/ManageTransactions.vue"),
    meta: {
      requiresAuth: true,
      roles: ["keeper"],
    },
  },
  {
    path: "/transactions/summary",
    name: "TransactionsSummary",
    component: () => import("@/views/transactions/Summary.vue"),
    meta: {
      requiresAuth: true,
      roles: ["keeper"],
    },
  },
  {
    path: "/transaction/add-1",
    name: "AddTransaction1",
    component: () => import("@/views/transactions/AddTransaction1.vue"),
    meta: {
      requiresAuth: true,
      roles: ["keeper"],
    },
  },
  {
    path: "/transaction/add-2",
    name: "AddTransaction2",
    component: () => import("@/views/transactions/AddTransaction2.vue"),
    meta: {
      requiresAuth: true,
      roles: ["keeper"],
    },
  },
  {
    path: "/transaction/add-3",
    name: "AddTransaction3",
    component: () => import("@/views/transactions/AddTransaction3.vue"),
    meta: {
      requiresAuth: true,
      roles: ["keeper"],
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  try {
    await authMiddleware(to, from, next);
  } catch (error) {
    console.error("Navigation error:", error);
    next("/");
  }
});

export default router;
