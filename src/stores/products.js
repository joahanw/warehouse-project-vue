import { defineStore } from "pinia";
import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
} from "../js/api/products";

export const useProductStore = defineStore("products", {
  state: () => ({
    products: [],
    categories: [],
    loading: false,
    error: null,
  }),
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find((product) => product.id === parseInt(id));
    },
    getProductByCategory: (state) => (category) => {
      return state.products.filter((product) => product.category === category);
    },
    getLowStockProducts: (state) => {
      return state.products.filter((product) => product.stock < 10);
    },
    totalProducts: (state) => state.products.length,
    totalValue: (state) => {
      return state.products.reduce((total, product) => {
        return total + product.price * product.stock;
      }, 0);
    },
  },
  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;

      try {
        const response = await getProducts();
        this.products = response.data?.content || response || [];
      } catch (error) {
        console.error("Error fetching products:", error);
        this.error = error.message || "Gagal mengambil data produk";
        this.products = [];
      } finally {
        this.loading = false;
      }
    },

    async fetchCategories() {
      this.loading = true;
      this.error = null;

      try {
        const response = await getCategories();
        this.categories = response.data?.content || response || [];
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

    async addProduct(productData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await createProduct(productData);
        this.products.push(response.data || response);
        return response.data || response;
      } catch (error) {
        console.error("Error creating product:", error);
        this.error = error.message || "Gagal membuat produk";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateProduct(productId, productData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await updateProduct(productId, productData);
        const updatedProduct = response.data || response;

        const index = this.products.findIndex(
          (product) => product.id === parseInt(productId),
        );
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
        return updatedProduct;
      } catch (error) {
        console.error("Error updating product:", error);
        this.error = error.message || "Gagal memperbarui produk";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async addCategory(category) {
      try {
        const response = await createProduct(category);
        this.categories.push(response.data || response);
        return response.data || response;
      } catch (error) {
        console.error("Error creating category:", error);
        throw error;
      }
    },
  },
});
